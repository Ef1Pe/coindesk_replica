# Site Analysis: CoinDesk Replica

```yaml
site_analysis:
  name: "CoinDesk"
  url: "https://www.coindesk.com"
  type: "news"
  color_palette:
    primary: "#ffb800"
    secondary: "#111111"
    accent: "#f5f5f5"
    text_primary: "#1a1a1a"
    text_secondary: "#555555"
    background: "#ffffff"
  typography:
    heading_font: "'Public Sans', 'Helvetica Neue', Arial, sans-serif"
    heading_sizes:
      h1: "48px"
      h2: "32px"
      h3: "22px"
    body_font: "'Public Sans', 'Helvetica Neue', Arial, sans-serif"
    body_size: "16px"
    ui_font: "'Public Sans', 'Helvetica Neue', Arial, sans-serif"
  layout:
    max_width: "1280px"
    header_height: "84px"
    sidebar_width: "320px"
    grid_columns: 12
    grid_gap: "24px"
  key_components:
    - "Sticky global header with ticker strip"
    - "Hero feature grid with tabs"
    - "Two-column article grid with dense cards"
    - "Right rail featuring latest videos and newsletters"
    - "Modular promo bands and footer navigation"
  injection_targets:
    - name: "main_featured"
      selector: ".featured-grid"
      description: "Primary hero cards on homepage"
    - name: "news_stream"
      selector: ".news-stream"
      description: "Scrolling article feed"
    - name: "sidebar_highlight"
      selector: ".sidebar-widgets"
      description: "Right rail promo slots"
```

## Notes
- Built for desktop-first fidelity with responsive adjustments down to 360px.
- Primary imagery relies on royalty-free stand-ins that match CoinDesk's geometric overlay motif.
- Typography uses Google Fonts `Public Sans` as a close approximation of CoinDesk's UI font.

## Page Map & Assets
- `index.html`: Homepage replica with hero, latest news, various carousels.
- `markets.html`: Focused markets coverage grid mirrored from screenshot's lower rows.
- `policy.html`: Policy and regulation highlights plus sidebar modules.
- `tech.html`: Tech/innovation feed with emphasis on research cards.
- `business.html`: Treasury/finance coverage and newsletters.
- `learn.html`: Educational hub with simplified card list.

Asset buckets sit under `images/` with subfolders for `hero`, `cards`, and `icons`.
