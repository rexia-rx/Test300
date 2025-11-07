## 1. UI.Screens & Components

| UI-ID | Page/Component | UX-ID | Element/Slot | Visual Semantics (Minimalist Style) | Interaction Semantics (State/Feedback) | Accessibility Key Points | Variants/Sizes | Data State |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UI-001 | Input Field | UX-001, UX-002, UX-003, UX-006, UX-007, UX-008, UX-011 | Text Input (Email, Password, Numeric, Time, Distance) | Minimalist, clean sans-serif text. Light grey bottom border `border-default`. Padding `space-3x` vertical, `space-4x` horizontal. | **Default**: `text-primary`. **Hover**: `border-default` slightly darker. **Focus**: `border-color` `color-primary-dark`, `shadow-sm` for subtle lift, outline `color-focus-ring`. **Error**: `border-color` `color-danger-dark`, inline `text-color` `color-danger-dark`. **Disabled**: `background-surface`, `text-secondary`, `border-default`, no interaction. | `aria-label` or `<label>` for input; `aria-invalid="true"` when in error state; Tab key navigable. Keyboard type set for `email`, `password`, `numeric`. | Default, Compact (for tables), Read-only, Error | `empty`, `value`, `error` message |
| UI-002 | Primary Button | UX-001, UX-002, UX-003, UX-004, UX-006, UX-010, UX-011 | CTA Button | Highly visible `color-primary` background, `text-on-primary`, `font-weight-medium`, `radius-md`. Minimal `shadow-sm`. | **Default**: `background-color` `color-primary`. **Hover**: `background-color` `color-primary-light`, subtle `shadow-md`, slight scale (1.02x). **Focus**: Same as hover, with `outline` `color-focus-ring`. **Active**: `background-color` `color-primary-dark`, sinks visually (slight scale 0.98x, `shadow-none`). **Disabled**: `background-color` `color-background-surface`, `text-secondary`, `shadow-none`, no interaction. **Loading**: Spinner icon replaces text, `aria-busy="true"`. | Focusable, accessible name from text content; `aria-disabled="true"` when disabled; `aria-busy="true"` when loading. | Default, Large (for primary CTA), Compact | `idle`, `loading`, `disabled` |
| UI-003 | Secondary Button | UX-003, UX-005, UX-006, UX-007, UX-009, UX-012 | Action Button / Icon Button | `background-color` transparent, `text-color` `color-primary`, subtle `border-default` (optional). `font-weight-regular`. | **Default**: `text-color` `color-primary`. **Hover**: `background-color` `color-background-surface`, `text-color` `color-primary-dark`. **Focus**: Same as hover, with `outline` `color-focus-ring`. **Active**: `background-color` `color-border-default`, `text-color` `color-primary-dark`. **Disabled**: `text-secondary`. | Focusable, `aria-label` for icon-only buttons; `aria-disabled="true"` when disabled. | Default, Compact, Icon-only | `idle`, `disabled` |
| UI-004 | Destructive Button | UX-012 | Delete Button | `background-color` `color-danger`, `text-on-primary`, `radius-md`. Often used with confirmation. | **Default**: `background-color` `color-danger`. **Hover**: `background-color` `color-danger-light`. **Focus**: Same as hover, with `outline` `color-focus-ring`. **Active**: `background-color` `color-danger-dark`. **Disabled**: `background-color` `color-background-surface`, `text-secondary`. | Focusable, clearly indicates destructive action; `aria-disabled="true"` when disabled. | Default, Icon-only | `idle`, `disabled` |
| UI-005 | Link | UX-002, UX-004 | Text Link | `text-color` `color-secondary`, `text-decoration` underline on hover. | **Default**: `text-color` `color-secondary`. **Hover**: `text-decoration` underline. **Focus**: `text-decoration` underline, `outline` `color-focus-ring`. **Active**: `text-color` `color-secondary-dark`. | Focusable via tab key. Clear, descriptive link text. | Default | `href` |
| UI-006 | Inline Error Message | UX-001, UX-002, UX-006, UX-007, UX-008, UX-011 | Form Validation Message | `text-color` `color-danger-dark`, `font-size-sm`, `font-weight-regular`. Displayed below relevant input field. | **Visible**: Message appears when input is invalid or form submission fails validation. | `aria-live="polite"` if dynamically added; visually associated with input using `aria-describedby` and `aria-invalid="true"`. | Default | `message` string |
| UI-007 | Toast Notification | UX-003, UX-010, UX-011, UX-012 | Global Feedback Message | Small, discreet rectangle appearing transiently at top/bottom of screen. `background-color` `color-success` for success, `color-danger` for error. `text-on-primary`, `radius-sm`. | **Visible**: Appears for `motion-duration-slow` and then fades out. Clickable to dismiss. | `aria-live="assertive"` for critical errors, `aria-live="polite"` for success/info messages; provides sufficient contrast for text. | Success, Error, Info | `message` string |
| UI-008 | Modal Overlay | UX-005, UX-006, UX-012 | Dialog Window | Semi-transparent dark overlay (`rgba(0,0,0,0.6)`) covering entire viewport. Centered content card `background-paper`, `radius-md`, `shadow-lg`. | **Open**: Smooth `motion-duration-normal` fade-in for overlay and slide-up/fade-in for content. **Close**: `ESC` key dismisses; clicking outside dismisses (unless critical confirmation). | `role="dialog"` or `role="alertdialog"`; `aria-modal="true"`; traps keyboard focus within the modal; announces content upon opening. | Default (centered) | `isOpen` boolean, `content` |
| UI-009 | Search Bar | UX-005 | Input with Search Icon & Clear Button | Input field (UI-001 visual semantics) with leading search icon and trailing "clear" icon. `border-default` or `background-surface`. | **Typing**: Clear icon appears. **Clear**: Tapping clear icon empties input. | `aria-label` for search purpose; clear button has `aria-label="clear search"`. | Default | `query` string, `isTyping` boolean |
| UI-010 | List Item | UX-005, UX-010 | Generic Item in a List (e.g., exercise, workout summary) | `background-paper`, subtle `border-default` or divider lines. `padding` `space-4x` to `space-6x`. Clearly separated sections for data. | **Hover**: Subtle `background-color` `color-background-surface`. **Active**: `background-color` slightly darker `color-background-surface`. | Focusable if interactive (e.g., selecting an exercise). Clear headings/labels for content within. | Default, Compact, Selectable | `data` object |
| UI-011 | Segmented Control / Radio Group | UX-003 | Unit Preference Selector (kg/lbs) | `background-surface` container, with `background-paper` for selected segment. `radius-md` for container and segments. `text-primary`. | **Selected**: `background-paper`, `font-weight-medium`. **Unselected**: `background-surface`, `font-weight-regular`. **Hover**: Subtle `background-color` change on unselected segments. | `role="radiogroup"`; individual options have `role="radio"`, `aria-checked` status; keyboard navigation with arrow keys. | Default | `selectedValue` |
| UI-012 | Exercise Card | UX-007, UX-008, UX-011 | Container for Exercise Data | `background-paper`, `radius-md`, `shadow-sm`. Clear `padding` `space-4x`. Visually separates exercise details and inputs. | **Default**: Displays current data. **Editable**: Inputs are enabled and highlighted (e.g., focus border). | Clear headings for exercise name and parameter types. `aria-label` for card content (e.g., "Squats exercise details"). | Strength (reps/weight), Cardio (duration/distance), Read-only | `exerciseName`, `setsData`, `type` |
| UI-013 | Rest Timer Component | UX-009 | Countdown Timer | Prominent numeric display of time, e.g., circular progress bar with `color-primary`. Central text `font-size-xl`. | **Running**: Progress indicator updates in real-time. **Completed**: Sound/vibration alert, `background-color` `color-success`. **Paused**: Button to resume. | `aria-live="polite"` for countdown changes; `aria-label` for total duration; audible/vibration alerts are clear. | Full-screen overlay, Inline | `currentTime`, `duration`, `isRunning` |
| UI-014 | Date/Time Picker Modal | UX-004 | Date and Time Selection | Standard modal (UI-008) containing intuitive date and time pickers. Visual calendar grid, selectable time slots. | **Default**: Shows current date/time. **Selection**: Highlights selected date/time. **Confirm**: 'Save' button. **Cancel**: 'Cancel' button. | `role="dialog"`; navigable with arrow keys for calendar; clear labels for date/time fields. | Default | `selectedDate`, `selectedTime` |
| UI-015 | Empty State Message | UX-005 | No Results/Empty Content Placeholder | Centralized `text-secondary`, `font-size-md`, often with a subtle icon or illustration. | **Visible**: Appears when a list or section has no data to display. | Clearly indicates the current state and potential next actions (e.g., "No exercises found. Try searching or create a new one."). | Default | `message` string |
| UI-016 | Registration Page | UX-001 | Screen Composition | `background-surface` with a centered card `background-paper` containing the form. Minimalist header with app logo. | Composes UI-001 (Email, Password, Confirm Password), UI-002 (Register Button), UI-006 (Error Messages). | All form elements meet accessibility standards as per their individual definitions. | Full-width on desktop, centered column on mobile. | `formData`, `validationErrors` |
| UI-017 | Login Page | UX-002 | Screen Composition | Similar layout to Registration Page. | Composes UI-001 (Email, Password), UI-002 (Login Button), UI-005 (Forgot Password Link), UI-006 (Error Message). | As above. | Full-width on desktop, centered column on mobile. | `formData`, `loginError` |
| UI-018 | Profile Page | UX-003 | Screen Composition | `background-surface`, main content area `background-paper`. Clearly separated sections for different profile details. | Composes UI-001 (Display Name, Email - read-only variant), UI-011 (Unit Preference), UI-003 (Edit Button), UI-002 (Save Button), UI-007 (Success Toast). Inputs become editable on "Edit" tap. | Read-only fields are still labelled. Unit preference has clear state. | Full-width on desktop, stacked on mobile. | `profileData`, `isEditing` |
| UI-019 | Dashboard | UX-004 | Screen Composition | `background-surface` with main content areas for CTA, recent activity. `shadow-sm` for cards/sections. | Composes UI-002 (Start New Workout), UI-005 (Log Past Workout), UI-014 (Date/Time Picker Modal). | Primary CTA is visually prominent. | Responsive grid for content, single column on mobile. | `recentWorkouts`, `userStats` |
| UI-020 | Exercise Library Modal | UX-005 | Screen Composition | Modal (UI-008) with Search Bar (UI-009) at the top, scrollable List of Exercises (UI-010) below, and Create New Button (UI-003) at bottom or header. | Composes UI-008 (Modal), UI-009 (Search Bar), UI-010 (List Items for exercises), UI-003 (Create New Button), UI-015 (Empty State). | Search functionality is accessible. List items are keyboard navigable and selectable. | Full-screen on mobile, centered modal on desktop. | `exerciseList`, `searchQuery`, `isLoading` |
| UI-021 | Create Exercise Modal | UX-006 | Screen Composition | Modal (UI-008) with a simple form. | Composes UI-008 (Modal), UI-001 (Exercise Name Input), UI-002 (Save Button), UI-003 (Cancel Button), UI-006 (Error Message). | Form elements are correctly labelled and errors associated. | Full-screen on mobile, centered modal on desktop. | `exerciseName`, `validationError` |
| UI-022 | Active Workout Logging Screen | UX-007, UX-008, UX-009, UX-010 | Screen Composition | `background-surface`, with exercise cards (UI-012) stacked vertically. Sticky header/footer for main actions. | Composes UI-012 (Exercise Cards - Strength/Cardio variants), UI-001 (numeric/time inputs), UI-003 (Add Set, Start Rest buttons), UI-013 (Rest Timer), UI-002 (Finish Workout button), UI-006 (inline errors). | All interactive elements are focusable. Inputs have appropriate `type` attributes. | Full-width, single column layout. | `currentWorkout`, `exerciseList`, `isResting` |
| UI-023 | Workout Summary Screen | UX-010 | Screen Composition | `background-surface`, main content area `background-paper` showing a summary list. Primary button at bottom. | Composes UI-010 (Workout Summary List Items), UI-002 (Save and Exit Button), UI-007 (Success/Error Toast). | Summary clearly presented, actionable button. | Full-width, single column. | `workoutSummary`, `isSaving` |
| UI-024 | Workout Details Screen | UX-011, UX-012 | Screen Composition | `background-surface`, main content `background-paper`. Displays workout details in a read-only format. Edit/Delete buttons in a prominent position (e.g., header). | Composes UI-012 (Read-only Exercise Cards), UI-003 (Edit Button), UI-004 (Delete Button), UI-007 (Success/Error Toast). | All information is clearly visible and logically structured. | Full-width, single column. | `pastWorkoutData` |
| UI-025 | Workout Editor Screen | UX-011 | Screen Composition | Similar to Active Workout Logging Screen (UI-022), but pre-filled with existing data. | Composes UI-022's elements: UI-012 (Exercise Cards), UI-001 (inputs), UI-003 (Add Set). Adds UI-002 (Save Changes Button). | All editing functionalities inherit accessibility from UI-022. | Full-width, single column. | `editableWorkoutData`, `isSaving` |
| UI-026 | Confirmation Modal | UX-012 | Screen Composition | Modal (UI-008) with a clear question and two action buttons. | Composes UI-008 (Modal), UI-004 (Delete Button), UI-003 (Cancel Button). | Clear message, `role="alertdialog"`, focus set to the safer action (Cancel) by default. | Centered modal. | `message` string, `onConfirm`, `onCancel` |

---

## 2. UI.StyleTokens

```json
{
  "color": {
    "primary": "#4CAF50",
    "primary-light": "#66BB6A",
    "primary-dark": "#388E3C",
    "secondary": "#2196F3",
    "secondary-light": "#64B5F6",
    "secondary-dark": "#1976D2",
    "text-primary": "#212121",
    "text-secondary": "#757575",
    "text-on-primary": "#FFFFFF",
    "background-surface": "#F5F5F5",
    "background-paper": "#FFFFFF",
    "border-default": "#E0E0E0",
    "danger": "#F44336",
    "danger-light": "#EF9A9A",
    "danger-dark": "#D32F2F",
    "success": "#4CAF50",
    "success-light": "#81C784",
    "success-dark": "#388E3C",
    "warning": "#FFC107",
    "warning-light": "#FFEB3B",
    "warning-dark": "#FFA000",
    "info": "#2196F3",
    "focus-ring": "rgba(33, 150, 243, 0.5)"
  },
  "font": {
    "family": "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif",
    "size": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "md": "1rem",
      "lg": "1.125rem",
      "xl": "1.5rem",
      "xxl": "2rem"
    },
    "weight": {
      "light": 300,
      "regular": 400,
      "medium": 500,
      "bold": 700
    },
    "lineHeight": {
      "none": 1,
      "tight": 1.25,
      "normal": 1.5,
      "relaxed": 1.75
    }
  },
  "space": {
    "0": "0px",
    "px": "1px",
    "0_5x": "0.125rem",
    "1x": "0.25rem",
    "2x": "0.5rem",
    "3x": "0.75rem",
    "4x": "1rem",
    "5x": "1.25rem",
    "6x": "1.5rem",
    "8x": "2rem",
    "10x": "2.5rem",
    "12x": "3rem",
    "16x": "4rem",
    "20x": "5rem"
  },
  "radius": {
    "none": "0px",
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "full": "9999px"
  },
  "shadow": {
    "none": "none",
    "sm": "0px 1px 3px rgba(0, 0, 0, 0.08)",
    "md": "0px 4px 6px rgba(0, 0, 0, 0.1)",
    "lg": "0px 10px 15px rgba(0, 0, 0, 0.1)",
    "xl": "0px 20px 25px rgba(0, 0, 0, 0.1)"
  },
  "motion": {
    "duration": {
      "fast": "150ms",
      "normal": "250ms",
      "slow": "400ms"
    },
    "easing": {
      "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
      "ease-in": "cubic-bezier(0.4, 0, 1, 1)"
    }
  },
  "breakpoint": {
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px",
    "xxl": "1536px"
  }
}
```

---

## 3. UI.Accessibility

*   **Contrast**:
    *   All primary text (`color-text-primary`) on `color-background-paper` or `color-background-surface` will meet WCAG 2.1 AA contrast ratio of 4.5:1 for normal text and 3:1 for large text.
    *   `color-primary` (green) on `color-text-on-primary` (white) for primary buttons will meet WCAG 2.1 AA.
    *   Error (`color-danger-dark`) and success (`color-success-dark`) text will have sufficient contrast against their respective backgrounds.
    *   Non-text elements (icons, borders indicating state) will meet a contrast ratio of 3:1 against adjacent colors.
*   **Keyboard Accessibility**:
    *   **Tab Order**: All interactive elements (buttons, links, form fields) will be logically tabbable in a sequential order (`tabindex="0"` by default).
    *   **Focus Ring Visibility**: A clear `outline` (`color-focus-ring`) will be visible on all interactive elements when they receive keyboard focus. This will be distinct from hover states.
    *   **Enter/ESC/Space Behavior**:
        *   `Enter` key will activate buttons and submit forms when focused.
        *   `Space` key will activate buttons and toggle checkboxes/radio buttons when focused.
        *   `ESC` key will close modals (UI-008, UI-014, UI-020, UI-021, UI-026) and dismiss transient elements (e.g., date pickers).
    *   Arrow keys will navigate within segmented controls (UI-011) and calendar components (UI-014).
*   **ARIA Attributes**:
    *   **`aria-label` / `aria-labelledby`**: Used for all interactive elements without visible text (e.g., icon-only buttons like "Edit", "Delete", "Clear Search") and to provide accessible names for complex components or regions.
    *   **`aria-live`**:
        *   `aria-live="polite"` will be used for dynamically updated content such as countdown timers (UI-013) and non-critical toast notifications (UI-007 for success/info).
        *   `aria-live="assertive"` will be used for critical error messages (UI-007 for error) to immediately inform users.
    *   **`aria-invalid="true"`**: Applied to form input fields (UI-001) that fail validation, with their associated error message linked via `aria-describedby`.
    *   **`aria-busy="true"`**: Used for buttons (UI-002) or content areas (e.g., lists) while data is being loaded or processed.
    *   **`aria-modal="true"`**: Applied to all modal components (UI-008, UI-014, UI-020, UI-021, UI-026) to inform assistive technologies that content outside the modal is obscured and inaccessible.
    *   **`role` attributes**: Appropriate roles will be used (e.g., `role="dialog"`, `role="alertdialog"`, `role="radiogroup"`, `role="radio"`).
*   **Accessibility Feedback**:
    *   **Toasts (UI-007)**: Success and info toasts will use `aria-live="polite"`. Error toasts will use `aria-live="assertive"`. All toasts will provide sufficient contrast and remain on screen long enough to be read.
    *   **Inline Errors (UI-006)**: Error messages will be visually placed near their respective input fields and semantically linked using `aria-describedby`. The `aria-invalid="true"` attribute will be set on the erroneous input.

---

## 4. UI.InteractionSpecs

*   **State Matrix for Interactive Elements (Buttons, Inputs, Links, Selectors)**:
    *   **Default**: Base appearance as defined by `UI.StyleTokens`.
    *   **Hover**:
        *   **Buttons (UI-002, UI-003, UI-004)**: Slight background color lighten (`color-primary-light`, `color-background-surface`), subtle `shadow-md` lift, small scale increase (1.02x). `motion-duration-fast` transition.
        *   **Inputs (UI-001)**: Bottom border darkens slightly (`border-default` darker shade).
        *   **Links (UI-005)**: Underline appears.
        *   **List Items (UI-010)**: Subtle `background-color` `color-background-surface`.
    *   **Focus**:
        *   **All Focusable Elements**: Clear `outline` using `color-focus-ring`. Inherits hover state visual changes if applicable.
    *   **Active (Pressed)**:
        *   **Buttons (UI-002, UI-003, UI-004)**: Background color darkens (`color-primary-dark`), visually sinks (small scale decrease 0.98x), `shadow-none`. `motion-duration-fast` transition.
        *   **Links (UI-005)**: `text-color` `color-secondary-dark`.
    *   **Disabled**:
        *   **Buttons (UI-002, UI-003, UI-004)**: `background-color` `color-background-surface`, `text-color` `color-text-secondary`, `shadow-none`. Cursor `not-allowed`. No interactive feedback.
        *   **Inputs (UI-001)**: `background-color` `color-background-surface`, `text-color` `color-text-secondary`, `border-default`. Read-only.
    *   **Loading**:
        *   **Primary Button (UI-002)**: Spinner icon replaces button text, `aria-busy="true"`. Button remains clickable but with loading state until operation completes.
    *   **Error**:
        *   **Inputs (UI-001)**: `border-color` `color-danger-dark`.
        *   **Inline Error Message (UI-006)**: Appears below input, `text-color` `color-danger-dark`.
        *   **Toast Notification (UI-007)**: `background-color` `color-danger`, `text-on-primary`.
    *   **Success**:
        *   **Toast Notification (UI-007)**: `background-color` `color-success`, `text-on-primary`.
*   **Microinteractions**:
    *   **Transitions**: All state changes (hover, focus, active, error) will use `motion-duration-fast` to `motion-duration-normal` with `motion-easing-ease-in-out` for a smooth, subtle feel.
    *   **Shadow Changes**: Subtle `shadow-sm` on default, `shadow-md` on hover/focus for clickable elements to provide depth. `shadow-none` on active.
    *   **Scaling**: Buttons will have a minimal scale change (e.g., 1.02x on hover, 0.98x on active) for a tactile feel.
    *   **Modal Opening/Closing (UI-008)**: Overlay fades in/out (duration `motion-duration-normal`), content card slides up and fades in/out (`motion-duration-normal`).
*   **Feedback Mechanisms**:
    *   **Form Error Notifications**: Specific inline error messages (UI-006) will appear immediately below the invalid input field upon client-side validation failure or after server response.
    *   **Global Toasts (UI-007)**: Used for general success (e.g., "Profile updated," "Workout saved"), global errors (e.g., "Network error," "Save failed"), or informative messages. These appear transiently and do not block user interaction.
    *   **Success Feedback**:
        *   For form submissions (e.g., registration, profile update, workout save), a success toast (UI-007) will be displayed briefly, followed by navigation to the next appropriate screen or return to a read-only view.
        *   The Rest Timer (UI-013) will provide audible/vibration feedback upon completion.
        *   Workout summary (UI-023) visually reinforces achievements before final save.

---

## 5. UI.ResponsiveRules

*   **Grid Layout**:
    *   **Desktop (>= `breakpoint-lg`)**: 12-column grid, `space-8x` gutter. Max container width `breakpoint-xxl`.
    *   **Tablet (>= `breakpoint-md` and < `breakpoint-lg`)**: 8-column grid, `space-6x` gutter. Max container width `breakpoint-lg`.
    *   **Mobile (< `breakpoint-md`)**: Single column layout, `space-4x` padding on either side of the content. Full-width components by default.
    *   **Padding**: Global page padding will adjust according to breakpoint: `space-12x` (desktop), `space-8x` (tablet), `space-4x` (mobile).
*   **Navigation Collapse**:
    *   **Main Navigation**: On screens smaller than `breakpoint-md`, the main application navigation will collapse into a hamburger menu icon (three horizontal lines). Tapping this icon will reveal a full-height, full-width (or near full-width) drawer (sidebar) containing the navigation links.
    *   **Contextual Menus**: Smaller action menus (e.g., 'Edit/Delete' options) may transform into a bottom sheet on mobile devices for easier thumb access.
*   **Font/Scaling**:
    *   Base font size (`font-size-md`) will be `16px` on desktop and scale proportionally using fluid typography techniques (e.g., `clamp()` or `vw` units within a min/max range) to `14px` on mobile for optimal readability.
    *   Headings (`font-size-xl`, `font-size-xxl`) will also scale down appropriately on smaller viewports to prevent excessive line breaks and maintain visual hierarchy.
    *   `lineHeight` will remain `font-lineHeight-normal` or `font-lineHeight-relaxed` for all text for consistent readability across sizes.

---

## 6. UI.DevNotes

*   **Design Token Adherence**: All UI elements, including colors, typography, spacing, corner radii, shadows, and motion durations, **must** strictly utilize the defined `UI.StyleTokens`. Custom values or hardcoded styles are explicitly forbidden to ensure consistency and maintainability.
*   **Full State Implementation**: All described states (e.g., hover, focus, active, disabled, loading, error, success) for every interactive component **must** be fully implemented. This is crucial for a robust and accessible user experience.
*   **Leverage Library Features (if applicable)**: If a UI component library (e.g., Ant Design, Material-UI) is used, prefer its built-in features for handling states (e.g., `<Button loading />` for loading states, `status="error"` for input fields) rather than custom implementations, where they align with the design tokens. This minimizes boilerplate and leverages tested accessibility.
*   **Semantic HTML**: Prioritize using semantic HTML5 elements (e.g., `<button>`, `<input>`, `<form>`, `<nav>`, `<main>`) to improve accessibility and readability of the codebase.
*   **Accessibility First**: Every component and screen must be built with accessibility as a primary concern, ensuring keyboard navigability, clear focus indicators, appropriate ARIA attributes, and sufficient contrast ratios.
```