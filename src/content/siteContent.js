export const APP_STORE_URL = 'https://apps.apple.com/app/id6766896814'
export const CONTACT_EMAIL = 'support@goodhealthmate.com'
export const ABN = '29 677 871 686'

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/goodhealthmate',
  tiktok: 'https://www.tiktok.com/@goodhealthmate',
}

const ASSET_ROOT = '/assets/redesign'

export const SCREENS = {
  home: `${ASSET_ROOT}/scr-home.jpg`,
  calorie: `${ASSET_ROOT}/scr-calorie.jpg`,
  mealPlan: `${ASSET_ROOT}/scr-mealplan.jpg`,
  goal: `${ASSET_ROOT}/scr-goal.jpg`,
  shopping: `${ASSET_ROOT}/scr-shopping.jpg`,
  addFood: `${ASSET_ROOT}/scr-addfood.jpg`,
  favorites: `${ASSET_ROOT}/scr-favorites.jpg`,
  voice: `${ASSET_ROOT}/scr-voice.jpg`,
  barcode: `${ASSET_ROOT}/scr-barcode.jpg`,
}

export const FEATURES = [
  {
    id: 'food-tracking', icon: 'utensils', title: 'Food tracking that takes seconds',
    description: "Search it, scan it or say it. Your calories, carbs, fat and protein update the moment the meal lands, with the day's remaining budget always in view.",
    bullets: ['Custom serves and portion sizes', 'Re-log a favourite in one tap', 'Breakfast, lunch and dinner kept separate'],
    image: SCREENS.addFood, alt: 'GoodHealthMate add food search screen', tone: 'sky',
  },
  {
    id: 'progress', icon: 'chart', title: 'Progress you can actually read',
    description: "A clear split of what you've eaten, what's left and how the week is tracking. Macro rings and daily targets, without a spreadsheet in sight.",
    bullets: ['Day, week and month views', 'A 10% tolerance band, so close counts', 'A nightly wrap-up of how the day went'],
    image: SCREENS.calorie, alt: 'GoodHealthMate calorie progress summary screen', tone: 'mint',
  },
  {
    id: 'meal-planning', icon: 'calendar', title: 'A week of meals, planned for you',
    description: "Recommendations built from your calorie target, your dietary needs and the foods you already eat most. Don't fancy it? Shuffle for another.",
    bullets: ['Filters for nuts, dairy and other allergies', 'Learns from your most-eaten foods', 'Seven days ahead, breakfast to dinner'],
    image: SCREENS.mealPlan, alt: 'GoodHealthMate weekly meal plan screen', tone: 'cream',
  },
  {
    id: 'goals', icon: 'target', title: "Set a goal you'll actually finish",
    description: 'Give it a name, a daily calorie target and a date range. From there the app watches the numbers, and reminders arrive at times that suit your day.',
    bullets: ['Start and end dates you choose', 'Reminders you can switch off entirely', 'Progress carried across the whole goal'],
    image: SCREENS.goal, alt: 'GoodHealthMate goal setting screen', tone: 'peach',
  },
  {
    id: 'shopping', icon: 'bag', title: 'Your plan, turned into a shop',
    description: "Everything the week's meals need, gathered into a tidy list you can tick off in the aisle. No more standing in the fruit and veg trying to remember what you planned.",
    bullets: ['Grouped so you shop aisle by aisle', 'Quantities worked out from your serves', 'Add your own items any time'],
    image: SCREENS.shopping, alt: 'GoodHealthMate shopping list screen', tone: 'mint',
  },
  {
    id: 'pip', icon: 'heart', title: 'Pip, your personal mate',
    description: 'Pip notices when a meal goes unlogged, works out what would put the day back on track, and celebrates when you get there. Miss a target and you\'ll get “no dramas, mate” — never a telling-off.',
    bullets: ['Check-ins timed to your meals, in your timezone', 'Capped at two nudges a day. No nagging', 'A nightly summary that reads like a mate, not a report'],
    pip: true, tone: 'sky',
  },
]

export const LOGGING_METHODS = [
  { title: 'Barcode scan', description: 'Point at the packet. Nutrition comes straight off the label, matched against Australian products.', image: SCREENS.barcode, alt: 'GoodHealthMate barcode scan screen' },
  { title: 'Say it out loud', description: 'Hands full? Tap the mic and say the food. The app finds it and logs it while you keep cooking.', image: SCREENS.voice, alt: 'GoodHealthMate voice food search screen' },
  { title: 'Recipes & favourites', description: 'Browse healthy recipes with full nutrition, and keep the meals you repeat one tap away.', image: SCREENS.favorites, alt: 'GoodHealthMate favourites screen' },
]

export const HOW_STEPS = [
  { title: 'Set your goal', description: "Tell the app what you're aiming for. It works out a daily calorie target you can live with.", pip: `${ASSET_ROOT}/pip-confident.svg` },
  { title: 'Track your day', description: 'Log meals by search, scan or voice. Pip checks in if breakfast, lunch or dinner goes missing.', pip: `${ASSET_ROOT}/pip-care.svg` },
  { title: 'See it add up', description: 'Watch the week take shape, and get a nightly wrap-up of how the day landed against your target.', pip: `${ASSET_ROOT}/pip-happy.svg` },
]
