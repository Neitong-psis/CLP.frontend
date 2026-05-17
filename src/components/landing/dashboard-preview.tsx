"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Play,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

// ─── Sub-components ──────────────────────────────────────────────────────────

interface FloatingCardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly floatRange?: number;
  readonly floatDuration?: number;
}

function FloatingCard({
  children,
  className,
  delay = 0,
  floatRange = 8,
  floatDuration = 3.5,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -floatRange, 0] }}
        transition={{
          repeat: Infinity,
          duration: floatDuration,
          ease: "easeInOut",
          delay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface ProgressBarProps {
  readonly value: number;
  readonly color: string;
  readonly delay?: number;
}

function ProgressBar({ value, color, delay = 0 }: ProgressBarProps) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, delay: delay + 0.9, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const COURSES = [
  { name: "React Advanced", progress: 78, color: "#3B82F6" },
  { name: "TypeScript Pro", progress: 64, color: "#10B981" },
  { name: "System Design", progress: 45, color: "#F59E0B" },
] as const;

const MINI_STATS = [
  { icon: BookOpen, value: "12", label: "Courses" },
  { icon: Award, value: "4", label: "Certs" },
  { icon: TrendingUp, value: "98%", label: "Score" },
] as const;

const AVATAR_COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
] as const;

// ─── Main export ──────────────────────────────────────────────────────────────

export function DashboardPreview() {
  return (
    <div className="relative w-full max-w-[420px]">
      {/* Glow halo behind the card */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 scale-110 rounded-3xl blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.18) 0%, rgba(96,165,250,0.07) 55%, transparent 100%)",
        }}
      />

      {/* ── Main dashboard card ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-[#0F172A]/10"
      >
        {/* Rainbow top edge line */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #3B82F6 40%, #60A5FA 60%, transparent 100%)",
          }}
        />

        <div className="p-5">
          {/* Window chrome dots */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5" aria-hidden>
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]"
              />
              <span className="text-xs font-medium text-[#64748B]">
                Learning Dashboard
              </span>
            </div>
          </div>

          {/* Active courses */}
          <div className="mb-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#94A3B8]">
              Active Courses
            </p>
            <div className="space-y-3.5">
              {COURSES.map((course, i) => (
                <div key={course.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0F172A]">
                      {course.name}
                    </span>
                    <span
                      className="text-xs font-bold tabular-nums"
                      style={{ color: course.color }}
                    >
                      {course.progress}%
                    </span>
                  </div>
                  <ProgressBar
                    value={course.progress}
                    color={course.color}
                    delay={i * 0.12}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mini stat tiles */}
          <div className="mb-4 grid grid-cols-3 gap-2">
            {MINI_STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-xl bg-slate-50 py-3 ring-1 ring-slate-100"
              >
                <Icon
                  className="mb-1 h-4 w-4 text-[#3B82F6]"
                  aria-hidden
                />
                <span className="text-sm font-bold text-[#0F172A]">
                  {value}
                </span>
                <span className="text-[10px] text-[#94A3B8]">{label}</span>
              </div>
            ))}
          </div>

          {/* Continue learning row */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex cursor-default items-center gap-3 rounded-xl bg-gradient-to-r from-[#EFF6FF] to-[#F0F9FF] p-3.5 ring-1 ring-[#3B82F6]/15"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3B82F6] shadow-md shadow-[#3B82F6]/30">
              <Play
                className="h-4 w-4 fill-white text-white"
                aria-hidden
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#0F172A]">
                Continue Learning
              </p>
              <p className="truncate text-[11px] text-[#64748B]">
                React Hooks — Lesson 12 of 24
              </p>
            </div>
            <CheckCircle2
              className="h-4 w-4 shrink-0 text-emerald-500"
              aria-hidden
            />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Floating: Certificate card (bottom-left) ─────────────────────── */}
      <FloatingCard
        delay={0.65}
        floatRange={6}
        floatDuration={3.8}
        className="absolute -bottom-6 -left-10 z-10"
      >
        <div className="w-44 rounded-2xl border border-[#F59E0B]/20 bg-white p-3.5 shadow-xl shadow-black/10">
          <div className="mb-2.5 flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#F97316] shadow-md">
              <Award className="h-4 w-4 text-white" aria-hidden />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0F172A]">Certificate</p>
              <p className="text-[10px] text-[#64748B]">Earned today</p>
            </div>
          </div>
          <div
            className="flex items-center gap-0.5"
            aria-label="5-star rating"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]"
                aria-hidden
              />
            ))}
          </div>
        </div>
      </FloatingCard>

      {/* ── Floating: New lesson card (right) ────────────────────────────── */}
      <FloatingCard
        delay={1.05}
        floatRange={10}
        floatDuration={4.2}
        className="absolute -right-8 top-1/3 z-10"
      >
        <div className="w-40 rounded-2xl border border-emerald-200/70 bg-white p-3 shadow-xl shadow-black/10">
          <div className="mb-1.5 flex items-center gap-1.5">
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="inline-block h-2 w-2 rounded-full bg-emerald-400"
              aria-hidden
            />
            <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">
              New Lesson
            </p>
          </div>
          <p className="text-xs font-semibold text-[#0F172A]">
            Advanced Patterns
          </p>
          <p className="mt-0.5 text-[10px] text-[#94A3B8]">
            Module 3 available
          </p>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-1/3 rounded-full bg-emerald-400" />
          </div>
        </div>
      </FloatingCard>

      {/* ── Floating: Streak badge (top-centre) ──────────────────────────── */}
      <FloatingCard
        delay={0.85}
        floatRange={7}
        floatDuration={3.4}
        className="absolute -top-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex items-center gap-2.5 rounded-2xl border border-orange-200/70 bg-white px-4 py-2.5 shadow-xl shadow-black/10">
          <span className="text-xl leading-none" aria-hidden>
            🔥
          </span>
          <div>
            <p className="text-xs font-bold text-[#0F172A]">7-day streak!</p>
            <p className="text-[10px] text-[#94A3B8]">Keep going 💪</p>
          </div>
        </div>
      </FloatingCard>

      {/* ── Floating: Learner count (top-left) ───────────────────────────── */}
      <FloatingCard
        delay={1.25}
        floatRange={5}
        floatDuration={4.6}
        className="absolute -left-8 top-10 z-10"
      >
        <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white px-3.5 py-2.5 shadow-xl shadow-black/10">
          <div
            className="flex -space-x-2"
            aria-label="Active learners"
          >
            {AVATAR_COLORS.map((color, i) => (
              <div
                key={i}
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white"
                style={{ backgroundColor: color }}
                aria-hidden
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-bold text-[#0F172A]">+20K</p>
            <p className="text-[10px] text-[#94A3B8]">learners</p>
          </div>
        </div>
      </FloatingCard>

      {/* ── Floating: Live session pill (bottom-right) ───────────────────── */}
      <FloatingCard
        delay={1.45}
        floatRange={9}
        floatDuration={3.9}
        className="absolute -bottom-3 right-4 z-10"
      >
        <div className="flex items-center gap-2 rounded-full border border-[#3B82F6]/20 bg-white px-3.5 py-2 shadow-xl shadow-black/10">
          <Users className="h-3.5 w-3.5 text-[#3B82F6]" aria-hidden />
          <span className="text-[11px] font-semibold text-[#0F172A]">
            128 live now
          </span>
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            className="ml-0.5 inline-block h-2 w-2 rounded-full bg-[#3B82F6]"
            aria-hidden
          />
        </div>
      </FloatingCard>
    </div>
  );
}
