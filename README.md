# fintechh

Modern personal finance dashboard built with React and Vite.

Track income and expenses, review trends, filter transaction history, and explore spending insights through an interactive UI with chart visualizations, role-aware controls, and persisted local state.

## Features

- Auth-gated app shell with public-only and protected routes.
- Dashboard overview with total balance, income, expenses, savings rate, and recent activity.
- Transaction management with:
	- Create, update, delete (admin role)
	- Search, category/type/date filters
	- Sort by date or amount
	- Pagination
	- CSV export
- Insights page with top categories, monthly comparison, trend cards, and average daily spending.
- Role switcher (`admin` / `viewer`) for UI-level permission behavior.
- Light/dark theme switching with persisted preference.
- Responsive layout (sidebar + mobile overlay patterns).
- Toast notifications and loading/skeleton states.
- Lazy-loaded route pages and chart components.

## Tech Stack

- React 19
- Vite 8
- React Router 7
- Zustand 5 (`persist` middleware)
- Tailwind CSS 4 (`@tailwindcss/vite`) + custom CSS design tokens
- Recharts 3
- Lucide React icons
- react-hot-toast
- ESLint 9 (flat config)

## Getting Started

### Prerequisites

- Node.js 20.19+ (or 22.12+)
- npm 10+

### Install and Run

```bash
npm install
npm run dev
```

App runs at the local Vite URL (typically `http://localhost:5173`).

## Available Commands

```bash
npm run dev      # start development server
npm run build    # production build (also emits dist/stats.html via visualizer)
npm run preview  # preview production build locally
npm run lint     # run eslint
```

### Bundle Analysis Helpers

After `npm run build`, you can parse the visualizer output:

```bash
node scripts/parse-sizes.cjs
node scripts/parse-stats.cjs
```

These scripts read `dist/stats.html` and summarize third-party package usage/size signals.

## Demo Auth Notes

Authentication is mocked on the client:

- Login/signup simulate API latency and store a token in localStorage.
- Protected routes rely on token presence.

Demo values shown in UI:

- Email: `demo@example.com`
- Password: `password123`

## Routing

| Path | Access | Notes |
| --- | --- | --- |
| `/login` | Public-only | Redirects to dashboard if already authenticated |
| `/signup` | Public-only | Redirects to dashboard if already authenticated |
| `/dashboard` | Protected | Main analytics overview |
| `/transactions` | Protected | Full transaction table + CRUD + filters |
| `/insights` | Protected | Trend and category analytics |
| `/` | Redirect | Redirects to `/dashboard` |
| `*` | Fallback | Redirects to `/dashboard` |

## State Management

Two persisted Zustand stores are used:

1. `useTransactionStore` (`fintechh-transactions`)
	 - `transactions`
	 - `addTransaction`, `updateTransaction`, `deleteTransaction`, `getTransaction`
2. `useAppStore` (`fintechh-settings`)
	 - `role`, `theme`, `sidebarOpen`
	 - `setRole`, `setTheme`, `toggleSidebar`, `closeSidebar`

Theme application is handled by `applyTheme(theme)`, which toggles the `dark` class on `document.documentElement`.

## Data Model

Transaction shape:

```js
{
	id: string,
	date: 'YYYY-MM-DD',
	description: string,
	category: 'Food' | 'Transport' | 'Shopping' | 'Bills' | 'Entertainment' | 'Salary' | 'Freelance' | 'Other',
	amount: number,
	type: 'income' | 'expense'
}
```

Initial demo data is generated in `src/data/mockData.js` with a mix of salary/freelance income and randomized expenses across the last ~6 months.

## UI and Theming

- Global styles and tokens are defined in `src/index.css`.
- Includes custom gradients, skeuomorphic effects, animations, card/button/input systems, and dark-mode overrides.
- Tailwind is enabled through `@import "tailwindcss"` and Vite plugin integration.

## Build and Performance Notes

`vite.config.js` includes manual chunk splitting for better caching:

- `react-vendor`
- `chart-vendor`
- `state-vendor`
- fallback `vendor`

Build also includes `rollup-plugin-visualizer` output at `dist/stats.html`.

## Deployment

`vercel.json` is configured for static Vite deployment:

- Build output: `dist`
- SPA rewrite: all routes -> `index.html`

This supports direct navigation to nested client routes such as `/transactions` and `/insights`.

## Project Structure

```text
src/
	components/
		auth/
		dashboard/
		layout/
		ui/
	constants/
	data/
	hooks/
	pages/
		Dashboard/
		Insights/
		Login/
		Signup/
		Transactions/
	store/
	utils/
	App.jsx
	main.jsx
	index.css
scripts/
	parse-sizes.cjs
	parse-stats.cjs
	parse-stats.js
```

## Limitations

- No backend/API persistence (client-local data only).
- Auth and role checks are UI/localStorage based (not security hardened).
- No automated test suite yet.

## License

No license file is currently present in the repository.
