# Firebase Authentication Integration Plan

Integrate real Firebase Authentication into **GO Gulf Experts** (`my_app`) for email/password sign-in, Google OAuth, user registration with custom roles, password reset, and protected routes.

## User Review Required

> [!IMPORTANT]
> A Firebase project configuration is required in `.env.local`. Sample environment variables will be created so the app compiles cleanly, but you will need to replace them with your actual Firebase project credentials from the [Firebase Console](https://console.firebase.google.com/).

> [!NOTE]
> The implementation will retain full design fidelity and fallback gracefully if Firebase credentials are in placeholder mode.

## Proposed Changes

### Configuration & Utilities

#### [NEW] [firebase.ts](file:///c:/Users/ACER/OneDrive/Internship/Project/my_app/lib/firebase.ts)
* Initialize Firebase App, Auth instance, and Google Auth Provider (`googleProvider`).

#### [NEW] [auth-context.tsx](file:///c:/Users/ACER/OneDrive/Internship/Project/my_app/lib/auth-context.tsx)
* Provide `AuthProvider` React context exposing `user`, `loading`, `signIn`, `signUp`, `signInWithGoogle`, `logout`, and `resetPassword`.

#### [NEW] [.env.local](file:///c:/Users/ACER/OneDrive/Internship/Project/my_app/.env.local)
* Store `NEXT_PUBLIC_FIREBASE_*` configuration keys.

---

### App Router Components

#### [MODIFY] [layout.tsx](file:///c:/Users/ACER/OneDrive/Internship/Project/my_app/app/layout.tsx)
* Wrap application children with `<AuthProvider>` for global user state access.

#### [MODIFY] [page.tsx](file:///c:/Users/ACER/OneDrive/Internship/Project/my_app/app/page.tsx)
* Wire `AuthPanel` to Firebase `signIn` and `signInWithGoogle`.
* Display real loading indicators & authentication error banners.

#### [MODIFY] [request-access/page.tsx](file:///c:/Users/ACER/OneDrive/Internship/Project/my_app/app/request-access/page.tsx)
* Wire form to Firebase `createUserWithEmailAndPassword` and update user profile display name.

#### [MODIFY] [forgot-password/page.tsx](file:///c:/Users/ACER/OneDrive/Internship/Project/my_app/app/forgot-password/page.tsx)
* Wire password reset flow to Firebase `sendPasswordResetEmail`.

#### [MODIFY] [dashboard/page.tsx](file:///c:/Users/ACER/OneDrive/Internship/Project/my_app/app/dashboard/page.tsx)
* Add user profile header display and Sign Out action via Firebase `logout()`.

## Verification Plan

### Automated Tests
- Install `firebase` package (`npm install firebase`).
- Run `npm run build` to verify type checking and compilation.

### Manual Verification
- Test sign-in form with valid and invalid email/password inputs.
- Test Google OAuth sign-in.
- Verify user session persists across page navigations.
- Test Sign Out button from dashboard.
