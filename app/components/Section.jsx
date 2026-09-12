// A numbered page section. The label sits in a narrow left column on
// wide screens and stacks above the content on narrow ones.
export default function Section({ id, index, title, children }) {
  return (
    <section id={id} className="scroll-mt-14 border-t border-line py-14 sm:py-20">
      <div className="grid gap-8 md:grid-cols-[13rem_1fr] md:gap-12">
        <div className="md:sticky md:top-24 md:self-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{index}</p>
          <h2 className="mt-2 font-display text-3xl leading-none text-ink">{title}</h2>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}
