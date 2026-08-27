import { CalendarDays, ChartNoAxesCombined, Check, Heart, ShoppingBag, Target, Utensils } from 'lucide-react'
import PhoneFrame from './PhoneFrame'

const ICONS = { utensils: Utensils, chart: ChartNoAxesCombined, calendar: CalendarDays, target: Target, bag: ShoppingBag, heart: Heart }

export default function FeatureSection({ feature, reverse }) {
  const Icon = ICONS[feature.icon]
  return (
    <section className={`feature-row ${reverse ? 'reverse' : ''}`} id={feature.id}>
      <div className="container feature-inner">
        <div className="feature-copy">
          <span className="feature-icon"><Icon aria-hidden="true" /></span>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
          <ul>{feature.bullets.map((bullet) => <li key={bullet}><Check aria-hidden="true" />{bullet}</li>)}</ul>
        </div>
        <div className={`feature-visual ${feature.tone}`}>
          {feature.pip ? (
            <div className="pip-mate-wrap">
              <img src="/assets/redesign/pip-mate.svg" alt="Pip celebrating a successful day" />
              <div className="pip-message"><strong>Nailed it, mate!</strong><span>You finished the day inside your target. Same again tomorrow?</span></div>
            </div>
          ) : <PhoneFrame src={feature.image} alt={feature.alt} />}
        </div>
      </div>
    </section>
  )
}
