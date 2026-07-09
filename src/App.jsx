import React, { useState, useEffect, useRef, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Apple,
  LineChart,
  Calendar,
  Award,
  ShoppingBagIcon,
  X,
  Footprints,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
} from 'lucide-react';

import goodHealthMateLogo from './assets/GoodHealthMate_logo.png';
import homeScreen from './assets/prototypes/home page.png';
import calorieSummaryScreen from './assets/prototypes/calorie summary page.png';
import calorieInsightScreen from './assets/prototypes/calorie insight page.png';
import mealPlanningScreen from './assets/prototypes/meal planning page.png';
import recipeScreen from './assets/prototypes/recipe page.png';
import favoritesScreen from './assets/prototypes/favorites page.png';
import shoppingListScreen from './assets/prototypes/shopping list page.png';
import addFoodScreen from './assets/prototypes/add food search results.png';
import barcodeScreen from './assets/prototypes/barcode scan result.png';
import profileScreen from './assets/prototypes/profile page.png';

const SCREENS = [
  {
    id: 'home',
    name: 'Daily Dashboard',
    desc: 'Greet the day with your calorie summary, macros, and quick actions in one glance.',
    img: homeScreen,
  },
  {
    id: 'calorie-summary',
    name: 'Calorie Summary',
    desc: 'Drill into your day — meal-by-meal calorie split, carbs, fats and protein at a glance.',
    img: calorieSummaryScreen,
  },
  {
    id: 'calorie-insight',
    name: 'Nutrition Insights',
    desc: 'Trends and weekly breakdowns help you see where to lean in and where to ease up.',
    img: calorieInsightScreen,
  },
  {
    id: 'add-food-search',
    name: 'Add Food',
    desc: 'Search a database tuned for the Australian shelf — log a meal in seconds.',
    img: addFoodScreen,
  },
  {
    id: 'barcode-scan',
    name: 'Barcode Scan',
    desc: 'Point, scan, log. Instant nutrition pulled straight from the packet.',
    img: barcodeScreen,
  },
  {
    id: 'meal-planning',
    name: 'Meal Planning',
    desc: 'Lay out the week ahead. Drag meals across days and keep your goals in sight.',
    img: mealPlanningScreen,
  },
  {
    id: 'recipe',
    name: 'Recipes',
    desc: 'A library of healthy recipes with macros pre-calculated for your plan.',
    img: recipeScreen,
  },
  {
    id: 'favorites',
    name: 'Favorites',
    desc: 'Save the meals and recipes you keep coming back to — one tap to re-log.',
    img: favoritesScreen,
  },
  {
    id: 'shopping-list',
    name: 'Shopping List',
    desc: 'Your week’s plan, turned into a tidy shopping list you can tick off in-store.',
    img: shoppingListScreen,
  },
  {
    id: 'profile',
    name: 'Profile & Goals',
    desc: 'Personal targets, streaks, and progress — all wrapped in one place.',
    img: profileScreen,
  },
];

const AUTO_MS = 4500;
const TICK_MS = 50;

const positionFor = (idx, active, total) => {
  let diff = ((idx - active) % total + total) % total;
  if (diff > total / 2) diff -= total;
  if (diff === 0) return 'center';
  if (diff === -1) return 'left-1';
  if (diff === 1) return 'right-1';
  if (diff === -2) return 'left-2';
  if (diff === 2) return 'right-2';
  return 'hidden';
};

function Showcase() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const total = SCREENS.length;
  const hoverRef = useRef(false);

  const go = useCallback(
    (next) => {
      setActive(((next % total) + total) % total);
      setProgress(0);
    },
    [total],
  );

  const goRel = useCallback(
    (delta) => {
      setActive((cur) => ((cur + delta) % total + total) % total);
      setProgress(0);
    },
    [total],
  );

  useEffect(() => {
    if (!playing) return undefined;
    const id = setInterval(() => {
      if (hoverRef.current) return;
      setProgress((p) => {
        const np = p + (TICK_MS / AUTO_MS) * 100;
        if (np >= 100) {
          setActive((cur) => (cur + 1) % total);
          return 0;
        }
        return np;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [playing, total]);

  useEffect(() => {
    const onKey = (ev) => {
      if (ev.key === 'ArrowLeft') goRel(-1);
      if (ev.key === 'ArrowRight') goRel(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goRel]);

  const current = SCREENS[active];

  return (
    <section id="showcase" className="showcase">
      <div className="showcase-inner">
        <div className="showcase-head">
          <span className="showcase-eyebrow">
            <span className="dot" />
            Inside the App
          </span>
          <h2 className="showcase-title">
            Every screen, <em>designed to keep you on track</em>
          </h2>
          <p className="showcase-sub">
            Ten thoughtfully crafted screens that turn calorie tracking into a habit — not a chore.
          </p>
        </div>

        <div className="stage-wrap">
          <button
            type="button"
            className="stage-arrow prev"
            aria-label="Previous screen"
            onClick={() => goRel(-1)}
          >
            <ArrowLeft size={22} strokeWidth={2.4} />
          </button>

          <div
            className="stage"
            onMouseEnter={() => {
              hoverRef.current = true;
            }}
            onMouseLeave={() => {
              hoverRef.current = false;
            }}
          >
            {SCREENS.map((s, i) => {
              const pos = positionFor(i, active, total);
              return (
                <button
                  key={s.id}
                  type="button"
                  className="phone"
                  data-pos={pos}
                  aria-label={`Show ${s.name}`}
                  onClick={() => go(i)}
                >
                  <div
                    className="phone-screen"
                    style={{ backgroundImage: `url("${s.img}")` }}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="stage-arrow next"
            aria-label="Next screen"
            onClick={() => goRel(1)}
          >
            <ArrowRight size={22} strokeWidth={2.4} />
          </button>
        </div>

        <div className="stage-caption">
          <span className="step">
            {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <h3 className="name">{current.name}</h3>
          <p className="desc">{current.desc}</p>
        </div>

        <div className="progress-row">
          <button
            type="button"
            className="play-btn"
            aria-label={playing ? 'Pause auto-advance' : 'Resume auto-advance'}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="chip-row">
          {SCREENS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`chip${i === active ? ' active' : ''}`}
              onClick={() => go(i)}
            >
              <span className="idx">{i + 1}</span>
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const CONTACT_PATH = '/contact-us';

const getRoutedSection = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.location.pathname === CONTACT_PATH ? 'contact' : null;
};

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
      <a href="mailto:support@dreamingstudio.net" className="text-primary font-semibold hover:underline">
        support@dreamingstudio.net
      </a>
      .
    </p>
    <p className="text-text-secondary">You can also send feedback below and attach screenshots or photos.</p>

    <form
      action="https://formsubmit.co/support@dreamingstudio.net"
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
      <p className="text-text-secondary mb-1">
        <span className="font-semibold text-text-primary">Operator:</span> GoodHealthMate
      </p>
      <p className="text-text-secondary mb-1">
        <span className="font-semibold text-text-primary">Last Updated:</span> May 13, 2026
      </p>
      <p className="text-text-secondary">
        <span className="font-semibold text-text-primary">Contact:</span>{' '}
        <a href="mailto:support@dreamingstudio.net" className="text-primary font-semibold hover:underline">
          support@dreamingstudio.net
        </a>
      </p>
    </div>

    <div>
      <p>
        This Privacy Policy explains how GoodHealthMate collects, uses, stores, and shares information when you use the
        GoodHealthMate mobile app and related meal-planning, recommendation, notification, and food-recognition
        services.
      </p>
    </div>

    <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
      <h4 className="text-lg font-bold text-text-primary mb-1">Tracking</h4>
      <p className="text-text-primary italic">
        &quot;We do not use your personal information for cross-app tracking or targeted advertising.&quot;
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">1. Who This Policy Covers</h3>
      <p className="mb-3">
        This Privacy Policy applies to the GoodHealthMate mobile application and related services operated by
        GoodHealthMate, including connected meal-planning, recommendation, feedback, notification, and food-recognition
        features that link to this policy.
      </p>
      <p>
        If you use third-party sign-in, nutrition lookup, or notification providers through the app, those providers
        may also process your information under their own privacy terms. This policy describes our handling of
        information within the GoodHealthMate service.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">2. Information We Collect</h3>
      <p className="mb-3">
        We collect information you provide directly, information created through your use of the app, and limited
        technical data needed to operate the service.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <span className="font-semibold text-text-primary">Account and identity information. </span>
          When you create or use an account, we collect information such as your name, email address, authentication
          identifiers, and account profile details.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Profile and health-related information. </span>
          We collect data such as height, weight, preferred measurement units, gender, date of birth, activity level,
          nutrition goals, and calorie-goal settings to personalize meal planning and related recommendations.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Meal-planning and saved-content information. </span>
          We collect meal logs, saved recipes, favorites, shopping lists, shopping-list items, in-app notification
          history, and recommendation feedback you submit inside the app.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Food photos and correction submissions. </span>
          If you use food recognition or submit a correction for a wrong prediction, we may receive and process food
          images, predicted labels, corrected labels, and related feedback. Correction images may be retained to
          improve the quality and reviewability of the feature.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Support and feedback information. </span>
          If you contact us or submit feedback, we collect the content of your message, your email address, your
          account identifier if provided, and any optional attachments such as screenshots or photos.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Notification and device information. </span>
          If you enable push notifications, we collect your push token and basic device platform information needed to
          deliver notifications to your device.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Request-scoped inputs. </span>
          We process search terms, barcode inputs, recipe lookups, and similar request data when you use those
          features. We do not currently present a separate stored search-history feature in the app build audited for
          this policy.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">3. How We Use Information</h3>
      <p className="mb-3">We use personal information to operate, maintain, and improve GoodHealthMate.</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>To create and manage your account, authenticate you, and keep your profile in sync.</li>
        <li>To log meals, manage calorie goals, store saved recipes, favorites, and shopping lists.</li>
        <li>To personalize meal recommendations using your profile, goals, favorites, and feedback.</li>
        <li>To process food-recognition requests and review or improve correction submissions.</li>
        <li>To deliver push notifications and render your in-app notification inbox.</li>
        <li>To respond to customer support and product feedback submissions.</li>
        <li>To secure the service, diagnose operational issues, and comply with legal obligations.</li>
      </ul>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">4. When We Share Information</h3>
      <p className="mb-3 text-text-primary italic">
        &quot;We do not sell your personal information. We share information only when needed to provide the service,
        comply with the law, or protect rights and safety.&quot;
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <span className="font-semibold text-text-primary">Authentication providers. </span>
          We use Clerk and related authentication services to create and manage user accounts and sign-in sessions.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Infrastructure and service providers. </span>
          We use hosting, database, storage, email, and backend infrastructure providers to run the app and its
          related services.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Notification providers. </span>
          If you enable push notifications, your push token is processed through the notification services needed to
          deliver alerts.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Support providers. </span>
          Feedback submissions may be delivered through email providers such as Resend, Gmail SMTP, or another
          configured email service.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Food and nutrition services. </span>
          If you use food lookup or similar features, relevant request data may be sent to the third-party food or
          nutrition service used to return those results, such as the FatSecret platform integration used by the app.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Recommendation and food-recognition processing. </span>
          Profile, meal, and feedback data may be processed by our recommendation or food-recognition services so the
          app can return personalized results or image classifications.
        </li>
        <li>
          <span className="font-semibold text-text-primary">Legal and safety disclosures. </span>
          We may disclose information if required by law or if reasonably necessary to protect users, the service, or
          the public.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">5. Tracking and Advertising</h3>
      <p className="mb-3">
        GoodHealthMate does not use your name, email, user profile, device information, or other personal information
        for third-party tracking, cross-app tracking, data-broker sharing, or targeted advertising.
      </p>
      <p>
        In the app build audited for this policy, we did not identify third-party ad SDKs, cross-app tracking SDKs, or
        App Tracking Transparency flows in the mobile app or backend package manifests reviewed on May 13, 2026.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">6. How Long We Keep Information</h3>
      <p className="mb-3">
        We keep information for as long as reasonably necessary to provide the service, maintain records, comply with
        legal obligations, resolve disputes, and improve the product.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Account and profile information is generally retained while your account remains active.</li>
        <li>
          Meal logs, saved recipes, favorites, calorie goals, shopping lists, and recommendation feedback are retained
          until deleted, overwritten, or no longer needed for the service.
        </li>
        <li>Push tokens may be retained until they are refreshed, invalidated, or removed from your account.</li>
        <li>Feedback emails and attachments may be retained for support, troubleshooting, and product-improvement records.</li>
        <li>
          Food-recognition correction images and related logs may be retained in feedback storage until they are
          manually removed or no longer needed for review and improvement.
        </li>
        <li>Backups and short-lived logs may continue to exist for a limited period after deletion requests are processed.</li>
      </ul>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">7. Your Choices and Rights</h3>
      <p className="mb-3">
        Depending on where you live, you may have rights to access, correct, delete, or export personal information we
        hold about you.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>You can update some account and profile details inside the app.</li>
        <li>You can disable push notifications in your device settings or inside app settings where available.</li>
        <li>
          <span className="text-text-primary italic">
            &quot;You can request access, correction, export, or deletion by contacting us at{' '}
            <a href="mailto:support@dreamingstudio.net" className="text-primary font-semibold hover:underline">
              support@dreamingstudio.net
            </a>
            .&quot;
          </span>
        </li>
        <li>
          If you want us to review a privacy request, please include enough information for us to verify your account
          and understand the request.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">8. Security</h3>
      <p>
        We use reasonable administrative, technical, and organizational measures designed to protect personal
        information. No method of transmission or storage is completely secure, so we cannot guarantee absolute
        security.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">9. Children&apos;s Privacy</h3>
      <p>
        GoodHealthMate is not intended for children under the age of 16, or a higher minimum age where required by
        local law, unless a parent or guardian has authorized use where legally permitted. If you believe a child has
        provided personal information to us in violation of this section, contact us at{' '}
        <a href="mailto:support@dreamingstudio.net" className="text-primary font-semibold hover:underline">
          support@dreamingstudio.net
        </a>
        .
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">10. International Transfers</h3>
      <p>
        Your information may be processed in countries other than the one where you live, including countries where
        our service providers operate. Where required by applicable law, we rely on appropriate safeguards for such
        transfers.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">11. Changes to This Policy</h3>
      <p>
        We may update this Privacy Policy from time to time. If we make material changes, we will update the date at
        the top of this page and may provide additional notice inside the app or through other reasonable means.
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">12. Contact Us</h3>
      <p>
        GoodHealthMate is the operator of this app. If you have questions, support requests, or privacy requests,
        contact us at{' '}
        <a href="mailto:support@dreamingstudio.net" className="text-primary font-semibold hover:underline">
          support@dreamingstudio.net
        </a>
        .
      </p>
    </div>
  </div>
);

function App() {
  const [activeSection, setActiveSection] = useState(getRoutedSection);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const syncSectionFromUrl = () => setActiveSection(getRoutedSection());

    syncSectionFromUrl();
    window.addEventListener('popstate', syncSectionFromUrl);

    return () => window.removeEventListener('popstate', syncSectionFromUrl);
  }, []);

  const handleSectionToggle = (sectionName) => {
    if (typeof window !== 'undefined' && window.location.pathname === CONTACT_PATH) {
      window.history.replaceState({}, '', '/');
    }

    setActiveSection((previousSection) => (previousSection === sectionName ? null : sectionName));
  };

  const handleContactLinkClick = (event) => {
    event.preventDefault();
    setActiveSection('contact');

    if (typeof window !== 'undefined' && window.location.pathname !== CONTACT_PATH) {
      window.history.pushState({}, '', CONTACT_PATH);
    }
  };

  const closeModal = () => {
    setActiveSection(null);

    if (typeof window !== 'undefined' && window.location.pathname === CONTACT_PATH) {
      window.history.replaceState({}, '', '/');
    }
  };

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
          <a
            href={CONTACT_PATH}
            onClick={handleContactLinkClick}
            aria-expanded={activeSection === 'contact'}
            className="hover:text-primary transition-colors"
          >
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <a
            href="https://apps.apple.com/app/id6766896814"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Download App
          </a>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="bg-blue-50/50 px-6 pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 flex flex-col items-start text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-text-primary leading-[1.1] mb-6">
              Reach Your Goals with <br className="hidden md:block" />
              <span className="gradient-text">GoodhealthMate</span>
            </h1>
            <p className="text-lg text-text-secondary mb-8 max-w-lg leading-relaxed">
              Track your daily meals, monitor your nutrition, and achieve lasting results. Join thousands who have
              transformed their lives.
            </p>

            {/* QR Code Call to Action */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-border flex items-center gap-5">
              <a
                href="https://apps.apple.com/app/id6766896814"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
                aria-label="Download GoodHealthMate on the App Store"
              >
                <QRCodeSVG
                  value="https://apps.apple.com/app/id6766896814"
                  size={96}
                  bgColor="#ffffff"
                  fgColor="#1a1a2e"
                  level="M"
                />
              </a>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Now on the App Store</p>
                <h3 className="font-bold text-text-primary text-lg">Download GoodHealthMate</h3>
                <p className="text-sm text-text-secondary mt-1">Scan the QR code or tap the button below. Free to download.</p>
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

      {/* 3. EVERY SCREEN SHOWCASE (3D carousel) */}
      <Showcase />

      {/* 4. FEATURES SECTION */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Everything You Need to <span className="gradient-text">Succeed</span>
          </h2>
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

      {/* 5. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-16">
            How It <span className="gradient-text">Works</span>
          </h2>

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

      {/* 6. GET STARTED AT THE FOODPRINT */}
      <section id="get-started" className="bg-primary py-24 px-6 text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 opacity-10 pointer-events-none">
          <Footprints size={320} />
        </div>
        <div className="absolute -bottom-16 -left-10 opacity-10 pointer-events-none rotate-12">
          <Footprints size={220} />
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/15 px-3 py-1.5 rounded-full mb-5">
              <Footprints size={14} /> Your Foodprint
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get started at the foodprint</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
              Take the first step toward a smaller, smarter foodprint. Set your goal, scan your first meal, and let
              GoodhealthMate map the path one day at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { step: '01', title: 'Set your goal', body: 'Tell us your target — weight, energy, or balance.' },
              { step: '02', title: 'Log your first meal', body: 'Scan a barcode or pick from the Aussie database.' },
              { step: '03', title: 'Walk your foodprint', body: 'Watch trends shape up across the week.' },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-blue-100">{item.step}</span>
                  <Footprints size={18} className="text-blue-100" />
                </div>
                <h3 className="font-bold text-white text-lg">{item.title}</h3>
                <p className="text-blue-100 text-sm mt-1">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://apps.apple.com/app/id6766896814"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
            >
              Download the App Now
            </a>
            <a
              href="#features"
              className="text-white font-semibold underline-offset-4 hover:underline"
            >
              Explore features first
            </a>
          </div>
        </div>
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
                <a
                  href={CONTACT_PATH}
                  onClick={handleContactLinkClick}
                  aria-expanded={activeSection === 'contact'}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </a>
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
            className="w-full max-w-6xl max-h-[92vh] bg-white border border-gray-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
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
