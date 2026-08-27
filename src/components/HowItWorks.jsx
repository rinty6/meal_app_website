import { HOW_STEPS } from '../content/siteContent'

export default function HowItWorks() {
  return (
    <section className="how-section" id="how-it-works" aria-labelledby="how-title">
      <div className="container">
        <div className="section-heading narrow-copy">
          <span className="eyebrow warm"><span />Three steps</span>
          <h2 id="how-title">How it works</h2>
          <p>You&apos;ll be logging your first meal about ninety seconds after you open the app.</p>
        </div>
        <div className="steps-grid">
          {HOW_STEPS.map((step, index) => (
            <article className="step-card" key={step.title}>
              <span className="step-number">{index + 1}</span><img src={step.pip} alt="" aria-hidden="true" />
              <h3>{step.title}</h3><p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
