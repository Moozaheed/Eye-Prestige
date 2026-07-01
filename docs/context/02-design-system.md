# EYE PRESTIGE -- Design System

Extracted from the HTML mockups and brand assets.

## Color Palette

### Core Colors (CSS Custom Properties)
```
--ink:          #111110    /* Primary text, buttons, dark surfaces */
--paper:        #FFFFFF    /* White backgrounds, cards */
--bone:         #F5F3EF    /* Light cream, product image backgrounds */
--hairline:     #E5E2DC    /* Borders, dividers, subtle separators */
--mute:         #8C887F    /* Secondary text, labels, placeholders */
```

### Footer / Dark Surface
```
--footer-bg:    #111110    /* Dark background */
--footer-text:  #F2F0EB    /* Light text on dark */
--footer-mute:  #8C8880    /* Muted text on dark */
```

### Page Background
```
background:     #E7E4DD    /* Warm gray, visible around card edges on mobile */
```

### Tailwind Config Mapping
```js
colors: {
  ink:      '#111110',
  paper:    '#FFFFFF',
  bone:     '#F5F3EF',
  hairline: '#E5E2DC',
  mute:     '#8C887F',
  page:     '#E7E4DD',
  footer: {
    bg:   '#111110',
    text: '#F2F0EB',
    mute: '#8C8880',
  }
}
```

## Typography

### Font Families
1. **Fraunces** (Variable serif) -- Display headings, section titles, brand text
   - Weights: 300, 340, 440, 480, 560, 620
   - Style: uppercase, tight letter-spacing (-0.01em)
   - Optical sizing enabled

2. **Inter** (Sans-serif) -- Body text, labels, buttons, UI elements
   - Weights: 400, 500, 600, 700
   - Clean, readable at small sizes

3. **Bebas Neue** (Available in brand assets) -- Can be used for special brand moments

### Type Scale
| Role           | Font      | Size    | Weight | Letter-spacing | Transform   |
|----------------|-----------|---------|--------|----------------|-------------|
| Hero H1        | Fraunces  | 35px    | 480    | -0.01em        | uppercase   |
| Section Title  | Fraunces  | 22px    | 440    | -0.01em        | uppercase   |
| Display Large  | Fraunces  | 30px    | 440    | -0.01em        | uppercase   |
| Eyebrow        | Inter     | 10.5px  | 600    | 0.22em         | uppercase   |
| Body           | Inter     | 13.5px  | 400    | 0.01em         | none        |
| Button/CTA     | Inter     | 11.5px  | 700    | 0.16em         | uppercase   |
| Product Name   | Inter     | 12.5px  | 600    | --             | none        |
| Product Price  | Inter     | 12.5px  | 500    | --             | none        |
| Menu Label     | Inter     | 10px    | 600    | 0.14em         | uppercase   |
| View All Link  | Inter     | 11px    | 600    | 0.1em          | uppercase   |
| Footer Link    | Inter     | 13.5px  | 400    | --             | none        |
| Footer Heading | Inter     | 10.5px  | 600    | 0.18em         | uppercase   |

## Spacing & Radius

### Border Radius
```
--r-card:  16px     /* Product cards, main cards */
--r-pill:  999px    /* Buttons, chips, pills */
Hero card: 22px     /* Large hero image cards */
Tiles:     13px     /* Category explore tiles */
```

### Content Padding
```
--pad:     18px     /* Horizontal page padding */
Header:    64px     /* Height */
```

## Components

### Buttons
1. **Pill Button (Primary)** -- white bg, dark text, pill shape, uppercase
   ```
   bg: #fff | color: --ink | radius: 999px | padding: 14px 24px
   font: 11.5px Inter 700 | letter-spacing: 0.16em | uppercase
   ```

2. **Solid Button** -- dark bg, white text (used in filter sheets, CTAs)
   ```
   bg: --ink | color: #fff | radius: 999px | padding: 14px
   font: 12px 700 | letter-spacing: 0.06em | uppercase
   ```

3. **Outline Button** -- transparent bg, dark border
   ```
   bg: none | border: 1px solid --ink | radius: 999px | padding: 14px 26px
   font: 11.5px 700 | letter-spacing: 0.1em | uppercase
   ```

### Cards
- **Product Card (Carousel):** 43% width, scroll-snap, 1px hairline border, 16px radius
- **Product Card (Grid):** 2-column grid, 12px gap, 1px hairline border
- **Category Tile:** 3-column grid, 8px gap, 13px radius, 3:4 aspect ratio
- **Hero Card:** Full-width, 22px radius, 3:4 aspect ratio, gradient scrim overlay

### Product Images
- Grayscale filter with slight contrast boost: `filter: grayscale(1) contrast(1.08) brightness(0.97)`
- Bone (#F5F3EF) background behind product images
- Aspect ratio 1:1.15 for grid cards

### Header
- Sticky, 64px height
- Frosted glass effect: `background: rgba(255,255,255,0.92); backdrop-filter: saturate(180%) blur(14px)`
- Three-column layout: [Menu + Label] [Logo] [Search + Bag]

### Navigation Drawer
- Full-screen overlay from left
- Links in Fraunces serif, 26px, uppercase
- Smooth cubic-bezier transition

### Bottom Sheets (Filter/Sort)
- Slide up from bottom, max 84vh
- Handle bar at top (36px wide, 4px tall, hairline color)
- Rounded top corners (20px)
- Backdrop overlay: rgba(17,17,16,0.42)

### Chips/Pills
- Category pills: 11.5px, 600 weight, 1px hairline border, pill shape
- Active state: dark bg (#111110), white text
- Filter chips: similar, toggleable

### Icons
- All SVG, inline, stroke-based
- Stroke width: 1.6 for header icons, 2 for buttons
- Size: 20px header, 14px in buttons, 13px in product cards
- Icon set style matches Lucide icons

## Image Treatment
- Hero images: grayscale with dark gradient scrim from bottom
- Category tiles: grayscale with dark gradient scrim from bottom
- Product images: on bone/cream background, clean cutout style (see mockup images)

## Responsive Notes
- Mockup is mobile-first at 430px max-width
- Desktop should expand to full-width with max-content constraints
- Product grid: 2 columns on mobile, 3-4 on tablet, 4-5 on desktop
- Category grid: 3 columns on mobile, 6 on desktop (single row)
- Carousels become grids on wider screens
