import { Bell } from 'lucide-react'

// The animated SVG is extracted unchanged from the approved Pip rig so its character proportions stay exact.
export default function PipCookingScene() {
  return (
    <div className="pip-cooking" aria-label="Pip cooking a meal">
      <div className="pip-scene-frame"><img src="/assets/redesign/pip-cooking.svg" alt="Pip cooking a healthy meal in the kitchen" /></div>
      <div className="pip-notification">
        <span className="notification-icon"><Bell aria-hidden="true" /></span>
        <span><strong>Time for dinner?</strong><small>A 1,050 kcal dinner keeps today on track.</small></span>
      </div>
      <div className="remaining-pill"><span />2,886 kcal remaining</div>
    </div>
  )
}
