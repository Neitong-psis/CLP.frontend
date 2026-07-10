import { jsPDF } from 'jspdf';
import { slugify } from './slugify';

/**
 * Hand-drawn with jsPDF's vector/text primitives rather than rasterizing the
 * on-screen `<div>` (which would need html2canvas, a new dependency, for a
 * result that's a flat image — not text, bigger, and blurrier at zoom). This
 * mirrors the on-screen layout closely enough to read as the same document
 * while staying a real, selectable-text PDF, matching the pattern already
 * established by `exportCourseToPdf`.
 *
 * Takes plain fields rather than a `Certificate` — the learner's own
 * certificate record and the admin's issuance-history record are two
 * different shapes, and neither should have to fake the other's fields just
 * to call this.
 */

export interface CertificatePdfData {
  readonly learnerName: string;
  readonly courseTitle: string;
  readonly completedDate: string;
  readonly instructor: string;
  readonly certificateId: string;
  readonly verifyUrl: string;
}

const COLOR_NAVY = '#00003e';
const COLOR_GOLD = '#f4a300';
const COLOR_MUTED = '#64748b';
const COLOR_RULE = '#c7c7d9';

export function exportCertificateToPdf(data: CertificatePdfData): void {
  const {
    learnerName,
    courseTitle,
    completedDate,
    instructor,
    certificateId,
    verifyUrl,
  } = data;

  const doc = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'landscape' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const centerX = pageWidth / 2;

  // Double border, matching the card's framed look.
  doc.setDrawColor(COLOR_NAVY);
  doc.setLineWidth(2);
  doc.rect(28, 28, pageWidth - 56, pageHeight - 56);
  doc.setDrawColor(COLOR_GOLD);
  doc.setLineWidth(0.75);
  doc.rect(36, 36, pageWidth - 72, pageHeight - 72);

  let y = 92;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(COLOR_NAVY);
  doc.text('Q B T E C H   L E A R N I N G   P L A T F O R M', centerX, y, {
    align: 'center',
  });

  y += 16;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(COLOR_GOLD);
  doc.text('Excellence in Education', centerX, y, { align: 'center' });

  y += 48;
  doc.setFont('times', 'bold');
  doc.setFontSize(40);
  doc.setTextColor(COLOR_NAVY);
  doc.text('Certificate of Completion', centerX, y, { align: 'center' });

  y += 32;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(COLOR_GOLD);
  doc.text('T H I S   C E R T I F I E S   T H A T', centerX, y, {
    align: 'center',
  });

  y += 52;
  doc.setFont('times', 'bold');
  doc.setFontSize(34);
  doc.setTextColor(COLOR_NAVY);
  doc.text(learnerName, centerX, y, { align: 'center' });

  y += 10;
  doc.setDrawColor(COLOR_RULE);
  doc.setLineWidth(1);
  doc.line(centerX - 130, y, centerX + 130, y);

  y += 26;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(COLOR_MUTED);
  doc.text('H A S   C O M P L E T E D   T H E   C O U R S E', centerX, y, {
    align: 'center',
  });

  y += 28;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.setTextColor(COLOR_NAVY);
  const titleLines: string[] = doc.splitTextToSize(
    courseTitle,
    pageWidth - 200,
  );
  titleLines.forEach((line) => {
    doc.text(line, centerX, y, { align: 'center' });
    y += 24;
  });

  // Footer: date of issue | lead instructor, two columns above a shared rule.
  const footerY = pageHeight - 110;
  const colOffset = 150;

  doc.setDrawColor(COLOR_NAVY);
  doc.setLineWidth(0.75);
  doc.line(
    centerX - colOffset - 70,
    footerY,
    centerX - colOffset + 70,
    footerY,
  );
  doc.line(
    centerX + colOffset - 70,
    footerY,
    centerX + colOffset + 70,
    footerY,
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(COLOR_NAVY);
  doc.text(completedDate, centerX - colOffset, footerY - 8, {
    align: 'center',
  });
  doc.text(instructor.toUpperCase(), centerX + colOffset, footerY - 8, {
    align: 'center',
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_MUTED);
  doc.text('DATE OF ISSUE', centerX - colOffset, footerY + 16, {
    align: 'center',
  });
  doc.text('LEAD INSTRUCTOR', centerX + colOffset, footerY + 16, {
    align: 'center',
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_MUTED);
  doc.text(
    `Certificate ID: ${certificateId}   ·   Verify at ${verifyUrl}`,
    centerX,
    pageHeight - 50,
    { align: 'center' },
  );

  doc.save(`${slugify(courseTitle)}-certificate.pdf`);
}
