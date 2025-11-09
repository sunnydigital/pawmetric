# PetScope Design System
## Emotional Minimalism & Engineered Precision

*A digital object that feels inevitable, alive, and calm.*

---

## Philosophy

PetScope embodies a hybrid between Apple Health and a high-end wellness instrument. The interface is built on principles of:

- **Emotional Minimalism**: Every element serves a purpose; nothing is decorative
- **Kinetic Light**: Light is a living element that breathes and pulses with meaning
- **Engineered Precision**: Built on a 4pt grid system with mathematical harmony
- **Calm Intelligence**: Motion implies life, not busyness

---

## Color System

### Tri-Tone Gradient Background
```css
background: linear-gradient(135deg, #316DDC 0%, #4EB8CF 50%, #89E0C0 100%);
```
- Movement: 240s animation for imperceptible depth
- Creates a living, breathing environment

### Primary Gradients
- **Button Gradient**: `#3A83F1 → #63C4B5`
- **Health Score Gradient**: `#3A83F1 → #63C4B5`
- **Result Gradient**: `#FFFFFF → #63C4B5`

### Glass Surfaces
```css
background: rgba(255, 255, 255, 0.1);
border: rgba(255, 255, 255, 0.25);
backdrop-filter: blur(12px);
box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
```

---

## Typography

### Font Family
- **Primary**: Inter (Google Fonts)
- **Alternative**: SF Pro Rounded for iOS-like feel

### Type Scale (with 8px vertical rhythm)
- **Headers (h1-h4)**: Font Weight 700 (Bold), tracking -0.02em to -0.01em
- **Body Text**: Font Weight 500 (Medium), line-height 1.6
- **Sizes**:
  - h1: 28px / 36px line-height
  - h2: 24px / 32px line-height
  - h3: 20px / 28px line-height
  - Body: 16px / 24px line-height
  - Small: 14px / 20px line-height
  - Tiny: 11px / 16px line-height

---

## Spacing System (4pt Grid)

All spacing follows multiples of 4px:
- **4px** (1 unit): Tight spacing
- **8px** (2 units): Component spacing
- **12px** (3 units): Element gaps
- **16px** (4 units): Card padding (small)
- **20px** (5 units): Card padding (medium)
- **24px** (6 units): Card padding (large)
- **32px** (8 units): Section spacing (standard)
- **64px** (16 units): Major section spacing
- **72px** (18 units): Top margin for hero elements

---

## Border Radii

Consistent rounded corners create cohesion:
- **Cards**: 24px (1.5rem)
- **Buttons**: 100px (pill shape)
- **Icons/Small Elements**: 12px (0.75rem)
- **Modal Overlays**: 24px

---

## Component Library

### Buttons

#### Primary Button (56px height)
```tsx
className="h-14 button-gradient text-white rounded-[100px] font-medium"
```
- Gradient: `#3A83F1 → #63C4B5`
- Shadow: `0 12px 24px rgba(58, 131, 241, 0.3)`
- Inner light pulse: every 5 seconds
- Hover: Lifts 2px, shadow expands

#### Secondary Button
```tsx
className="h-12 bg-white/08 border border-white/20 text-white rounded-[100px]"
```
- Glass effect with 10px blur
- 80% opacity

### Cards

#### Living Glass Card
```css
background: rgba(255, 255, 255, 0.1);
border: rgba(255, 255, 255, 0.25);
backdrop-filter: blur(12px);
box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
border-radius: 24px;
```

- Lifts on scroll/focus: shadow expands from 6px → 8px
- Border increases opacity on hover

### Health Score Ring

#### Specifications
- **Radius**: 70px
- **Stroke Width**: 8px
- **Animation**: 0 → value over 1s (ease-out)
- **Ambient Halo**: 48px blur, 15% opacity (#63C4B5)
- **Gradient**: Linear from #3A83F1 to #63C4B5

#### Animation Timing
```tsx
initial={{ strokeDashoffset: circumference }}
animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
```

---

## Animation Principles

### Timing
- **Fast**: 0.3s (micro-interactions)
- **Standard**: 0.6s (component entry)
- **Slow**: 1.0s (health score fill)
- **Ambient**: 3-5s (breathing effects)

### Easing
- **Default**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Ease-out**: Component entry
- **Ease-in-out**: Loops and ambient effects

### Motion Guidelines
1. **Functional Motion**: Every animation has meaning
   - Pulse = Active/Alive
   - Slide = Navigation
   - Scale = Selection/Focus
   - Fill = Progress/Achievement

2. **Layered Motion**: Create depth through staggered timing
   ```tsx
   delay: 0.3 + index * 0.1
   ```

3. **Breathing Effects**: Subtle infinite loops
   ```tsx
   animate={{ opacity: [0.8, 1, 0.8] }}
   transition={{ duration: 4, repeat: Infinity }}
   ```

---

## Navigation

### Bottom Navigation
- **Glass Tiles**: blur 10px, 80% opacity
- **Active State**: Layout transition with spring physics
- **Icon Fill Animation**: Outline → Filled (0.3s)
- **Notification Pulse**: 2s loop on "Scans" tab

```tsx
<motion.div layoutId="activeTab" />
```

### Header Bar (Dashboard)
- **Blur**: 20px
- **Opacity**: 85%
- **Logo**: Horizontal variant, 8px (h-8)
- **Background**: `rgba(255, 255, 255, 0.1)`

---

## Onboarding Screen

### Layout
- **Logo Position**: Top 40% of screen (72px from top)
- **Logo Variant**: Vertical
- **Shimmer Effect**: 2s sweep every 4s total (6% - 8% opacity)

### Tagline
```
"See your dog's wellbeing — at a glance."
"AI insights that understand every heartbeat, every wag."
```

### Spacing
- Top margin: 72px
- Between elements: 32px
- Bottom padding: 64px

### Scan Button
- Height: 56px (h-14)
- Border radius: 100px
- Gradient: #3A83F1 → #63C4B5
- Inner pulse: 5s cycle (0 → 15% → 0 opacity)

---

## Dashboard Screen

### Header
- Translucent bar with 20px blur, 85% opacity
- Fixed positioning with z-index 30
- Logo: Horizontal, left-aligned

### Health Score Card
- **Living Glass Surface**
- **Health Ring**: Animates from 0 → 87 over 1s
- **Ambient Halo**: 48px blur, 15% opacity, gentle pulse
- **Contextual Insight**: "Cocoa's energy is trending higher this week 🐕✨"
- **Breathing Text**: Opacity pulses 0.8 → 1 → 0.8 (4s)

### Quick Actions
- 2-column grid
- Height: 32px (h-32)
- Icon containers: 14px × 14px, 12px radius
- Glass tiles with hover lift

### Daily Goals
- Progress bars with gradient fill
- Animate width from 0 → target (0.8s, staggered)
- Completed state: Checkmark icon with 30% white background

---

## Health Check Screen

### Header Icon
- Size: 20px × 20px (w-20 h-20)
- Border radius: 12px
- Glass card with inner light pulse (3s cycle)

### Scan Cards
- Individual cards with emoji icons (16px × 16px)
- Icon containers: 12px radius
- Hover: Scale 1.02, lift 2px
- Tap: Scale 0.98

### Primary CTA
- "Start All Scans"
- Full width, 56px height
- Button gradient with 5s inner pulse

---

## Scan Results Screen

### Health Score Display
- Same ring animation as dashboard
- Gradient: White → #63C4B5
- Ambient halo with 4s breathing cycle

### Insights Cards
- Glass surface with 12px blur
- Icon containers: 12px × 12px, 12px radius
- Recommendation pills with 100px radius
- Staggered entry (0.1s delay per card)

### Action Buttons
- Primary: "Ask a Vet" (button gradient)
- Secondary: Grid layout (Rescan, Export)
- All buttons: 100px radius (pill shape)

---

## Accessibility

### Focus States
- Visible outline: ring color with 50% opacity
- Keyboard navigation supported
- Tap targets: Minimum 44px × 44px

### Motion
- Respects `prefers-reduced-motion`
- Critical animations only when reduced motion enabled

### Contrast
- White text on gradient: WCAG AA compliant
- Glass surfaces maintain readability

---

## Implementation Notes

### CSS Variables
```css
--gradient-start: #316DDC;
--gradient-mid: #4EB8CF;
--gradient-end: #89E0C0;
--button-gradient-start: #3A83F1;
--button-gradient-end: #63C4B5;
--radius-card: 1.5rem; /* 24px */
--radius-button: 6.25rem; /* 100px */
--radius-icon: 0.75rem; /* 12px */
```

### Utility Classes
```css
.gradient-bg         /* Tri-tone animated background */
.glass-card          /* Living glass surface */
.glass-header        /* Header blur effect */
.button-gradient     /* Primary button gradient */
```

### Animation Keyframes
```css
@keyframes gradient-shift    /* 240s background movement */
@keyframes shimmer           /* Telescope lens sweep */
@keyframes pulse-glow        /* Inner light breathing */
```

---

## File Structure

```
/styles/globals.css          # Design tokens & utilities
/components/
  ├── onboarding-carousel.tsx
  ├── home-dashboard-calm.tsx
  ├── health-check-calm.tsx
  ├── scan-results-calm.tsx
  ├── bottom-nav-calm.tsx
  └── petscope-logo.tsx
```

---

## Design Checklist

When creating new components, verify:

- [ ] Spacing follows 4pt grid (multiples of 4px)
- [ ] Typography uses Inter font with correct weights
- [ ] Corner radii: 24px (cards), 100px (buttons), 12px (icons)
- [ ] Buttons are 56px height (h-14) or 48px (h-12)
- [ ] Glass surfaces use consistent blur (12px) and opacity
- [ ] Animations have meaningful purpose (not decorative)
- [ ] Gradients move imperceptibly (240s cycle)
- [ ] Health scores animate from 0 → value
- [ ] Hover states lift elements 2px
- [ ] All motion respects ease curves

---

*Last Updated: December 2024*
*Design Philosophy: Calm Intelligence Meets Digital Precision*
