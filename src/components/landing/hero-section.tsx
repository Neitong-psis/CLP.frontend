"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { AnimatedBackground } from "@/components/landing/animated-background";
import { DashboardPreview } from "@/components/landing/dashboard-preview";

// ─── Animation variants ───────────────────────────────────────────────────────

const CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
} as const;

const ITEM = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Stat {
  readonly icon: typeof Users;
  readonly value: string;
  readonly label: string;
}

const STATS: readonly Stat[] = [
  { icon: Users, value: "20K+", label: "Students" },
  { icon: BookOpen, value: "500+", label: "Courses" },
  { icon: GraduationCap, value: "120+", label: "Instructors" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#F8FAFC] pt-16"
      aria-labelledby="hero-heading"
    >
      <AnimatedBackground />

      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* ── Left: copy ─────────────────────────────────────────────── */}
          <motion.div
            variants={CONTAINER}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-8"
          >
            {/* Announcement badge */}
            <motion.div variants={ITEM}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/10 px-4 py-1.5">
                <Sparkles
                  className="h-3.5 w-3.5 text-[#3B82F6]"
                  aria-hidden
                />
                <span className="text-xs font-semibold tracking-wide text-[#3B82F6]">
                  #1 Learning Platform for Professionals
                </span>
              </span>
            </motion.div>

            {/* Headline + sub-headline */}
            <motion.div variants={ITEM}>
              <h1
                id="hero-heading"
                className="text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0F172A] sm:text-5xl lg:text-[3.5rem]"
              >
                Empower Your Future{" "}
                <span className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent">
                  Through Smart Learning
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#64748B]">
                Learn from industry experts, track your progress, and gain
                real-world skills with an interactive online learning
                experience.
              </p>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={ITEM}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={ROUTES.auth.login}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#3B82F6] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#3B82F6]/30 transition-colors hover:bg-[#2563EB]"
                >
                  Start Learning
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={ROUTES.dashboard.explore}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-7 py-3.5 text-sm font-semibold text-[#0F172A] shadow-sm transition hover:border-[#3B82F6]/30 hover:shadow-md"
                >
                  <BookOpen
                    className="h-4 w-4 text-[#3B82F6]"
                    aria-hidden
                  />
                  Explore Courses
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={ITEM}>
              <dl className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {STATS.map(({ icon: Icon, value, label }, i) => (
                  <div key={label} className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#3B82F6]/10"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5 text-[#3B82F6]" />
                    </div>
                    <div>
                      <dt className="text-sm font-bold text-[#0F172A]">
                        {value}
                      </dt>
                      <dd className="text-xs text-[#64748B]">{label}</dd>
                    </div>
                    {i < STATS.length - 1 && (
                      <div
                        className="ml-2 h-8 w-px bg-[#E2E8F0]"
                        aria-hidden
                      />
                    )}
                  </div>
                ))}
              </dl>
            </motion.div>
          </motion.div>

          {/* ── Right: visual ───────────────────────────────────────────── */}
          <div className="flex items-center justify-center px-4 lg:justify-end lg:px-0">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
