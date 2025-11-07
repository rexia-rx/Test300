## 1. User Flow
#### [EPIC-001-S1] User Registration
```mermaid
flowchart TD
    S1_START["User opens app"] --> S1_NAVIGATE_TO_REGISTRATION["User taps Sign Up"]
    S1_NAVIGATE_TO_REGISTRATION --> S1_DISPLAY_FORM["System displays registration form"]
    S1_DISPLAY_FORM --> S1_USER_FILLS_FORM["User enters email and password"]
    S1_USER_FILLS_FORM --> S1_USER_SUBMITS["User taps Register"]
    S1_USER_SUBMITS --> S1_VALIDATE_INPUT{"System validates input"}
    S1_VALIDATE_INPUT -- "Invalid format or mismatch" --> S1_SHOW_VALIDATION_ERROR["System shows inline error message"]
    S1_SHOW_VALIDATION_ERROR --> S1_USER_FILLS_FORM
    S1_VALIDATE_INPUT -- "Valid input" --> S1_CHECK_DB{"System checks if email exists"}
    S1_CHECK_DB -- "Email exists" --> S1_SHOW_EXISTING_ERROR["System shows email already registered error"]
    S1_SHOW_EXISTING_ERROR --> S1_USER_FILLS_FORM
    S1_CHECK_DB -- "Email is new" --> S1_CREATE_ACCOUNT["System creates account and logs user in"]
    S1_CREATE_ACCOUNT --> S1_SUCCESS["User is navigated to the main dashboard"]
```

#### [EPIC-001-S2] User Login
```mermaid
flowchart TD
    S2_START["User opens app"] --> S2_NAVIGATE_TO_LOGIN["User taps Log In"]
    S2_NAVIGATE_TO_LOGIN --> S2_DISPLAY_FORM["System displays login form"]
    S2_DISPLAY_FORM --> S2_USER_FILLS_FORM["User enters email and password"]
    S2_USER_FILLS_FORM --> S2_USER_SUBMITS["User taps Log In"]
    S2_USER_SUBMITS --> S2_AUTHENTICATE{"System authenticates credentials"}
    S2_AUTHENTICATE -- "Invalid credentials" --> S2_SHOW_AUTH_ERROR["System shows invalid credentials error"]
    S2_SHOW_AUTH_ERROR --> S2_USER_FILLS_FORM
    S2_AUTHENTICATE -- "Valid credentials" --> S2_LOGIN_SUCCESS["System logs user in"]
    S2_LOGIN_SUCCESS --> S2_END["User is navigated to the main dashboard"]
```

#### [EPIC-001-S3] Basic Profile Management
```mermaid
flowchart TD
    S3_START["User is on dashboard"] --> S3_NAV_PROFILE["User navigates to Profile screen"]
    S3_NAV_PROFILE --> S3_DISPLAY_PROFILE["System displays current profile info"]
    S3_DISPLAY_PROFILE --> S3_TAP_EDIT["User taps Edit Profile"]
    S3_TAP_EDIT --> S3_ENABLE_EDIT_MODE["System enables editing of fields"]
    S3_ENABLE_EDIT_MODE --> S3_USER_EDITS["User changes display name or units"]
    S3_USER_EDITS --> S3_TAP_SAVE["User taps Save"]
    S3_TAP_SAVE --> S3_VALIDATE{"System validates changes"}
    S3_VALIDATE -- "Invalid input e g empty name" --> S3_SHOW_ERROR["System displays validation error"]
    S3_SHOW_ERROR --> S3_USER_EDITS
    S3_VALIDATE -- "Valid input" --> S3_SAVE_CHANGES["System saves changes to database"]
    S3_SAVE_CHANGES --> S3_SHOW_SUCCESS["System displays success message and exits edit mode"]
    S3_SHOW_SUCCESS --> S3_END["Profile screen shows updated info"]
```

#### [EPIC-002-S1] Initiate New Workout Session
```mermaid
flowchart TD
    S1_START["User is on the Dashboard"] --> S1_SELECT_ACTION{"User selects how to start"}
    S1_SELECT_ACTION -- "Taps Start New Workout" --> S1_CREATE_LIVE_SESSION["System creates a new empty workout for today"]
    S1_CREATE_LIVE_SESSION --> S1_NAVIGATE_TO_WORKOUT_SCREEN["User is navigated to the active workout screen"]
    S1_SELECT_ACTION -- "Taps Log Past Workout" --> S1_SHOW_DATE_PICKER["System displays a date and time picker"]
    S1_SHOW_DATE_PICKER --> S1_USER_SELECTS_DATE["User selects a past date and time"]
    S1_USER_SELECTS_DATE --> S1_CREATE_PAST_SESSION["System creates a new empty workout for selected date"]
    S1_CREATE_PAST_SESSION --> S1_NAVIGATE_TO_WORKOUT_SCREEN
    S1_NAVIGATE_TO_WORKOUT_SCREEN --> S1_END["User can now add exercises to the session"]
```

#### [EPIC-002-S2] Select Exercise from Library
```mermaid
flowchart TD
    S2_START["User is on active workout screen"] --> S2_TAP_ADD["User taps Add Exercise"]
    S2_TAP_ADD --> S2_SHOW_LIBRARY["System displays exercise library with search bar"]
    S2_SHOW_LIBRARY --> S2_USER_SEARCHES["User searches or scrolls to find an exercise"]
    S2_USER_SEARCHES --> S2_USER_SELECTS["User taps on an exercise from the list"]
    S2_USER_SELECTS --> S2_ADD_TO_WORKOUT["System adds the selected exercise to the current workout session"]
    S2_ADD_TO_WORKOUT --> S2_END["User is returned to the workout screen to log details"]
    S2_USER_SEARCHES -- "Exercise not found" --> S2_NO_RESULTS["System displays no results found message"]
    S2_NO_RESULTS --> S2_USER_SEARCHES
```

#### [EPIC-002-S3] Add Custom Exercise During Workout
```mermaid
flowchart TD
    S3_START["User is on exercise selection screen"] --> S3_CANNOT_FIND["User cannot find their exercise"]
    S3_CANNOT_FIND --> S3_TAP_CREATE["User taps Create New Exercise button"]
    S3_TAP_CREATE --> S3_SHOW_CREATE_FORM["System displays a form to enter new exercise name"]
    S3_SHOW_CREATE_FORM --> S3_USER_ENTERS_NAME["User enters the name of the new exercise"]
    S3_USER_ENTERS_NAME --> S3_USER_SAVES["User taps Save"]
    S3_USER_SAVES --> S3_VALIDATE{"System validates the input"}
    S3_VALIDATE -- "Name is empty" --> S3_SHOW_EMPTY_ERROR["System shows 'Name cannot be empty' error"]
    S3_SHOW_EMPTY_ERROR --> S3_USER_ENTERS_NAME
    S3_VALIDATE -- "Name is valid" --> S3_SAVE_TO_LIBRARY["System saves new exercise to user's custom library"]
    S3_SAVE_TO_LIBRARY --> S3_ADD_TO_WORKOUT["System adds the new exercise to the current workout session"]
    S3_ADD_TO_WORKOUT --> S3_END["User is returned to the workout screen"]
```

#### [EPIC-002-S4] Record Strength Training Parameters
```mermaid
flowchart TD
    S4_START["User has added a strength exercise"] --> S4_SHOW_INPUTS["System displays input fields for Set 1 Reps Weight"]
    S4_SHOW_INPUTS --> S4_USER_ENTERS_DATA["User enters values for the set"]
    S4_USER_ENTERS_DATA --> S4_DATA_SAVED["System auto-saves data for the set"]
    S4_DATA_SAVED --> S4_USER_ADDS_SET["User taps Add Set"]
    S4_USER_ADDS_SET --> S4_SHOW_NEW_INPUTS["System displays input fields for Set 2"]
    S4_SHOW_NEW_INPUTS --> S4_USER_ENTERS_DATA
    S4_USER_ENTERS_DATA --> S4_VALIDATE{"System validates input is numeric"}
    S4_VALIDATE -- "Non-numeric input" --> S4_SHOW_ERROR["System shows 'Please enter a number' error"]
    S4_SHOW_ERROR --> S4_USER_ENTERS_DATA
    S4_VALIDATE -- "Numeric input" --> S4_DATA_SAVED
```

#### [EPIC-002-S5] Record Cardio/Time-Based Parameters
```mermaid
flowchart TD
    S5_START["User has added a cardio exercise"] --> S5_SHOW_INPUTS["System displays input fields for Duration and Distance"]
    S5_SHOW_INPUTS --> S5_USER_ENTERS_DATA["User enters values for duration or distance"]
    S5_USER_ENTERS_DATA --> S5_VALIDATE{"System validates input"}
    S5_VALIDATE -- "Invalid format e g text" --> S5_SHOW_ERROR["System shows 'Invalid format' error"]
    S5_SHOW_ERROR --> S5_USER_ENTERS_DATA
    S5_VALIDATE -- "Valid format" --> S5_DATA_SAVED["System auto-saves the entered data"]
    S5_DATA_SAVED --> S5_END["User can edit values or finish workout"]
```

#### [EPIC-002-S6] Record Optional Rest Time
```mermaid
flowchart TD
    S6_START["User completes a set of an exercise"] --> S6_SHOW_REST_OPTION["System displays a 'Start Rest' button or timer"]
    S6_SHOW_REST_OPTION --> S6_USER_STARTS_REST["User taps 'Start Rest'"]
    S6_USER_STARTS_REST --> S6_TIMER_BEGINS["A countdown timer starts on screen"]
    S6_TIMER_BEGINS --> S6_TIMER_ENDS{"Timer reaches zero"}
    S6_TIMER_ENDS -- "Yes" --> S6_NOTIFY_USER["System plays a sound or vibrates"]
    S6_NOTIFY_USER --> S6_PROMPT_NEXT_SET["User is prompted to start the next set"]
    S6_TIMER_BEGINS -- "User taps Skip" --> S6_SKIP_REST["Timer is dismissed"]
    S6_SKIP_REST --> S6_PROMPT_NEXT_SET
```

#### [EPIC-002-S7] Complete and Save Workout Session
```mermaid
flowchart TD
    S7_START["User has logged all exercises in a session"] --> S7_TAP_FINISH["User taps 'Finish Workout'"]
    S7_TAP_FINISH --> S7_SHOW_SUMMARY["System displays a summary of the workout"]
    S7_SHOW_SUMMARY --> S7_USER_CONFIRMS["User taps 'Save and Exit'"]
    S7_USER_CONFIRMS --> S7_SAVE_TO_DB{"System saves the complete session to the database"}
    S7_SAVE_TO_DB -- "Save successful" --> S7_SHOW_SUCCESS_MSG["System shows 'Workout Saved' confirmation"]
    S7_SHOW_SUCCESS_MSG --> S7_NAV_HOME["User is navigated to the dashboard or history screen"]
    S7_SAVE_TO_DB -- "Network error" --> S7_SHOW_ERROR_MSG["System shows 'Save failed check connection' error"]
    S7_SHOW_ERROR_MSG --> S7_PROVIDE_RETRY["System provides a 'Retry' option"]
    S7_PROVIDE_RETRY --> S7_USER_CONFIRMS
```

#### [EPIC-002-S8] Edit Past Workout Session
```mermaid
flowchart TD
    S8_START["User is on the History screen"] --> S8_SELECT_WORKOUT["User selects a past workout to view"]
    S8_SELECT_WORKOUT --> S8_VIEW_DETAILS["User is viewing the workout details"]
    S8_VIEW_DETAILS --> S8_TAP_EDIT["User taps the 'Edit' button"]
    S8_TAP_EDIT --> S8_LOAD_WORKOUT_EDITOR["System loads the workout session in an editable state"]
    S8_LOAD_WORKOUT_EDITOR --> S8_USER_MODIFIES["User modifies exercises sets reps or other data"]
    S8_USER_MODIFIES --> S8_TAP_SAVE["User taps 'Save Changes'"]
    S8_TAP_SAVE --> S8_VALIDATE_CHANGES{"System validates the modified data"}
    S8_VALIDATE_CHANGES -- "Invalid data" --> S8_SHOW_ERROR["System shows validation error message"]
    S8_SHOW_ERROR --> S8_USER_MODIFIES
    S8_VALIDATE_CHANGES -- "Valid data" --> S8_UPDATE_DB["System updates the workout record in the database"]
    S8_UPDATE_DB --> S8_SHOW_SUCCESS["System shows 'Changes saved' message"]
    S8_SHOW_SUCCESS --> S8_RETURN_TO_DETAILS["User is returned to the updated workout details screen"]
```

#### [EPIC-002-S9] Delete Past Workout Session
```mermaid
flowchart TD
    S9_START["User is viewing a past workout's details"] --> S9_TAP_DELETE["User taps the 'Delete' button"]
    S9_TAP_DELETE --> S9_SHOW_CONFIRM_DIALOG["System displays a confirmation dialog 'Are you sure?'"]
    S9_SHOW_CONFIRM_DIALOG --> S9_USER_DECIDES{"User confirms or cancels"}
    S9_USER_DECIDES -- "User taps 'Cancel'" --> S9_CLOSE_DIALOG["Dialog closes user remains on details screen"]
    S9_USER_DECIDES -- "User taps 'Delete'" --> S9_DELETE_FROM_DB["System deletes the workout record from the database"]
    S9_DELETE_FROM_DB --> S9_SHOW_SUCCESS["System shows 'Workout deleted' confirmation"]
    S9_SHOW_SUCCESS --> S9_NAV_TO_HISTORY["User is navigated back to the main History list"]
```

## 2. Screens & Components
| UX-ID | Story ID | User Flow Snippet | Page/Component | Interaction Description | Abnormal Scenarios | Style/Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| UX-001 | EPIC-001-S1 | Enter email/password → Click Register → Redirect to homepage | **Registration Screen**: Email input, Password input, Confirm Password input, Register button, Error message area | On click Register, client-side validation runs. On success, API call is made. On failure, inline error messages are shown. | Email already exists, Passwords do not match, Invalid email format, Weak password, Network error. | Inputs have clear labels. Error messages appear below the relevant field in red. Register button is disabled until all fields are filled. |
| UX-002 | EPIC-001-S2 | Enter email/password → Click Login → Redirect to homepage | **Login Screen**: Email input, Password input, Login button, Error message area, Forgot Password link | On click Login, credentials are sent to the server for verification. | Incorrect email/password combination, Account locked, Network error. | Error message is displayed in a shared area above the button. Inputs are cleared on failed attempt. |
| UX-003 | EPIC-001-S3 | Navigate to Profile → Edit details → Save | **Profile Screen**: Display name, Email (read-only), Unit preference (kg/lbs), Edit button, Save button | Tapping "Edit" enables input fields/selectors. Tapping "Save" persists changes and returns to read-only view. | Empty display name, Invalid selection, Save fails due to network error. | Unit preference is a segmented control or radio button. A success toast appears on save. |
| UX-004 | EPIC-002-S1 | Click "Start New Workout" → Enter workout logging screen | **Dashboard**: "Start New Workout" CTA button, "Log Past Workout" link | "Start New Workout" directly opens the logging screen for the current time. "Log Past Workout" opens a date/time modal first. | User cancels date selection. | "Start New Workout" should be the primary, most prominent action on the screen. |
| UX-005 | EPIC-002-S2 | Tap "Add Exercise" → Search/Select from list → Added | **Exercise Library Modal**: Search bar, List of exercises (categorized/alphabetical), "Create New" button | As user types in search, the list filters in real-time. Tapping an exercise closes the modal and adds it to the workout. | No search results found. | The list should be scrollable. Recently used exercises could be shown at the top for quick access. |
| UX-006 | EPIC-002-S3 | Tap "Create New" → Enter name → Save | **Create Exercise Modal**: Exercise Name input field, Save button, Cancel button | User types a name and saves. The new exercise is saved to their private library and immediately added to the current workout. | Exercise name is blank, Exercise name already exists. | Input field should have a clear label. Error messages are displayed below the input. |
| UX-007 | EPIC-002-S4 | For an exercise → Enter reps/weight for a set → Add another set | **Active Workout Screen**: Exercise Card with columns for Set, Reps, Weight; "Add Set" button | User fills in text inputs for reps and weight. Data is saved per set. "Add Set" creates a new row for input. | Non-numeric input, unrealistically high values (soft validation). | Inputs should be numeric keyboards on mobile. Previously logged data for this exercise could be pre-filled or shown as a hint. |
| UX-008 | EPIC-002-S5 | For an exercise → Enter duration/distance | **Active Workout Screen**: Exercise Card with inputs for Duration (time) and Distance (number) | User fills in time/distance inputs. | Invalid time format, non-numeric distance. | Duration input could use a time picker for easier entry. Distance unit (km/mi) should be based on user profile settings. |
| UX-009 | EPIC-002-S6 | Complete a set → Tap "Start Rest" → Timer appears | **Active Workout Screen**: Rest Timer component (overlay or inline) | After logging a set, a "Start Rest" button appears. Tapping it starts a visual countdown timer. | User accidentally dismisses timer. | Timer should provide a clear visual indicator (e.g., circular progress bar) and an audible/vibration alert upon completion. |
| UX-010 | EPIC-002-S7 | Tap "Finish Workout" → Confirm → Redirect to home | **Active Workout Screen**: "Finish Workout" button. **Workout Summary Screen**: List of exercises performed, "Save" button. | Tapping "Finish" navigates to a summary for final review before saving permanently. | Network error during save, user navigates back without saving (prompt to discard). | The summary screen provides positive reinforcement by showing total volume, time, etc. |
| UX-011 | EPIC-002-S8 | Go to History → Select a workout → Tap Edit → Make changes → Save | **Workout Details Screen**: "Edit" icon/button. **Workout Editor Screen**: Same as active workout UI but pre-filled with data. | User can modify any parameter of the past workout. Save action overwrites the original record. | Invalid data entered during edit, network error on save. | Changes should be clearly highlighted. A confirmation dialog should appear before saving. |
| UX-012 | EPIC-002-S9 | Go to History → Select a workout → Tap Delete → Confirm | **Workout Details Screen**: "Delete" icon/button. **Confirmation Modal**: "Delete Workout?" message, Delete button, Cancel button. | The delete action is protected by a confirmation dialog to prevent accidental data loss. | User cancels the deletion. | The "Delete" button in the confirmation modal should be styled destructively (e.g., red) to signal a permanent action. |

## 3. Interaction Spec
#### [EPIC-001-S1] User Registration
-   **User Action:** Fills registration form and taps "Register".
-   **System Response:** Validates input fields client-side. If valid, sends data to the server. Server validates and checks for existing email.
-   **Success Feedback:** Creates user account, logs user in, navigates to the app's main dashboard. A welcome message is displayed briefly.
-   **Exception Feedback:** Displays specific inline error messages for: invalid email format, password mismatch, or if email is already registered. Shows a general error toast for network failures.

#### [EPIC-001-S2] User Login
-   **User Action:** Fills login form and taps "Log In".
-   **System Response:** Sends credentials to the server for authentication.
-   **Success Feedback:** Logs the user in, navigates to the main dashboard.
-   **Exception Feedback:** Displays an error message "Invalid email or password" on the login screen.

#### [EPIC-001-S3] Basic Profile Management
-   **User Action:** Navigates to profile, taps "Edit", changes data, and taps "Save".
-   **System Response:** Validates the new data (e.g., name is not empty). If valid, sends an update request to the server.
-   **Success Feedback:** The screen exits edit mode, displays the updated information, and shows a temporary success message (e.g., "Profile updated").
-   **Exception Feedback:** Displays an inline error if the input is invalid. Shows a general error toast if the save operation fails.

#### [EPIC-002-S1] Initiate New Workout Session
-   **User Action:** Taps "Start New Workout" or "Log Past Workout" on the dashboard.
-   **System Response:** Creates a new, unsaved workout object. If "Log Past" was chosen, it first prompts for and sets the date.
-   **Success Feedback:** Navigates the user to the active workout logging screen, ready to add exercises.
-   **Exception Feedback:** [Assumption] If an unsaved workout already exists, prompt the user to resume or discard it before starting a new one.

#### [EPIC-002-S2] Select Exercise from Library
-   **User Action:** On the workout screen, taps "Add Exercise", then selects an exercise from the list.
-   **System Response:** Closes the exercise library view and appends the selected exercise to the current workout session list.
-   **Success Feedback:** The user is returned to the workout screen where the new exercise card is visible, ready for data input.
-   **Exception Feedback:** If the list fails to load, a "Could not load exercises" message is shown with a retry button.

#### [EPIC-002-S3] Add Custom Exercise During Workout
-   **User Action:** From the exercise library, taps "Create New", enters a name, and taps "Save".
-   **System Response:** Validates the name, saves the new exercise to the user's custom list, and adds it to the current workout.
-   **Success Feedback:** The create modal closes, and the user is returned to the workout screen with the new custom exercise added.
-   **Exception Feedback:** Displays an inline error if the name is empty or already exists.

#### [EPIC-002-S4] Record Strength Training Parameters
-   **User Action:** Enters numbers into the Reps and Weight input fields for a specific set.
-   **System Response:** The data is temporarily stored in the current session's state. [Assumption] The system may pre-fill the fields with data from the previous set or a past workout for convenience.
-   **Success Feedback:** The input fields reflect the entered numbers. The user can proceed to the next set.
-   **Exception Feedback:** If non-numeric data is entered, the input field shows an error state or rejects the input.

#### [EPIC-002-S5] Record Cardio/Time-Based Parameters
-   **User Action:** Enters values into the Duration and/or Distance input fields.
-   **System Response:** The data is temporarily stored in the current session's state.
-   **Success Feedback:** The input fields reflect the entered values.
-   **Exception Feedback:** If an invalid format is entered (e.g., text in a distance field), the input shows an error state.

#### [EPIC-002-S6] Record Optional Rest Time
-   **User Action:** Taps the "Start Rest" button after completing a set.
-   **System Response:** An on-screen timer begins a countdown from a pre-set or user-defined duration.
-   **Success Feedback:** The timer visually counts down. Upon completion, a sound or vibration alert is triggered.
-   **Exception Feedback:** The user can manually skip or edit the timer if needed.

#### [EPIC-002-S7] Complete and Save Workout Session
-   **User Action:** Taps "Finish Workout", reviews the summary, and taps "Save".
-   **System Response:** The system sends the complete workout session data to the server to be persisted in the database.
-   **Success Feedback:** Displays a "Workout Saved!" confirmation message and navigates the user away from the workout screen (e.g., to the dashboard or history).
-   **Exception Feedback:** If saving fails due to a network error, an error message is displayed with a "Retry" button.

#### [EPIC-002-S8] Edit Past Workout Session
-   **User Action:** Taps "Edit" on a past workout, modifies the data, and taps "Save Changes".
-   **System Response:** Validates the new data and sends an update request to the server.
-   **Success Feedback:** Displays a "Changes Saved" message and returns the user to the read-only view of the updated workout.
-   **Exception Feedback:** Shows validation errors for invalid data. Shows a general error toast if the save operation fails.

#### [EPIC-002-S9] Delete Past Workout Session
-   **User Action:** Taps "Delete" on a past workout and confirms the action in a dialog.
-   **System Response:** Sends a delete request to the server for the specified workout record.
-   **Success Feedback:** The record is deleted. The app shows a "Workout Deleted" confirmation and navigates the user back to the workout history list, which is now updated.
-   **Exception Feedback:** If the user taps "Cancel" in the dialog, the dialog is dismissed and no action is taken.

## 4. Information Architecture
```mermaid
flowchart TD
    subgraph APP[MyFitness2 App]
        subgraph ONBOARDING[Onboarding]
            REGISTRATION["Registration Screen"]
            LOGIN["Login Screen"]
        end

        subgraph MAIN_APP[Main Application - Authenticated]
            DASHBOARD["Dashboard"]
            WORKOUT["Workout Module"]
            HISTORY["History and Progress"]
            PROFILE["Profile and Settings"]
        end
    end

    APP --> ONBOARDING
    ONBOARDING --> MAIN_APP

    DASHBOARD -- "Tap Start Workout" --> WORKOUT_LOGGING
    DASHBOARD -- "View summary" --> HISTORY

    WORKOUT --> WORKOUT_LOGGING["Workout Logging Screen"]
    WORKOUT_LOGGING -- "Add exercise" --> EXERCISE_LIBRARY["Exercise Library"]
    WORKOUT_LOGGING -- "Finish" --> WORKOUT_SUMMARY["Workout Summary Screen"]
    
    HISTORY --> HISTORY_LIST["Workout History List"]
    HISTORY_LIST -- "Select workout" --> WORKOUT_DETAILS["Workout Details"]
    WORKOUT_DETAILS -- "View progress" --> EXERCISE_PROGRESS["Exercise Progress Graph"]

    PROFILE --> PROFILE_MANAGEMENT["Manage Profile"]
    PROFILE --> EXERCISE_MANAGEMENT["Manage Custom Exercises"]
    PROFILE --> APP_SETTINGS["App Settings e g Units"]
```

## 5. Covering Index
-   **[EPIC-001] User & Account Management**
    -   [EPIC-001-S1] User Registration: ✅ Output [Contains assumptions]
    -   [EPIC-001-S2] User Login: ✅ Output
    -   [EPIC-001-S3] Basic Profile Management: ✅ Output [Contains assumptions]
-   **[EPIC-002] Workout Session Management**
    -   [EPIC-002-S1] Initiate New Workout Session: ✅ Output [Contains assumptions]
    -   [EPIC-002-S2] Select Exercise from Library: ✅ Output
    -   [EPIC-002-S3] Add Custom Exercise During Workout: ✅ Output
    -   [EPIC-002-S4] Record Strength Training Parameters: ✅ Output [Contains assumptions]
    -   [EPIC-002-S5] Record Cardio/Time-Based Parameters: ✅ Output
    -   [EPIC-002-S6] Record Optional Rest Time: ✅ Output
    -   [EPIC-002-S7] Complete and Save Workout Session: ✅ Output
    -   [EPIC-002-S8] Edit Past Workout Session: ✅ Output
    -   [EPIC-002-S9] Delete Past Workout Session: ✅ Output