import PhoneFrame from './PhoneFrame'
import { SCREENS } from '../content/siteContent'

// The three-screen composition has dedicated transforms at desktop and mobile breakpoints to mirror both artboards.
export default function ScreensShowcase() {
  return (
    <section className="screens-band" aria-labelledby="screens-title">
      <div className="container narrow-copy section-heading">
        <span className="eyebrow cool"><span />Inside the app</span>
        <h2 id="screens-title">Every screen, designed to keep you on track</h2>
        <p>Clean, focused, and built so healthy habits feel simple rather than like homework.</p>
      </div>
      <div className="screens-stack" aria-label="Selected GoodHealthMate application screens">
        <PhoneFrame className="side left" src={SCREENS.mealPlan} alt="GoodHealthMate meal plan screen" />
        <PhoneFrame className="center" src={SCREENS.home} alt="GoodHealthMate home dashboard" />
        <PhoneFrame className="side right" src={SCREENS.calorie} alt="GoodHealthMate calorie summary screen" />
      </div>
    </section>
  )
}
