import React, { useState } from 'react';
import { QrCode, Apple, LineChart, Calendar, Award, ShoppingBagIcon, X } from 'lucide-react';

import goodHealthMateLogo from './assets/GoodHealthMate_logo.png';

const AboutModalContent = () => (
  <div className="space-y-8">
    <p className="text-lg text-text-secondary leading-relaxed">
      GoodhealthMate is designed to help people build healthier eating habits without making life complicated. You can
      track meals, monitor calories and nutrition, plan ahead, and stay focused on realistic goals that actually fit
      your daily routine.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="rounded-2xl border border-border bg-blue-50/70 p-6">
        <h3 className="text-xl font-bold text-text-primary mb-2">Track What Matters</h3>
        <p className="text-text-secondary">Log food, view macros, and understand your day with clear nutrition summaries.</p>
      </div>
      <div className="rounded-2xl border border-border bg-orange-50/70 p-6">
        <h3 className="text-xl font-bold text-text-primary mb-2">Plan With Confidence</h3>
        <p className="text-text-secondary">Build meal plans and shopping lists so healthy choices are easier every week.</p>
      </div>
      <div className="rounded-2xl border border-border bg-emerald-50/70 p-6">
        <h3 className="text-xl font-bold text-text-primary mb-2">Improve Over Time</h3>
        <p className="text-text-secondary">Follow your progress reports and make small, smart adjustments toward your goals.</p>
      </div>
    </div>
  </div>
);

const ContactModalContent = () => (
  <div className="space-y-6">
    <p className="text-text-secondary text-lg">
      Need help or want to share ideas? Reach us directly at{' '}
      <a href="mailto:duongphuthinh2001@gmail.com" className="text-primary font-semibold hover:underline">
        duongphuthinh2001@gmail.com
      </a>
      .
    </p>
    <p className="text-text-secondary">You can also send feedback below and attach screenshots or photos.</p>

    <form
      action="https://formsubmit.co/duongphuthinh2001@gmail.com"
      method="POST"
      encType="multipart/form-data"
      className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-5"
    >
      <input type="hidden" name="_subject" value="GoodhealthMate Website Feedback" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-text-primary mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="w-full rounded-lg border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-lg border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-text-primary mb-2">
          Feedback
        </label>
        <textarea
          id="message"
          name="feedback_message"
          required
          rows="5"
          placeholder="Share your feedback..."
          className="w-full rounded-lg border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div>
        <label htmlFor="images" className="block text-sm font-semibold text-text-primary mb-2">
          Attach Images (optional)
        </label>
        <input
          id="images"
          name="attachment"
          type="file"
          accept="image/*"
          multiple
          className="w-full rounded-lg border border-border px-3 py-2 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white hover:file:bg-blue-600"
        />
      </div>

      <button
        type="submit"
        className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Send Feedback
      </button>
    </form>
  </div>
);

const PrivacyModalContent = () => (
  <div className="space-y-8 text-text-secondary leading-relaxed">
    <div>
      <p className="text-text-secondary mb-1">Effective Date: March 28, 2026</p>
      <p className="text-text-secondary">Last Updated: March 28, 2026</p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">1. Introduction and Scope</h3>
      <p>
        This Privacy Policy describes how GoodHealthMate (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects your
        personal information. We operate under a &quot;Privacy by Design&quot; framework to meet the requirements of the
        Australian Privacy Principles (APPs), the EU/UK GDPR, the EU AI Act, the EU Data Act, and US State laws
        including the CCPA/CPRA and Washington&apos;s My Health My Data Act.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">2. Information We Collect</h3>
      <p className="mb-4">We collect information that identifies, relates to, or could reasonably be linked to you.</p>
      <h4 className="text-xl font-bold text-text-primary mb-2">A. Sensitive Personal Information (2026 Definitions)</h4>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>
          <span className="font-semibold text-text-primary">Consumer Health Data (Washington MHMDA): </span>
          Includes bodily functions, vital signs (heart rate, weight), symptoms, and inferences drawn from your
          nutrition logs.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Neural Data (CCPA/CPA): </span>
          If you use compatible wearable neurotechnology, we collect information generated by measuring the activity of
          your central or peripheral nervous system (e.g., EEG data).
        </li>
        <li>
          <span className="font-semibold text-text-primary">Biometric Data: </span>
          Data used for identity verification or health tracking.
        </li>
      </ul>

      <h4 className="text-xl font-bold text-text-primary mb-2">B. Device and Technical Data (Australian Smart Device Rules 2025)</h4>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <span className="font-semibold text-text-primary">Relevant Connectable Product Data: </span>
          If integrated with a wearable, we collect unique device identifiers and security status.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Sensor Data (EU Data Act): </span>
          Raw and pre-processed sensor data generated by your use of connected hardware.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">3. Automated Decision-Making and AI Transparency</h3>
      <p className="mb-3">
        Our application utilizes Automated Decision-Making Technology (ADMT) to provide personalized calorie and
        nutrition recommendations.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <span className="font-semibold text-text-primary">Logic and Purpose: </span>
          Our algorithms process your age, activity level, and health goals to generate daily targets. This is not
          &quot;Medical Nutrition Therapy&quot; but informational tracking.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Significant Decisions: </span>
          In jurisdictions like California, you have the right to opt-out of ADMT if it is used for &quot;significant
          decisions.&quot; We do not use ADMT to deny health insurance or medical care.
        </li>
        <li>
          <span className="font-semibold text-text-primary">AI Marking: </span>
          Content generated by our AI coach is marked in a machine-readable format as &quot;AI-generated&quot; per the EU AI
          Act.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">4. Washington State Consumer Health Data Rights</h3>
      <p className="mb-3">Under the My Health My Data Act (MHMDA), Washington residents have specific rights:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <span className="font-semibold text-text-primary">Double Opt-In: </span>
          We require separate, explicit consent to collect your health data and a second, distinct consent to share it.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Right to Delete: </span>
          You may request the absolute deletion of your health data, including all backups and archives.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Geofencing Prohibition: </span>
          We do not utilize geofencing within 2,000 feet of any healthcare facility to track or target users.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">5. California Privacy Rights (CCPA 2026)</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <span className="font-semibold text-text-primary">Neural Data Opt-Out: </span>
          You have the right to limit the use of your neural data to only what is necessary for the app&apos;s primary
          function.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Expanded Right to Know: </span>
          You may request access to personal information collected since January 1, 2022, even if it exceeds the
          traditional 12-month window.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Global Privacy Control (GPC): </span>
          We automatically honor GPC signals as a valid opt-out of the &quot;sale&quot; or &quot;sharing&quot; of your data.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">6. Australian Cyber Security &amp; Consumer Protections</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <span className="font-semibold text-text-primary">Security Update Support: </span>
          We commit to providing security updates for this application and its integrations until at least March 28,
          2029. This support period will not be shortened.
        </li>
        <li>
          <span className="font-semibold text-text-primary">No Default Passwords: </span>
          Our app requires you to set a unique, complex password upon registration; we never use universal default
          credentials.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Vulnerability Disclosure: </span>
          If you discover a security flaw, please report it to our security team at{' '}
          <a href="mailto:duongphuthinh2001@gmail.com" className="text-primary font-semibold hover:underline">
            duongphuthinh2001@gmail.com
          </a>
          . We will acknowledge receipt within 48 hours.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">7. EU/UK Data Portability (Data Act 2025/26)</h3>
      <p>
        Under the EU Data Act, you have a right to access &quot;raw and pre-processed sensor data&quot; generated by your
        connected devices and have us transmit that data to a third-party service of your choice without delay and free
        of charge.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">8. Prohibition of Dark Patterns</h3>
      <p className="mb-3">We strictly adhere to the FTC&apos;s &quot;Click-to-Cancel&quot; rule and ACCC guidelines.</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <span className="font-semibold text-text-primary">Symmetry of Effort: </span>
          Canceling your subscription is as easy as signing up. We do not use &quot;confirm shaming&quot; or hidden &quot;save&quot;
          loops.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Transparency: </span>
          All pricing and renewal terms are disclosed clearly before you provide consent.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">9. Contact and Redress</h3>
      <p className="mb-3">To exercise your rights or file a complaint:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <span className="font-semibold text-text-primary">Email: </span>
          <a href="mailto:duongphuthinh2001@gmail.com" className="text-primary font-semibold hover:underline">
            duongphuthinh2001@gmail.com
          </a>
        </li>
      </ul>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">Implementation Guidance for your UI/UX Team</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          The &quot;Washington Link&quot;: Ensure the link &quot;Consumer Health Data Privacy Policy&quot; is separate from the main
          &quot;Privacy Policy&quot; link on your footer.
        </li>
        <li>
          ADMT Pre-Use Notice: Before a user accesses the AI calorie coach for the first time, a pop-up must explain
          the logic and provide an opt-out.
        </li>
        <li>
          Statement of Compliance: Under the Australian Rules, you must include a digital &quot;Statement of Compliance&quot;
          accessible within the app settings.
        </li>
        <li>
          No &quot;Reject All&quot; Friction: The &quot;Reject All&quot; button on your cookie/consent banner must be as prominent and
          easy to click as the &quot;Accept All&quot; button to avoid ACCC/FTC dark pattern penalties.
        </li>
      </ul>
    </div>
  </div>
);

function App() {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionToggle = (sectionName) => {
    setActiveSection((previousSection) => (previousSection === sectionName ? null : sectionName));
  };

  const closeModal = () => setActiveSection(null);

  const modalContent = {
    about: {
      title: 'About GoodhealthMate',
      subtitle: 'Learn what the app does and why it helps your daily nutrition goals.',
      body: <AboutModalContent />,
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Send us feedback and share images directly from this form.',
      body: <ContactModalContent />,
    },
    privacy: {
      title: 'Privacy Policy: GoodHealthMate',
      subtitle: 'Review how your data is collected, used, and protected.',
      body: <PrivacyModalContent />,
    },
  };

  const activeModal = activeSection ? modalContent[activeSection] : null;

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* 1. NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <img src={goodHealthMateLogo} alt="GoodhealthMate logo" className="h-10 w-auto object-contain" />
          <span className="text-xl font-bold text-primary tracking-tight">GoodhealthMate</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <a href="#features" className="hover:text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">
            How It Works
          </a>
          <button
            type="button"
            onClick={() => handleSectionToggle('about')}
            aria-expanded={activeSection === 'about'}
            className="hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer"
          >
            About
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <button className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors">
            Download App
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="bg-blue-50/50 px-6 pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 flex flex-col items-start text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-text-primary leading-[1.1] mb-6">
              Reach Your Goals with <br className="hidden md:block" />
              GoodhealthMate
            </h1>
            <p className="text-lg text-text-secondary mb-8 max-w-lg leading-relaxed">
              Track your daily meals, monitor your nutrition, and achieve lasting results. Join thousands who have
              transformed their lives.
            </p>

            {/* QR Code Call to Action */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-border flex items-center gap-5">
              <div className="w-24 h-24 bg-gray-50 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg text-text-secondary">
                <QrCode size={32} />
                <span className="text-[10px] uppercase tracking-wider mt-1 font-bold">Scan Me</span>
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-lg">Get the Mobile App</h3>
                <p className="text-sm text-text-secondary mt-1">Free for now. No credit card required.</p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 w-full mt-10 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80"
              alt="Healthy meal prep"
              className="rounded-2xl shadow-xl object-cover w-full h-96"
            />
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-4">Everything You Need to Succeed</h2>
          <p className="text-text-secondary text-lg mb-16">Powerful tools to help you reach your fitness goals</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-primary flex items-center justify-center mb-6">
                <Apple size={32} />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Food Tracking</h3>
              <p className="text-text-secondary leading-relaxed">
                Log your meals with our extensive database. Scan barcodes for instant nutrition info.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-primary flex items-center justify-center mb-6">
                <LineChart size={32} />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Progress Reports</h3>
              <p className="text-text-secondary leading-relaxed">
                Visualize your journey with detailed charts and reports. Track your nutrition trends easily.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 text-secondary flex items-center justify-center mb-6">
                <Calendar size={32} />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Meal Planning</h3>
              <p className="text-text-secondary leading-relaxed">
                Plan your meals ahead of time. Create custom recipes and build your weekly meal schedule.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 text-secondary flex items-center justify-center mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Goal Setting</h3>
              <p className="text-text-secondary leading-relaxed">
                Set personalized goals for calorie target and nutrition. Get tailored recommendations.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 text-secondary flex items-center justify-center mb-6">
                <ShoppingBagIcon size={32} />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Shopping Support</h3>
              <p className="text-text-secondary leading-relaxed">
                Create your own shopping lists to get all ingredients for your loved recipes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-16">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 bg-border z-0"></div>

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mb-6 border-4 border-gray-50">
                1
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Set Your Goals</h3>
              <p className="text-text-secondary">Tell us about yourself. We will provide a personalized meal plan just for you.</p>
            </div>

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mb-6 border-4 border-gray-50">
                2
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Track Your Day</h3>
              <p className="text-text-secondary">Log your meals. See your macros and stay within your daily targets.</p>
            </div>

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mb-6 border-4 border-gray-50">
                3
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">See Results</h3>
              <p className="text-text-secondary">Watch your progress over time. Adjust your plan and celebrate victories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className="bg-primary py-20 px-6 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Start Your Transformation Today</h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">Join who have reached their goals with GoodhealthMate.</p>
        <button className="bg-white text-primary font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
          Download the App Now
        </button>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-[#0B1120] text-gray-300 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-gray-800 pb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={goodHealthMateLogo} alt="GoodhealthMate logo" className="h-8 w-auto object-contain" />
              <span className="text-lg font-bold text-white tracking-tight">GoodhealthMate</span>
            </div>
            <p className="text-sm text-gray-400">The fitness and nutrition tracker for reaching your goals.</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSectionToggle('about')}
                  aria-expanded={activeSection === 'about'}
                  className="hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => handleSectionToggle('contact')}
                  aria-expanded={activeSection === 'contact'}
                  className="hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSectionToggle('privacy')}
                  aria-expanded={activeSection === 'privacy'}
                  className="hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">© 2026 GoodhealthMate. All rights reserved.</div>
      </footer>

      {/* 7. MODAL */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="info-modal-title"
            className="w-full max-w-6xl max-h-[92vh] bg-[#F9F7EE] border border-gray-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-6 md:px-8 pt-6 pb-5 border-b border-gray-200">
              <div>
                <h2 id="info-modal-title" className="text-2xl md:text-3xl font-bold text-text-primary">
                  {activeModal.title}
                </h2>
                <p className="text-text-secondary mt-2">{activeModal.subtitle}</p>
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-6 md:px-8 py-6 overflow-y-auto">{activeModal.body}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
