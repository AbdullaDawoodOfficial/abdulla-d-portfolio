
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

import type { SectionId } from "@/content/profile";

import { CINEMATIC_QUERY, navigateTo, setSceneResolver } from "./cinematic";

export type Scene = { id: SectionId; label: string; content: ReactNode };

/** Timeline units: HOLD = scene rests, ZOOM = zoom-through transition. */
const HOLD = 0.55;
const ZOOM = 1;

/** Viewport heights of scroll per timeline unit. */
const SCROLL_PER_UNIT = 0.9;

export function CinematicStage({
  scenes,
  onActiveChange,
}: {
  scenes: Scene[];
  onActiveChange: (id: SectionId) => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<SectionId>(scenes[0]!.id);
  const onActiveRef = useRef(onActiveChange);

  useEffect(() => {
    onActiveRef.current = onActiveChange;
  }, [onActiveChange]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    gsap.registerPlugin(ScrollTrigger);

    const ids = scenes.map((s) => s.id);

    const report = (id: SectionId) => {
      if (activeRef.current === id) return;

      activeRef.current = id;
      onActiveRef.current(id);
    };

    const sceneEls = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-scene]"),
    );

    const inners = sceneEls.map(
      (el) => el.querySelector<HTMLElement>("[data-scene-inner]")!,
    );

    const initialHash = window.location.hash.slice(1);
    const mm = gsap.matchMedia();

    mm.add(CINEMATIC_QUERY, () => {
      const n = sceneEls.length;
      const step = HOLD + ZOOM;
      const total = (n - 1) * step + HOLD;
      const labelTimes = sceneEls.map((_, i) => i * step);

      // Calculate scale so scene content fits the viewport.
      const fit = (i: number) => {
        const scene = sceneEls[i]!;
        const inner = inners[i]!;

        const cs = getComputedStyle(scene);

        const avail =
          scene.clientHeight -
          parseFloat(cs.paddingTop) -
          parseFloat(cs.paddingBottom);

        return Math.min(
          1,
          avail / Math.max(1, inner.offsetHeight),
        );
      };

      // Keep every upcoming section hidden initially.
      gsap.set(sceneEls.slice(1), { autoAlpha: 0 });

      inners.forEach((inner, i) =>
        gsap.set(inner, {
          scale: i === 0 ? fit(0) : fit(i) * 0.72,
        }),
      );

      // ==========================================
      // ABOUT CARDS - INITIAL HIDDEN STATE
      // ==========================================

      const aboutIndex = ids.indexOf("about" as SectionId);

      if (aboutIndex >= 0) {
        const aboutScene = sceneEls[aboutIndex]!;

        const aboutCards = [
          aboutScene.querySelector<HTMLElement>(
            "[data-about-education]",
          ),
          aboutScene.querySelector<HTMLElement>(
            "[data-about-focus]",
          ),
          aboutScene.querySelector<HTMLElement>(
            "[data-about-location]",
          ),
        ].filter((card): card is HTMLElement => card !== null);

        // Hide cards independently of the About section.
        gsap.set(aboutCards, {
          autoAlpha: 0,
          x: 90,
          scale: 0.96,
        });
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },

        scrollTrigger: {
          trigger: stage,
          start: "top top",

          end: () =>
            `+=${Math.round(
              total * window.innerHeight * SCROLL_PER_UNIT,
            )}`,

          pin: true,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const t = self.progress * total;

            let idx = 0;

            for (let i = 0; i < labelTimes.length; i++) {
              if (t >= labelTimes[i]! - ZOOM / 2) {
                idx = i;
              }
            }

            report(ids[idx]!);
          },
        },
      });

      // ==========================================
      // MAIN CINEMATIC SECTION TRANSITIONS
      // ==========================================

      for (let i = 0; i < n - 1; i++) {
        const t0 = i * step + HOLD;

        const current = sceneEls[i]!;
        const next = sceneEls[i + 1]!;

        const inner = inners[i]!;
        const nextInner = inners[i + 1]!;

        // 1. Current scene zooms toward the viewer.
        tl.fromTo(
          inner,
          { scale: () => fit(i) },
          {
            scale: () => fit(i) * 2.4,
            duration: ZOOM * 0.75,
            ease: "power2.in",
            immediateRender: false,
          },
          t0,
        );

        // 2. Current scene fades away.
        tl.to(
          current,
          {
            autoAlpha: 0,
            duration: ZOOM * 0.4,
            ease: "power1.in",
          },
          t0 + ZOOM * 0.15,
        );

        // 3. Next scene zooms into position.
        tl.fromTo(
          nextInner,
          { scale: () => fit(i + 1) * 0.72 },
          {
            scale: () => fit(i + 1),
            duration: ZOOM * 0.45,
            ease: "power3.out",
            immediateRender: false,
          },
          t0 + ZOOM * 0.60,
        );

        // 4. Reveal the next scene.
        tl.to(
          next,
          {
            autoAlpha: 1,
            duration: ZOOM * 0.40,
            ease: "power1.out",
          },
          t0 + ZOOM * 0.60,
        );

        // ==========================================
        // ABOUT SECTION - CARDS ONLY ANIMATION
        // ==========================================

        if (ids[i + 1] === "about") {
          const education =
            next.querySelector<HTMLElement>(
              "[data-about-education]",
            );

          const focus =
            next.querySelector<HTMLElement>(
              "[data-about-focus]",
            );

          const location =
            next.querySelector<HTMLElement>(
              "[data-about-location]",
            );

          // Start only after the About transition finishes.
          const cardsStart = t0 + ZOOM * 1.08;

          // 1. Education card appears first.
          if (education) {
            tl.to(
              education,
              {
                x: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.4,
                ease: "power3.out",
              },
              cardsStart,
            );
          }

          // 2. Core focus card appears second.
          if (focus) {
            tl.to(
              focus,
              {
                x: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.35,
                ease: "power3.out",
              },
              cardsStart + 0.14,
            );
          }

          // 3. Based in card appears last.
          if (location) {
            tl.to(
              location,
              {
                x: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.35,
                ease: "power3.out",
              },
              cardsStart + 0.28,
            );
          }
        }
      }

      // Rest on the final scene before releasing the pin.
      tl.to({}, { duration: HOLD }, (n - 1) * step);

      setSceneResolver((id) => {
        const idx = ids.indexOf(id as SectionId);
        const st = tl.scrollTrigger;

        if (idx < 0 || !st) return null;

        return (
          st.start +
          (st.end - st.start) * (labelTimes[idx]! / total)
        );
      });

      if (initialHash && ids.includes(initialHash as SectionId)) {
        requestAnimationFrame(() =>
          navigateTo(initialHash, { instant: true }),
        );
      }

      return () => setSceneResolver(null);
    });

    // Natural scrolling on smaller screens or reduced-motion settings.
    mm.add(`not all and ${CINEMATIC_QUERY}`, () => {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              report(entry.target.id as SectionId);
            }
          }
        },
        { rootMargin: "-45% 0px -50% 0px" },
      );

      sceneEls.forEach((el) => io.observe(el));

      return () => io.disconnect();
    });

    let cancelled = false;

    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      mm.revert();
    };
  }, [scenes]);

  return (
    <div ref={stageRef} className="stage">
      {scenes.map((scene) => (
        <section
          key={scene.id}
          id={scene.id}
          data-scene
          aria-label={scene.label}
          className="scene"
        >
          <div data-scene-inner className="scene-inner w-full">
            {scene.content}
          </div>
        </section>
      ))}
    </div>
  );
}
