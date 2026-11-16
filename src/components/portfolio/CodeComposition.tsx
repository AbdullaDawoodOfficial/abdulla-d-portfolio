import { useRef } from "react";

type Tok = [cls: string, text: string];

const k = (t: string): Tok => ["tok-kw", t];
const a = (t: string): Tok => ["tok-ann", t];
const ty = (t: string): Tok => ["tok-type", t];
const s = (t: string): Tok => ["tok-str", t];
const f = (t: string): Tok => ["tok-fn", t];
const p = (t: string): Tok => ["tok-pun", t];
const x = (t: string): Tok => ["tok-txt", t];
const c = (t: string): Tok => ["tok-com", t];

const CODE: Tok[][] = [
  [a("@RestController")],
  [a("@RequestMapping"), p("("), s('"/api/persons"'), p(")")],
  [k("public class "), ty("PersonController"), p(" {")],
  [],
  [x("    "), k("private final "), ty("PersonService"), x(" service"), p(";")],
  [],
  [x("    "), c("// One person, one Aadhaar — clean and simple")],
  [x("    "), a("@GetMapping"), p("("), s('"/{id}"'), p(")")],
  [x("    "), k("public "), ty("ResponseEntity"), p("<"), ty("Person"), p("> "), f("findById"), p("(")],
  [x("            "), a("@PathVariable "), ty("Long"), x(" id"), p(") {")],
  [x("        "), k("return "), x("service"), p("."), f("findById"), p("("), x("id"), p(")")],
  [x("            "), p("."), f("map"), p("("), ty("ResponseEntity"), p("::"), f("ok"), p(")")],
  [x("            "), p("."), f("orElse"), p("("), ty("ResponseEntity"), p("."), f("notFound"), p("()."), f("build"), p("());")],
  [x("    "), p("}")],
  [p("}")],
];

function WindowDots() {
  return (
    <div className="flex gap-1.5" aria-hidden>
      <span className="size-2.5 rounded-full bg-border-strong" />
      <span className="size-2.5 rounded-full bg-border-strong" />
      <span className="size-2.5 rounded-full bg-border-strong" />
    </div>
  );
}

/** Decorative editor + terminal composition for the hero. */
export function CodeComposition() {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--rx", `${(-py * 6).toFixed(2)}deg`);
    ref.current.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-hidden
      className="relative mx-auto w-full max-w-[560px] [perspective:1400px]"
    >
      {/* soft halo behind the windows */}
      <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-accent opacity-20 blur-3xl" />

      <div className="transition-transform duration-500 ease-out [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] [transform-style:preserve-3d]">
        {/* Editor */}
        <div className="overflow-hidden rounded-2xl border border-border-strong bg-[var(--code-bg)] shadow-window backdrop-blur-xl">
          <div className="flex items-center gap-4 border-b border-border px-4 py-3">
            <WindowDots />
            <div className="flex items-center gap-1 font-mono text-[0.7rem]">
              <span className="rounded-md bg-surface-strong px-2.5 py-1 text-foreground">PersonController.java</span>
              <span className="px-2.5 py-1 text-subtle-foreground">Person.java</span>
            </div>
          </div>
          <pre className="overflow-hidden px-4 py-4 font-mono text-[clamp(0.64rem,min(0.95vw,1.6vh),0.8rem)] leading-[1.75]">
            <code>
              {CODE.map((line, i) => (
                <div key={i} className="flex">
                  <span className="w-7 shrink-0 select-none pr-4 text-right text-subtle-foreground/60">{i + 1}</span>
                  <span className="whitespace-pre">
                    {line.map(([cls, text], j) => (
                      <span key={j} className={cls}>
                        {text}
                      </span>
                    ))}
                    {i === CODE.length - 1 && <span className="caret ml-1" />}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Terminal */}
        <div className="glass shadow-window absolute -bottom-10 -left-6 w-[62%] rounded-xl [transform:translateZ(60px)] sm:-left-10">
          <div className="flex items-center gap-3 border-b border-border px-3 py-2">
            <WindowDots />
            <span className="font-mono text-[0.65rem] text-subtle-foreground">zsh — backend</span>
          </div>
          <div className="space-y-1 px-3 py-3 font-mono text-[0.68rem] leading-relaxed">
            <p>
              <span className="text-primary">$</span> <span className="text-foreground">mvn spring-boot:run</span>
            </p>
            <p className="text-subtle-foreground">:: Spring Boot ::</p>
            <p className="text-muted-foreground">
              Tomcat started on port <span className="text-cyan">8080</span>
            </p>
          </div>
        </div>

        {/* Request chip */}
        <div className="glass shadow-window absolute -right-3 -top-5 flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[0.68rem] [transform:translateZ(90px)] sm:-right-6">
          <span className="font-semibold text-cyan">GET</span>
          <span className="text-muted-foreground">/api/persons/1</span>
          <span className="rounded-full bg-success/15 px-2 py-0.5 font-semibold text-success">200</span>
        </div>
      </div>
    </div>
  );
}
