"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookX, Layers, ShieldOff, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROBLEMS = [
  {
    icon: <BookX className="w-6 h-6" />,
    title: "The Digital Skills Gap",
    body: "Millions of Nigerian youth remain shut out of the digital economy — not from lack of ambition, but from lack of access to structured, verifiable ICT education that employers actually trust.",
    bullets: [
      "73% of employers cite unverified skills as top hiring barrier",
      "Demand for tech talent outpaces supply by 4:1",
      "Self-taught learners lack credible certification",
      "Rural & underserved communities have near-zero access",
    ],
    accent: "#4e8eff",
    accentRgb: "78,142,255",
    bgStat: "73%",
    bgLabel: "skills gap",
    videoPath: "/videos/video_1.mp4",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Fragmented, Paper-Based Systems",
    body: "Training institutions run on spreadsheets, WhatsApp groups, and manual paperwork. Admissions, payments, exams, and certificates exist in silos — creating chaos for students, instructors, and administrators.",
    bullets: [
      "No single source of student records or progress",
      "Manual enrollment & payment workflows waste weeks",
      "Inconsistent examination and grading processes",
      "Certificate fraud rampant with no verification layer",
    ],
    accent: "#a855f7",
    accentRgb: "168,85,247",
    bgStat: "15+",
    bgLabel: "systems/inst.",
    videoPath: "/videos/video_3.mp4",
  },
  {
    icon: <ShieldOff className="w-6 h-6" />,
    title: "No Proof, No Progress",
    body: "Without measurable learning data, students can't demonstrate competency, institutions can't prove outcomes, and government sponsors have no accountability trail for the programs they fund.",
    bullets: [
      "No real-time student performance visibility",
      "Cannot prove ROI for government-sponsored programs",
      "Audit risk from missing attendance & completion records",
      "Zero chain-of-custody for issued certificates",
    ],
    accent: "#00d4ff",
    accentRgb: "0,212,255",
    bgStat: "82%",
    bgLabel: "untracked",
    videoPath: "/videos/video_2.mp4",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Opportunities Slipping Away",
    body: "Government internship placements, scholarships, and tech programs sit unfilled while qualified candidates remain invisible. The ecosystem to connect talent to opportunity simply does not exist.",
    bullets: [
      "Thousands of gov. slots unfilled annually",
      "Internship programs lack structured placement pipelines",
      "Instructor talent has no marketplace to reach learners",
      "Circular economy of skills remains untapped: $2.3B+",
    ],
    accent: "#f0a500",
    accentRgb: "240,165,0",
    bgStat: "2.3B+",
    bgLabel: "USD potential",
    videoPath: "/videos/video_4.mp4",
  },
];

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const CARD_VW = isMobile ? 92 : 68;
      const GAP_PX = isMobile ? 16 : 32;
      const totalPanels = PROBLEMS.length + 1;

      // Transition Grid Animation
      const gridPanels =
        gridOverlayRef.current?.querySelectorAll(".grid-panel");
      if (gridPanels) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "top 10%",
            scrub: 1.2,
          },
        });

        gsap.set(gridPanels, { opacity: 0, visibility: "hidden" });

        const colCount = 5;
        const getIndex = (row: number, col: number) => row * colCount + col;

        const animateRow = (row: number, startTime: number) => {
          for (let col = colCount - 1; col >= 0; col--) {
            const idx = getIndex(row, col);
            const panel = gridPanels[idx];
            const delay = startTime + (colCount - 1 - col) * 0.05;

            tl.to(
              panel,
              {
                opacity: 1,
                visibility: "visible",
                y: 0,
                duration: 0.3,
                ease: "power2.inOut",
              },
              delay,
            );

            tl.to(
              panel,
              {
                y: "100vh",
                duration: 0.3,
                ease: "power2.inOut",
              },
              delay + 0.25,
            );

            tl.to(
              panel,
              {
                opacity: 0,
                visibility: "hidden",
                duration: 0.01,
              },
              delay + 0.55,
            );
          }
        };

        animateRow(2, 0);
        animateRow(1, 0.15);
        animateRow(0, 0.3);
      }

      // Horizontal Scroll Distance
      const scrollDistance =
        (totalPanels - 1) * (window.innerWidth * (CARD_VW / 100) + GAP_PX);

      // Horizontal Scroll
      const hTween = gsap.to(trackRef.current, {
        x: () => -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      panelRefs.current.forEach((panel) => {
        if (!panel) return;
        const videoContainer = panel.querySelector(".pi");
        const header = panel.querySelector(".ph");
        const body = panel.querySelector(".pb");
        const bullets = panel.querySelectorAll(".pl");
        const all = [
          videoContainer,
          header,
          body,
          ...Array.from(bullets),
        ].filter(Boolean);

        gsap.set(all, { opacity: 0, x: isMobile ? 15 : 36 });

        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: hTween,
          start: "left 92%",
          onEnter: () => {
            gsap.to(videoContainer, {
              opacity: 1,
              x: 0,
              duration: 0.75,
              ease: "power3.out",
            });
            gsap.to(header, {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power3.out",
              delay: 0.12,
            });
            gsap.to(body, {
              opacity: 1,
              x: 0,
              duration: 0.55,
              ease: "power3.out",
              delay: 0.22,
            });
            gsap.to(Array.from(bullets), {
              opacity: 1,
              x: 0,
              duration: 0.45,
              ease: "power3.out",
              stagger: 0.08,
              delay: 0.32,
            });
          },
          onLeaveBack: () =>
            gsap.set(all, { opacity: 0, x: isMobile ? 15 : 36 }),
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[#06070f] relative overflow-hidden"
    >
      {/* Starfield noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Reveal Grid */}
      <div
        ref={gridOverlayRef}
        className="fixed inset-0 z-100 grid grid-cols-5 grid-rows-3 pointer-events-none overflow-hidden"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="grid-panel bg-[#0d0f1f] border border-white/5 will-change-transform opacity-0 invisible"
            style={{ transform: "translateY(-100vh)" }}
          />
        ))}
      </div>

      <div
        ref={trackRef}
        className="flex items-center will-change-transform h-screen"
        style={{
          gap: "clamp(1rem, 3vw, 2rem)",
          paddingLeft: "max(1.5rem, 5vw)",
          paddingRight: "max(1.5rem, 5vw)",
        }}
      >
        {/* Panel 0: Headline card */}
        <div
          className="shrink-0 h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] rounded-3xl md:rounded-4xl flex flex-col items-start justify-center relative overflow-hidden"
          style={{
            width: "clamp(300px, 92vw, 68vw)",
            background: "linear-gradient(145deg, #0d1020 0%, #06070f 100%)",
            border: "1.5px solid rgba(255,255,255,0.12)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.75)",
            padding: "clamp(2rem, 6vw, 6rem)",
          }}
        >
          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_55%_50%_at_25%_55%,rgba(78,142,255,0.12)_0%,transparent_70%)]" />
          {/* Orbit ring decoration */}
          <div
            className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border border-white/5 pointer-events-none"
            style={{ boxShadow: "0 0 80px 10px rgba(78,142,255,0.06)" }}
          />
          <div className="relative z-10">
            <p className="font-body text-[#4e8eff] text-[0.7rem] font-bold tracking-[0.28em] uppercase mb-5">
              THE PROBLEM SPACE
            </p>
            <h2
              className="font-headline text-[#eef0f8] font-light leading-[1.1] max-w-170"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.8rem)" }}
            >
              The system was never built
              <br className="hidden md:block" /> for learners to win —
              <br />
              <em className="text-[#4e8eff] not-italic">
                KEEK is changing that.
              </em>
            </h2>
            <p className="font-body text-white/25 mt-10 text-[0.7rem] tracking-[0.20em] uppercase">
              Scroll to explore →
            </p>
          </div>
        </div>

        {/* Panels 1–4: Problem cards */}
        {PROBLEMS.map((p, i) => {
          return (
            <div
              key={i}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="shrink-0 h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] rounded-3xl md:rounded-4xl relative overflow-hidden flex flex-col md:flex-row items-stretch group"
              style={{
                width: "clamp(300px, 92vw, 68vw)",
                border: "1.5px solid rgba(255,255,255,0.10)",
                boxShadow: `inset 0 1.5px 0 rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.70)`,
                background: `linear-gradient(160deg, #0c0e1c 0%, #06070f 100%)`,
              }}
            >
              {/* VIDEO */}
              <div
                className="pi relative md:w-1/2 shrink-0 overflow-hidden h-[30%] md:h-full"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? "opacity-60"
                      : "opacity-45 grayscale group-hover:grayscale-0 group-hover:opacity-75"
                  }`}
                >
                  <source src={p.videoPath} type="video/mp4" />
                </video>

                {/* Accent glow overlay on video */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(ellipse at 30% 60%, rgba(${p.accentRgb},0.15) 0%, transparent 70%)`,
                  }}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none z-10">
                  <span
                    className="font-headline font-bold leading-none tracking-tighter"
                    style={{
                      fontSize: "clamp(2.5rem, 7vw, 7rem)",
                      color: p.accent,
                      opacity: 0.22,
                    }}
                  >
                    {p.bgStat}
                  </span>
                  <span
                    className="font-body uppercase tracking-[0.20em] mt-2 text-[0.65rem] md:text-[0.75rem]"
                    style={{ color: p.accent, opacity: 0.3 }}
                  >
                    {p.bgLabel}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div
                className="flex flex-col justify-center min-w-0 relative flex-1"
                style={{
                  padding: "clamp(1.5rem, 5vw, 4rem)",
                  background: "rgba(6, 7, 15, 0.40)",
                  backdropFilter: "blur(14px)",
                }}
              >
                {/* Subtle accent line top */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-30"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)`,
                  }}
                />

                <div className="ph flex items-center gap-4 mb-4">
                  <div
                    className="shrink-0 w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center text-[#eef0f8] border border-white/10"
                    style={{
                      background: `rgba(${p.accentRgb}, 0.12)`,
                    }}
                  >
                    {p.icon}
                  </div>
                  <h3
                    className="font-headline text-[#eef0f8] font-semibold leading-tight"
                    style={{ fontSize: "clamp(1.2rem, 2vw, 2.2rem)" }}
                  >
                    {p.title}
                  </h3>
                </div>

                <div
                  className="w-10 h-0.5 mb-6"
                  style={{ background: p.accent, opacity: 0.55 }}
                />

                <p className="pb font-body text-white/65 leading-relaxed mb-8 text-[0.8rem] md:text-[0.95rem] max-w-110">
                  {p.body}
                </p>

                <div className="flex flex-col gap-3 md:gap-4">
                  {p.bullets.map((b, j) => (
                    <div
                      key={j}
                      className="pl flex items-start gap-4 font-body text-white/55 text-[0.75rem] md:text-[0.9rem]"
                    >
                      <span
                        className="shrink-0 rounded-full w-1.5 h-1.5 mt-1.5 opacity-80"
                        style={{ backgroundColor: p.accent }}
                      />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default About;
