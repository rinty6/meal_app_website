import PhoneFrame from './PhoneFrame'
import { LOGGING_METHODS } from '../content/siteContent'

export default function LoggingMethods() {
  return (
    <section className="logging-section" aria-labelledby="logging-title">
      <div className="container">
        <div className="section-heading narrow-copy">
          <h2 id="logging-title">Three more ways to get a meal down</h2>
          <p>Because the fastest way to log lunch depends entirely on where you are.</p>
        </div>
        <div className="logging-grid">
          {LOGGING_METHODS.map((method) => (
            <article className="logging-card" key={method.title}>
              <div className="logging-phone"><PhoneFrame src={method.image} alt={method.alt} /></div>
              <h3>{method.title}</h3><p>{method.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
