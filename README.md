# 🥗 GoodHealthMate
**A personalized meal planning and calorie tracking application for the Australian market.**

GoodHealthMate helps users manage their nutrition goals by providing intelligent meal suggestions and accurate calorie tracking, specifically localized for Australian food products and dietary standards.

---

## 🚀 Key Features
* **AI-Powered Meal Planning:** Personalized suggestions based on health goals.
* **Calorie Tracking:** Easy-to-use interface for logging daily intake.
* **Localised Data:** Focused on the Australian grocery market.
* **Smart Insights:** Visualizes progress and nutritional trends.

## 🛠️ Tech Stack
* **Frontend:** React Native (Cross-platform Mobile App)
* **Backend:** Node.js & Express
* **Machine Learning:** Python (used for [mention specific ML task, e.g., personalized recommendations])
* **Database:** [e.g., MongoDB / PostgreSQL]

## 📦 Installation & Setup
1. **Clone the repo:**
   `git clone https://github.com/rinty6/meal_app_website.git`
2. **Install Frontend dependencies:**
   `cd frontend && npm install`
3. **Install Backend dependencies:**
   `cd backend && npm install`
4. **Run the app:**
   `npm start`

---
*Developed by Leo*

## Secure contact form deployment

The contact form uses a Vercel Function at `/api/contact`. Add these **Production** environment variables in Vercel before deploying it:

```text
TURNSTILE_SECRET_KEY=<secret from the Cloudflare Turnstile widget>
RESEND_API_KEY=<Resend API key>
CONTACT_FROM_EMAIL=GoodHealthMate <contact@goodhealthmate.com>
CONTACT_TO_EMAIL=support@dreamingstudio.net
```

`CONTACT_TO_EMAIL` is the inbox that receives website feedback. Keep it as `support@dreamingstudio.net` unless you have configured a working inbox for `contact@goodhealthmate.com`. The Turnstile site key is public and is already embedded in the forms; do not add the Turnstile secret or the Resend API key to source code.
