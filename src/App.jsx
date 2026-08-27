import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import ScreensShowcase from './components/ScreensShowcase'
import FeatureSection from './components/FeatureSection'
import LoggingMethods from './components/LoggingMethods'
import HowItWorks from './components/HowItWorks'
import DownloadCallout from './components/DownloadCallout'
import Footer from './components/Footer'
import { FEATURES } from './content/siteContent'

function App() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <ScreensShowcase />
        <section className="section-heading features-heading" aria-labelledby="features-title">
          <div className="container narrow-copy">
            <h2 id="features-title">Everything you need to succeed</h2>
            <p>Six things the app does every day, so you don&apos;t have to think about any of them.</p>
          </div>
        </section>
        {FEATURES.map((feature, index) => (
          <FeatureSection key={feature.id} feature={feature} reverse={index % 2 === 1} />
        ))}
        <LoggingMethods />
        <HowItWorks />
        <DownloadCallout />
      </main>
      <Footer />
    </div>
  )
}

export default App
