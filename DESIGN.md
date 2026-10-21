# Design system

How to use the design tokens defined in `src/constants/theme.ts`.

The main idea: **choose by role, not by appearance.** Ask "what _is_ this text / surface?", not "how big / which green do I want?".

## Typography

Use with `<ThemedText type="...">`.

| Style       | Size / weight            | Role                                                          | Examples from the design                                                                                |
| ----------- | ------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `display`   | 28, Regular              | **the screen's main title**, once per screen                  | "Profile", "Orders", "Café Aalto", "What can we bring you?"                                             |
| `title`     | 20, Regular              | **a heading inside the content** that introduces a major part | "Popular right now"                                                                                     |
| `section`   | 16, Regular              | **group header above a list or card**                         | "Preferences", "More", "Nearby", "Earlier", "Payment method"                                            |
| `button`    | 16, Bold                 | **text on main buttons**                                      | "View cart", "Continue", "Pay €8.40 with Apple Pay"                                                     |
| `itemTitle` | 14, Bold                 | **the name of a thing in a list**                             | "Oat latte", "Butter croissant", venue names in the Nearby list                                         |
| `body`      | 13, Regular              | **normal sentences and paragraphs**                           | venue description, onboarding explanations                                                              |
| `label`     | 12, Bold                 | **short emphasized words**, often clickable                   | category tabs (Popular / Coffee), "Open", "Nearby" chip, settings row titles, small buttons ("Sign in") |
| `caption`   | 12, Regular              | **a supporting line under or next to something**              | "Our most-loved picks", "· 10–15 min", "Places delivering to your spot"                                 |
| `small`     | 11, Regular              | **least important details**                                   | product descriptions, row values ("Order updates", "English"), "Version 1.0"                            |
| `overline`  | 10, ExtraBold, uppercase | **a small kicker label above a title**                        | "YOUR ACCOUNT", "GOOD MORNING", "DELIVERING TO", "REQUIRED"                                             |

### Exceptions with `weight`

When the role fits but the text needs emphasis, keep the style and override the weight:

```tsx
<ThemedText type="body" weight="bold">
  €4.80
</ThemedText> // price
```

### Quick decision guide

- Is it the screen's title? → `display`
- Does it head a group or list? → `section` (or `title` for a bigger content heading)
- Is it the name of a list item? → `itemTitle`
- Is it a full sentence? → `body`
- Is it a short tag, tab, or row title? → `label`
- Is it extra info under something? → `caption`, or `small` if it's even less important
- Is it a tiny uppercase line above a title? → `overline`

## Colors

Use with `useTheme()` (e.g. `theme.surface`), `<ThemedText themeColor="...">` and `<ThemedView type="...">`. Every color has a light and a dark value.

Colors come in **pairs**: a **background** and the text color meant to go **on** it. The `on…` names say exactly that.

### Backgrounds

| Color            | Role                                                       | Examples                                                    |
| ---------------- | ---------------------------------------------------------- | ----------------------------------------------------------- |
| `background`     | **screen background** (off-white / near-black)             | behind everything on Profile and Orders                     |
| `surface`        | **things that sit on the background**: cards, rows, sheets | settings rows, the sheet over the venue photo, the tab bar  |
| `surfaceMuted`   | **quiet, filled areas** that shouldn't stand out           | price summary, List/Map switch track, "Delivered" chip      |
| `primary`        | **main actions and the brand accent**                      | "View cart" / "Continue" buttons, active tab, tab underline |
| `primarySoft`    | **light green tint** for small highlighted elements        | icon tiles in rows, "Nearby" chip, +/− buttons              |
| `surfaceInverse` | **dark, emphasized cards**                                 | "Welcome / Sign in" card, the order-in-progress card        |
| `accentCream`    | **warm accent**                                            | the avatar circle                                           |
| `onPrimaryTint`  | **a faint tile on top of `primary`**                       | the icon tile in the "Scan QR code" card                    |

### Text and icons

| Color                | Use it on                              | Role                                                                                   |
| -------------------- | -------------------------------------- | -------------------------------------------------------------------------------------- |
| `text`               | `background`, `surface`                | **default** for all main text and icons                                                |
| `textSecondary`      | `background`, `surface`                | **supporting text**: descriptions, captions, inactive tabs                             |
| `textTertiary`       | `background`, `surface`                | **least important**: version text, input placeholders, disabled items                  |
| `onPrimary`          | `primary`                              | text/icons **on** green buttons ("View cart")                                          |
| `onPrimarySecondary` | `primary`                              | secondary text on green cards ("Order straight to your table or seat")                 |
| `primary`            | `background`, `surface`, `primarySoft` | **green text or icons**: overlines, links, the "Nearby" chip text, icons in icon tiles |
| `onInverse`          | `surfaceInverse`                       | main text on dark cards ("Welcome")                                                    |
| `onInverseSecondary` | `surfaceInverse`                       | secondary text on dark cards ("Sign in to save…")                                      |
| `onAccent`           | `accentCream`                          | the avatar letter "A"                                                                  |

### Other

| Color     | Role                      | Examples                                                                  |
| --------- | ------------------------- | ------------------------------------------------------------------------- |
| `success` | **positive status**       | the green dot before "Open", later "Delivered"                            |
| `border`  | **dividers and outlines** | hairlines between rows, the outline around the +/− stepper, input borders |

### The pairing rule

The pairs protect contrast, especially in dark mode. Putting `text` on `primary` works in light mode, but in dark mode light text lands on bright green and becomes hard to read. `onPrimary` is defined to work in both modes. So when you pick a background, take the text color from its pair.

### Not in the theme yet

A red **`danger` / `error`** color for validation errors ("Please enter an email") and destructive actions. The current designs don't show one, so add it when the first screen needs it, both in `light` and `dark`.

## Shadows

Use with the `boxShadow` style, e.g. `boxShadow: Shadow.md`.

| Shadow | Role                                     | Examples                                             |
| ------ | ---------------------------------------- | ---------------------------------------------------- |
| `sm`   | **small raised elements**                | the selected List/Map segment, map pins and labels   |
| `md`   | **cards that float above other content** | the "Scan QR code" card, the venue card over the map |
