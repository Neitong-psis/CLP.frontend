import { jsPDF } from 'jspdf';
import { slugify } from './slugify';
import type {
  ReviewItem,
  ReviewLesson,
  ReviewModule,
} from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';

export interface CourseExportInfo {
  title: string;
  author?: string;
  category?: string;
  level?: string;
  description?: string;
}

const COLOR_HEADING = '#0f172a';
const COLOR_BODY = '#334155';
const COLOR_MUTED = '#64748b';
const COLOR_ACCENT = '#b45309';
const COLOR_RULE = '#e2e8f0';

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

const KIND_LABEL: Record<ReviewItem['kind'], string> = {
  document: 'Reading',
  video: 'Video Lesson',
  quiz: 'Quiz',
  assignment: 'Assignment',
};

/** Thin wrapper around jsPDF that tracks a text cursor and wraps/paginates for us. */
class PdfWriter {
  private readonly doc: jsPDF;
  private readonly marginX = 48;
  private readonly marginTop = 56;
  private readonly marginBottom = 56;
  private readonly pageWidth: number;
  private readonly pageHeight: number;
  private readonly contentWidth: number;
  private y: number;

  constructor() {
    this.doc = new jsPDF({ unit: 'pt', format: 'a4' });
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.contentWidth = this.pageWidth - this.marginX * 2;
    this.y = this.marginTop;
  }

  private ensureSpace(height: number): void {
    if (this.y + height > this.pageHeight - this.marginBottom) {
      this.doc.addPage();
      this.y = this.marginTop;
    }
  }

  heading(
    text: string,
    {
      size,
      color = COLOR_HEADING,
      spaceBefore = 18,
      spaceAfter = 8,
    }: {
      size: number;
      color?: string;
      spaceBefore?: number;
      spaceAfter?: number;
    },
  ): void {
    this.y += spaceBefore;
    const lineHeight = size * 1.3;
    const lines: string[] = this.doc.splitTextToSize(text, this.contentWidth);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(size);
    this.doc.setTextColor(color);
    lines.forEach((line) => {
      this.ensureSpace(lineHeight);
      this.doc.text(line, this.marginX, this.y);
      this.y += lineHeight;
    });
    this.y += spaceAfter;
  }

  paragraph(
    text: string,
    {
      size = 10,
      color = COLOR_BODY,
      bold = false,
      indent = 0,
    }: { size?: number; color?: string; bold?: boolean; indent?: number } = {},
  ): void {
    const lineHeight = size * 1.45;
    const lines: string[] = this.doc.splitTextToSize(
      text,
      this.contentWidth - indent,
    );
    this.doc.setFont('helvetica', bold ? 'bold' : 'normal');
    this.doc.setFontSize(size);
    this.doc.setTextColor(color);
    lines.forEach((line) => {
      this.ensureSpace(lineHeight);
      this.doc.text(line, this.marginX + indent, this.y);
      this.y += lineHeight;
    });
    this.y += 4;
  }

  bulletList(
    items: string[],
    { size = 10, indent = 14 }: { size?: number; indent?: number } = {},
  ): void {
    const lineHeight = size * 1.45;
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(size);
    this.doc.setTextColor(COLOR_BODY);
    items.forEach((item) => {
      const lines: string[] = this.doc.splitTextToSize(
        item,
        this.contentWidth - indent,
      );
      lines.forEach((line, i) => {
        this.ensureSpace(lineHeight);
        if (i === 0) this.doc.text('•', this.marginX, this.y);
        this.doc.text(line, this.marginX + indent, this.y);
        this.y += lineHeight;
      });
    });
    this.y += 4;
  }

  divider(): void {
    this.ensureSpace(20);
    this.y += 6;
    this.doc.setDrawColor(COLOR_RULE);
    this.doc.line(this.marginX, this.y, this.pageWidth - this.marginX, this.y);
    this.y += 16;
  }

  spacer(height: number): void {
    this.y += height;
  }

  save(filename: string): void {
    this.doc.save(filename);
  }
}

function lessonItems(lesson: ReviewLesson): ReviewItem[] {
  return [
    ...lesson.documents,
    ...lesson.videos,
    ...lesson.quizzes,
    ...lesson.assignments,
  ];
}

function writeItem(w: PdfWriter, item: ReviewItem): void {
  w.heading(item.title, { size: 12.5, spaceBefore: 14, spaceAfter: 2 });

  switch (item.kind) {
    case 'document':
      w.paragraph(`${KIND_LABEL.document} · ${item.readTime}`, {
        size: 9,
        color: COLOR_MUTED,
      });
      w.paragraph(item.intro);
      if (item.objectives.length) {
        w.paragraph('What you will learn', { bold: true });
        w.bulletList(item.objectives);
      }
      item.sections.forEach((section) => {
        w.paragraph(section.heading, { size: 10.5, bold: true });
        w.paragraph(section.text);
        if (section.tip) {
          w.paragraph(`Tip: ${section.tip}`, {
            size: 9.5,
            color: COLOR_ACCENT,
          });
        }
      });
      if (item.takeaways.length) {
        w.paragraph('Key takeaways', { bold: true });
        w.bulletList(item.takeaways);
      }
      break;

    case 'video':
      w.paragraph(`${KIND_LABEL.video} · ${item.duration}`, {
        size: 9,
        color: COLOR_MUTED,
      });
      w.paragraph(item.intro);
      if (item.topics.length) {
        w.paragraph('In this video', { bold: true });
        w.bulletList(item.topics);
      }
      if (item.moments.length) {
        w.paragraph('Key moments', { bold: true });
        w.bulletList(item.moments.map((m) => `${m.time} — ${m.label}`));
      }
      break;

    case 'quiz':
      w.paragraph(
        `${KIND_LABEL.quiz} · ${item.totalQuestions} questions · ~${item.estimatedMinutes} min`,
        { size: 9, color: COLOR_MUTED },
      );
      w.paragraph(item.description);
      item.questions.forEach((q, qi) => {
        w.paragraph(`${qi + 1}. ${q.question}`, { bold: true });
        w.bulletList(
          q.options.map((opt, oi) => `${OPTION_LETTERS[oi] ?? oi + 1}. ${opt}`),
        );
      });
      break;

    case 'assignment':
      w.paragraph(
        `${KIND_LABEL.assignment} · Due ${item.dueDate} · ${item.submission}`,
        { size: 9, color: COLOR_MUTED },
      );
      w.paragraph(item.instructions);
      if (item.requirements.length) {
        w.paragraph('Requirements', { bold: true });
        w.bulletList(item.requirements);
      }
      break;
  }
}

/**
 * Generates a PDF covering every module, lesson, and content item of a
 * course, then downloads it. Quiz correct answers are intentionally
 * omitted — this export is safe to hand to a learner, not just staff.
 */
export function exportCourseToPdf(
  course: CourseExportInfo,
  modules: ReviewModule[],
): void {
  const w = new PdfWriter();

  w.heading(course.title, { size: 20, spaceBefore: 0, spaceAfter: 4 });
  const metaLine = [
    course.author && `Instructor: ${course.author}`,
    course.category,
    course.level,
  ]
    .filter(Boolean)
    .join('  ·  ');
  if (metaLine) w.paragraph(metaLine, { size: 10, color: COLOR_MUTED });
  if (course.description) w.paragraph(course.description, { size: 10.5 });
  w.divider();

  modules.forEach((mod) => {
    w.heading(mod.title, { size: 15, spaceBefore: 16 });

    mod.lessons.forEach((lesson, li) => {
      w.heading(`Lesson ${li + 1} — ${lesson.title}`, {
        size: 12,
        spaceBefore: 12,
        color: COLOR_MUTED,
      });
      lessonItems(lesson).forEach((item) => {
        writeItem(w, item);
      });
    });
  });

  w.save(`${slugify(course.title)}-course.pdf`);
}
