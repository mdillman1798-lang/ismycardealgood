const steps = [
  {
    n: '1',
    title: 'Pick your situation',
    body: 'Evaluating a loan offer? Trying to decode a lease? Or figuring out how much to spend before you shop? Choose the right tool.',
  },
  {
    n: '2',
    title: 'Enter the numbers from your offer',
    body: 'Copy the figures from your quote sheet — price, APR, money factor, term. No personal information required.',
  },
  {
    n: '3',
    title: 'See the full picture',
    body: "Your total cost, monthly payment, and a plain-English verdict on whether the deal is competitive. Then decide.",
  },
];

export function HowItWorks() {
  return (
    <section className="section border-b border-white/[0.06]">
      <div className="container">
        <div className="max-w-xl mb-14">
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-3xl font-bold text-white mb-3">From offer to answer in 60 seconds.</h2>
          <p className="text-zinc-400 leading-relaxed">
            No jargon. No signup. No pressure. Put in what the dealer gave you, and get back what they didn&rsquo;t tell you.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((s) => (
            <div key={s.n}>
              <div className="text-[3.5rem] font-bold text-zinc-800 leading-none mb-4 font-mono select-none">
                {s.n}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
