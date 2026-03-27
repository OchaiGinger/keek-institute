"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceHolderImages } from "@/lib/placeholder-images";

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    num: "01",
    cat: "WEB DEVELOPMENT",
    user: "Chidera Okonkwo",
    handle: "@chideraokonkwo · Enugu, Nigeria",
    quote:
      "I enrolled in the Full-Stack Web Development program while working a day job. The self-paced LMS made it possible. Three months later I had a certificate, a portfolio, and a job offer from a Lagos startup. KEEK changed my trajectory.",
    reward: "Certified Developer",
    imgId: "avatar-1",
    accent: "#4ecca3",
  },
  {
    num: "02",
    cat: "CYBERSECURITY",
    user: "Fatima Aliyu",
    handle: "@fatima_a · Abuja, Nigeria",
    quote:
      "The AI-powered exam system pushed me harder than I expected. Randomized questions, real-time proctoring — it felt like a professional certification. I passed, got my QR-verified certificate, and landed an internship within six weeks.",
    reward: "Top of Cohort",
    imgId: "avatar-2",
    accent: "#c9a96e",
  },
  {
    num: "03",
    cat: "DATA ANALYTICS",
    user: "Emeka Nwosu",
    handle: "@emekan · Port Harcourt, Nigeria",
    quote:
      "As a government-sponsored trainee I wasn't sure what to expect. The structured batch system, attendance tracking, and the AI tutor that answered my questions at midnight — it was more than I imagined a government program could be.",
    reward: "Government Scholar",
    imgId: "avatar-3",
    accent: "#6AACDD",
  },
  {
    num: "04",
    cat: "UI/UX DESIGN",
    user: "Ngozi Eze",
    handle: "@ngozi_designs · Lagos, Nigeria",
    quote:
      "I uploaded my student project to the portfolio showcase and an instructor referred me to a partner company. The platform doesn't just teach you — it opens doors. My digital ID card still gets scanned at tech events.",
    reward: "Placed & Employed",
    imgId: "avatar-1",
    accent: "#4ecca3",
  },
];

function Barcode({ color = "#060a08" }: { color?: string }) {
  const bars = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 2, 1, 1, 2, 3, 1];
  let x = 0;
  return (
    <svg width="56" height="24" viewBox="0 0 72 32" fill="none">
      {bars.map((w, i) => {
        const el = (
          <rect
            key={i}
            x={x}
            y={0}
            width={w}
            height={32}
            fill={color}
            opacity={i % 2 === 0 ? 0.9 : 0.3}
          />
        );
        x += w + 1.2;
        return el;
      })}
    </svg>
  );
}

function WallBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#4ecca3]/30 w-fit">
      <span className="w-1.5 h-1.5 rounded-full bg-[#4ecca3] shadow-[0_0_8px_rgba(78,204,163,0.8)]" />
      <span className="text-[#4ecca3] text-[9px] font-black uppercase tracking-[0.28em]">
        Student Success Stories
      </span>
    </div>
  );
}

function ReviewCard({
  review,
  clipCard = false,
}: {
  review: (typeof REVIEWS)[0];
  clipCard?: boolean;
}) {
  const avatar = PlaceHolderImages.find((img) => img.id === review.imgId);
  return (
    <div
      className={`bg-[#f5f0e8] flex flex-col justify-between h-full ${clipCard ? "card-cut" : ""}`}
      style={{
        padding: clipCard ? "2rem 2.5rem 1.8rem" : "1.5rem 1.25rem 1.25rem",
      }}
    >
      <div>
        {/* Index + category tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#060a08]/30 text-[10px] font-black uppercase tracking-[0.28em] font-mono">
            KEEK ——— {review.num}
          </span>
          <span
            className="text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 border"
            style={{
              color: review.accent,
              borderColor: review.accent + "60",
              backgroundColor: review.accent + "12",
            }}
          >
            {review.cat}
          </span>
        </div>

        {/* Stacked headline */}
        <h3
          className="text-[#060a08] font-black uppercase mb-4"
          style={{
            fontSize: clipCard
              ? "clamp(1.8rem, 3.2vw, 3rem)"
              : "clamp(1.3rem, 5vw, 2rem)",
            lineHeight: "0.92",
            letterSpacing: "-0.03em",
          }}
        >
          {review.cat.split(" ").map((word, wi) => (
            <React.Fragment key={wi}>
              {word}
              <br />
            </React.Fragment>
          ))}
        </h3>

        {/* User */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-full overflow-hidden bg-[#060a08]/10 relative shrink-0 border-2"
            style={{ borderColor: review.accent + "60" }}
          >
            {avatar && (
              <Image
                src={avatar.imageUrl}
                alt={review.user}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div>
            <div className="text-[#060a08] font-black tracking-[-0.02em] text-sm">
              {review.user}
            </div>
            <div className="text-[#060a08]/40 mt-0.5 tracking-wide text-[11px]">
              {review.handle}
            </div>
          </div>
        </div>

        {/* Quote */}
        <p className="text-[#060a08]/65 leading-[1.65] font-light italic text-sm">
          "{review.quote}"
        </p>
      </div>

      {/* Outcome + barcode */}
      <div
        className="flex items-end justify-between mt-4 pt-4"
        style={{ borderTop: `1px solid ${review.accent}30` }}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-[#060a08]/35 text-[9px] font-bold uppercase tracking-[0.25em]">
            Outcome
          </span>
          <span
            className="text-lg font-black tracking-[-0.02em]"
            style={{ color: review.accent }}
          >
            {review.reward}
          </span>
        </div>
        <Barcode color="#060a08" />
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// MOBILE  (< 640px)
// ════════════════════════════════════════
function MobileTestimonials() {
  return (
    <section className="w-full bg-[#060a08]">
      <div className="px-5 pt-12 pb-8">
        <WallBadge />
        <h2
          className="text-white font-black uppercase mt-5 mb-5"
          style={{
            fontSize: "clamp(2.6rem, 12vw, 4rem)",
            lineHeight: "0.87",
            letterSpacing: "-0.05em",
          }}
        >
          LIVES
          <br />
          <span className="text-[#c9a96e]">WE'VE</span>
          <br />
          CHANGED
        </h2>
        <p className="text-white/45 text-sm leading-relaxed font-light mb-6">
          Real students. Real certificates. Real careers — built right here at
          KEEK Computers and Space Innovation AI.
        </p>
        <button className="w-full px-6 py-3 border border-white/80 text-white text-[10px] font-black uppercase tracking-[0.22em] hover:bg-white hover:text-[#060a08] transition-all duration-200">
          · ENROLL NOW ·
        </button>
      </div>
      <div className="flex flex-col gap-4 px-5 pb-12">
        {REVIEWS.map((review, i) => (
          <div key={i} className="bg-[#f5f0e8]">
            <ReviewCard review={review} clipCard={false} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ════════════════════════════════════════
// TABLET  (640px–1023px)
// ════════════════════════════════════════
function TabletTestimonials() {
  return (
    <section className="w-full bg-[#060a08]">
      <div className="px-8 pt-14 pb-10 flex items-end justify-between gap-8">
        <div>
          <WallBadge />
          <h2
            className="text-white font-black uppercase mt-5"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5rem)",
              lineHeight: "0.87",
              letterSpacing: "-0.05em",
            }}
          >
            LIVES
            <br />
            <span className="text-[#c9a96e]">WE'VE</span>
            <br />
            CHANGED
          </h2>
        </div>
        <div className="flex flex-col items-end gap-4 shrink-0 max-w-65">
          <p className="text-white/45 text-sm leading-relaxed font-light text-right">
            Real students. Real certificates. Real careers — built right here at
            KEEK Computers and Space Innovation AI.
          </p>
          <button className="px-7 py-3 border border-white/80 text-white text-[10px] font-black uppercase tracking-[0.22em] hover:bg-white hover:text-[#060a08] transition-all duration-200 whitespace-nowrap">
            · ENROLL NOW ·
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 px-8 pb-14">
        {REVIEWS.map((review, i) => (
          <div key={i} className="bg-[#f5f0e8] min-h-105 flex flex-col">
            <ReviewCard review={review} clipCard={false} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ════════════════════════════════════════
// DESKTOP  (≥ 1024px) — pinned scroll carousel
// ════════════════════════════════════════
function DesktopTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(carouselRef.current, {
        x: "-58%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#060a08] flex overflow-hidden"
    >
      {/* LEFT fixed panel */}
      <div
        className="w-[44%] shrink-0 h-full flex flex-col justify-between py-14 px-16 z-10 bg-[#060a08]"
        style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}
      >
        <WallBadge />
        <div>
          <h2
            className="text-white font-black uppercase"
            style={{
              fontSize: "clamp(4rem, 7.5vw, 7rem)",
              lineHeight: "0.87",
              letterSpacing: "-0.05em",
            }}
          >
            LIVES
            <br />
            <span className="text-[#c9a96e]">WE'VE</span>
            <br />
            CHANGED
          </h2>
          <p className="mt-8 text-white/45 text-base leading-relaxed max-w-90 font-light">
            Real students. Real certificates. Real careers — built right here at
            KEEK Computers and Space Innovation AI.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-3 px-5 py-3 border border-white/15 text-white text-[10px] font-black uppercase tracking-[0.22em] w-fit cursor-grab">
            ← DRAG →
          </div>
          <button className="px-10 py-4 border border-white/80 text-white text-[10px] font-black uppercase tracking-[0.22em] hover:bg-white hover:text-[#060a08] transition-all duration-200 w-fit">
            · ENROLL NOW ·
          </button>
        </div>
      </div>

      {/* RIGHT carousel */}
      <div className="flex-1 h-full flex items-center overflow-visible relative">
        <div
          ref={carouselRef}
          className="flex items-stretch"
          style={{
            gap: "40px",
            paddingRight: "8rem",
            height: "78%",
            width: "max-content",
          }}
        >
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="card-cut bg-[#f5f0e8] flex flex-col justify-between"
              style={{
                width: "calc(50vw - 20px)",
                minWidth: "360px",
                maxWidth: "600px",
              }}
            >
              <ReviewCard review={review} clipCard={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════
// ROOT
// ════════════════════════════════════════
export default function Testimonials() {
  const [breakpoint, setBreakpoint] = useState<
    "mobile" | "tablet" | "desktop" | null
  >(null);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setBreakpoint(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (breakpoint === null) return null;

  return (
    <>
      <style>{`
        .card-cut {
          clip-path: polygon(0% 0%, 82% 0%, 100% 8%, 100% 100%, 18% 100%, 0% 92%);
        }
      `}</style>
      {breakpoint === "mobile" && <MobileTestimonials />}
      {breakpoint === "tablet" && <TabletTestimonials />}
      {breakpoint === "desktop" && <DesktopTestimonials />}
    </>
  );
}
