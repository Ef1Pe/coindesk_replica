# CoinDesk Replica

Pixel-perfect, API-ready recreation of the CoinDesk homepage and core sections built with static HTML, Tailwind utilities, and a lightweight Flask server that supports dynamic content injection.

## Tech Stack
- **HTML5** + Tailwind CDN classes for rapid layouting
- **Custom CSS** (`css/styles.css`) for CoinDesk-specific visuals
- **Vanilla JS** (`js/main.js`) for tabs, news feed rendering, and ticker duplication
- **Flask** backend (`server.py`) with Agenticverse-compatible injection hooks

## Project Structure
```
/
├── index.html                # Homepage replica
├── markets.html              # Markets vertical
├── policy.html               # Policy & regulation vertical
├── tech.html                 # Developer coverage
├── business.html             # Corporate/treasury page
├── learn.html                # Education hub
├── css/
│   └── styles.css            # Custom design tokens & components
├── js/
│   └── main.js               # Interactive behaviors & mock data
├── images/                   # Asset buckets (hero/, cards/, icons/)
├── docs/
│   └── site-analysis.md      # Color palette, layout, page map
├── server.py                 # Flask app with injection utilities
├── metadata.py               # Metadata contract for Agenticverse
├── entity.py                 # Agent wrapper exposing start + metadata
├── requirements.txt          # Python dependencies (Flask)
└── README.md
```

## Getting Started
1. **Install dependencies**
   ```bash
   python3 -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   ```
2. **Run the replica**
   ```bash
   python server.py
   # App listens on http://localhost:5000
   ```
3. **Browse the static build** by opening `index.html` (or any section page) directly in a browser if you do not need backend injection.

## Dynamic Content Injection
- Payload schema documented in `metadata.py`. Key fields: `section`, `target`, `title`, `description`, `image_url`, `author`, `date`, `badge_text`.
- Targets map to `data-injection` markers embedded across pages:
  - `main_featured` → hero grids (`.featured-grid`, section cards)
  - `news_stream` → primary article feeds (e.g., `#newsStream`)
  - `sidebar_highlight` → right-rail promo slots
- Use `start_server(port=5000, content_data={...})` to inject a single item at boot, or hit `/api/content` to inspect what’s currently loaded.

### Example Payload
```json
{
  "section": "index",
  "target": "news_stream",
  "title": "Institutional Bitcoin Desk Hires Former Fed Regulator",
  "description": "New chief compliance officer to oversee ETF surveillance shares.",
  "category": "Business",
  "author": "CoinDesk Research",
  "date": "Just now",
  "image_url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
  "badge_text": "Exclusive"
}
```

## Frontend Highlights
- Fully responsive layout capped at 1280px grid with adaptive columns down to mobile.
- Live-style ticker duplicated with JS for continuous scroll illusion.
- Featured tabs drive hero card swaps without page reloads.
- Modular sections mirror CoinDesk’s tone: hero grid, opinion cards, promo banners, newsletter callouts, and dense footer nav.

## API Endpoints
- `GET /` and `/<section>.html` serve static pages with runtime injection.
- `GET /css/*`, `/js/*`, `/images/*` expose static assets.
- `GET /api/content` returns the current in-memory injection payload list.

## Notes & Limitations
- Imagery uses Unsplash placeholders styled to match the geometric CoinDesk feel.
- Tailwind is pulled via CDN for simplicity; no build step required.
- Server stores injected content in memory only; restart clears entries.
- Agenticverse utilities (`agenticverse_entities.*`) must be available for the entity wrapper’s `start_server` helper.
