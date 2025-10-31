# 📘 React Router v6 → v7 Complete Guide

This document explains everything you need to know about the **shift from React Router v6 to v7**, including practical examples, key differences, migration steps, and modern best practices such as **loaders**, **actions**, **prefetching**, **deferred data**, error handling, and testing tips. It is written for beginners and intermediate React developers who want a single, consolidated reference for migrating existing apps or starting new ones with React Router v7.

---

## 🚀 Table of Contents

1. [Introduction](#introduction)
2. [React Router v6 — Quick Recap](#react-router-v6---quick-recap)
3. [React Router v7 — Overview](#react-router-v7---overview)
4. [Key Differences: v6 → v7 (At a glance)](#key-differences-v6--v7-at-a-glance)
5. [Core Concepts & APIs in v7](#core-concepts--apis-in-v7)
   - [createBrowserRouter & RouterProvider](#createbrowserrouter--routerprovider)
   - [Route Objects and Nested Routes](#route-objects-and-nested-routes)
   - [Layout routes and `<Outlet/>`](#layout-routes-and-outlet)
   - [Loaders (data fetching)](#loaders-data-fetching)
   - [Actions (mutations / form handling)](#actions-mutations--form-handling)
   - [Error handling: `errorElement` & ErrorBoundaries](#error-handling-errorelement--errorboundaries)
   - [Prefetching & `prefetch="intent"`](#prefetching--prefetchintent)
   - [Deferred data & `<Await/>`](#deferred-data--await)
   - [useLoaderData, useActionData, useFetcher, useNavigation](#useloadedata-useactiondata-usefetcher-usenavigation)
6. [When to keep `useState`/`useEffect` and when not to](#when-to-keep-usestateuseeffect-and-when-not-to)
7. [Migration: v6 → v7 — Step-by-step](#migration-v6--v7--step-by-step)
8. [Practical Examples (Complete)](#practical-examples-complete)
   - [Simple route (v6 → v7)](#simple-route-v6--v7)
   - [Layout + nested routes (v7 pattern)](#layout--nested-routes-v7-pattern)
   - [Loader example: GitHub profile](#loader-example-github-profile)
   - [Action example: simple form submission](#action-example-simple-form-submission)
   - [Prefetch link example](#prefetch-link-example)
   - [Deferred data example](#deferred-data-example)
9. [Error handling & UX best practices](#error-handling--ux-best-practices)
10. [Testing routes & loaders](#testing-routes--loaders)
11. [Performance & SEO considerations](#performance--seo-considerations)
12. [Common gotchas & troubleshooting](#common-gotchas--troubleshooting)
13. [Appendix: Useful Hooks & utilities](#appendix-useful-hooks--utilities)
14. [Further reading & references](#further-reading--references)

---

## 🧠 Introduction

React Router powers client-side navigation in React apps. v7 moves beyond only mapping URLs to components — it treats routing and data as a single integrated system. This improves UX by allowing data to be loaded and validated before a route renders, providing built-in prefetching, and simplifying form handling (mutations).

This guide gives you a practical, single-file reference you can keep with your project when migrating or building with React Router v7.

---

## 🔁 React Router v6 — Quick Recap

- Route definitions were JSX-based using `<BrowserRouter>`, `<Routes>`, and `<Route>`.
- Nested routes were built with `<Route>` children and displayed using `<Outlet/>` in parent components.
- Data fetching and side effects were handled inside components with `useEffect` and `useState` (or libraries like SWR/React Query).
- Example v6 usage:

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

<Router>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</Router>;
```

This works well but lacks centralized, declarative data fetching and built-in prefetching or mutation flows.

---

## ⚡ React Router v7 — Overview

v7 replaces JSX-based route definitions with **route objects** configured via `createBrowserRouter` (or `createMemoryRouter`, `createHashRouter`, etc.). You pass that router to `<RouterProvider/>`. Routes support `loader`, `action`, `errorElement`, and `children` for nested routing. The framework is oriented around **loading data before render**, **handling mutations**, and **prefetching**.

Example v7 skeleton:

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
]);

<RouterProvider router={router} />;
```

---

## 🧩 Key Differences: v6 → v7 (At a glance)

- **Route definition:** v6 (JSX `<Route>`), v7 (JS object route array).
- **Router wrapper:** v6 `<BrowserRouter>` (component tree), v7 `<RouterProvider router={...}>` (router instance).
- **Data fetching:** v6 inside components (`useEffect`), v7 via `loader` (runs before render).
- **Mutations/form handling:** v6 manual, v7 has `action` on a route for declarative handling.
- **Prefetching:** v7 can prefetch loaders when links are hovered (`prefetch="intent"`).
- **Error handling:** v7 supports per-route `errorElement` and centralized error UI.
- **SSR & streaming friendly:** v7 improves server-side rendering flows (if needed).
- **Testing:** loaders and actions are plain async functions, easier to unit-test.

---

## 🔧 Core Concepts & APIs in v7

### createBrowserRouter & RouterProvider

```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(routesArray);
<RouterProvider router={router} />;
```

You create a router instance (browser, memory, hash) and pass it to `RouterProvider`. This provider manages navigation, data, and context for your app. Unlike `<BrowserRouter>` which is a component wrapper, `RouterProvider` is passed a `router` instance and handles rendering for you.

### Route Objects and Nested Routes

Routes are objects with keys: `path`, `element`, `children`, `index`, `loader`, `action`, `errorElement`, `handle`, etc.

Example:

```js
{
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    { index: true, element: <Overview /> },
    { path: "reports", element: <Reports />, loader: reportsLoader },
  ],
}
```

### Layout routes and `<Outlet/>`

Parent routes render an `element` that usually includes `<Outlet />`. `<Outlet/>` is where the nested child route element renders.

```jsx
function DashboardLayout() {
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

### Loaders (data fetching)

A `loader` is an async function attached to a route. It runs before the route renders and provides data to the route via `useLoaderData()`.

```js
export async function userLoader({ params }) {
  const res = await fetch(`/api/users/${params.id}`);
  if (!res.ok) throw new Response("Failed", { status: res.status });
  return res.json();
}
```

Attach to route:

```js
{ path: "user/:id", element: <User />, loader: userLoader }
```

Use inside component:

```jsx
import { useLoaderData } from "react-router-dom";
const data = useLoaderData();
```

Loaders are also cancellable on navigation, and they can `throw` a `Response` to trigger `errorElement` UI.

### Actions (mutations / form handling)

`action` is a function that receives form data (via `Form` from react-router) and runs server-like mutations. It typically returns redirect or data and allows optimistic UI and validation flows.

```js
export async function loginAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  // perform auth
  return redirect("/dashboard");
}
```

Bind to route and use `<Form method="post">` from react-router to call it.

### Error handling: `errorElement` & ErrorBoundaries

Attach `errorElement` to a route to show UI when loader/action throws or a rendering error occurs.

```js
{ path: "/", element: <Root />, errorElement: <RootError /> }
```

### Prefetching & `prefetch="intent"`

Links can ask the router to prefetch loader data on user intent (hover/focus):

```jsx
<Link to="/profile" prefetch="intent">
  Profile
</Link>
```

`prefetch="intent"` starts loading the route's loader when the user intends to navigate.

There is also `prefetch="render"` to fetch as soon as the Link mounts (use carefully).

### Deferred data & `<Await/>`

Use `defer()` in loaders to return some data immediately and defer slow pieces. Use `<Await/>` and `Suspense` to show placeholders.

Loader:

```js
import { defer } from "react-router-dom";
export async function dashboardLoader() {
  const fast = fetchFastData();
  const slowPromise = fetchSlowData();
  return defer({ fast, slow: slowPromise });
}
```

Component:

```jsx
import { useLoaderData, Await } from "react-router-dom";
const data = useLoaderData();
// data.fast is ready; data.slow is a promise
<Suspense fallback={<Spinner />}>
  <Await resolve={data.slow}>{(slow) => <SlowComponent data={slow} />}</Await>
</Suspense>;
```

### Useful hooks

- `useLoaderData()` — loader result for current route.
- `useActionData()` — data returned from the last action on this route.
- `useNavigation()` — current navigation state (`idle`, `loading`, `submitting`).
- `useFetcher()` — perform non-navigation fetches (good for background mutations).
- `useRouteError()` — use inside `errorElement` to read the thrown error.

---

## ❓ When to keep `useState` / `useEffect` and when not to

You can eliminate `useState`/`useEffect` for **route-level data fetching** when using loaders. However, there are still valid places to use them:

Use `useState/useEffect`:

- Local UI state (toggles, input local state).
- Polling or intervals tied to component lifecycle.
- Local effects unrelated to navigation (e.g., subscribing to `window` events).
- When using third-party data fetching libraries like React Query for caching, background refresh, and complex sync.

Avoid `useState/useEffect` for:

- Primary route data that can be provided by loaders (fetching user profile, page data).
- Avoid duplicating loader logic inside component.

---

## 🔁 Migration: v6 → v7 — Step-by-step

1. **Install** react-router v7:

   ```bash
   npm install react-router-dom@latest
   # or
   yarn add react-router-dom@latest
   ```

2. **Replace** `<BrowserRouter>` + `<Routes>` with `createBrowserRouter` + `RouterProvider`.

   - Create a `router.js` or `routes.js` file.

3. **Create Layouts** for common UI (Navbar/Footer) — layout routes that include `<Outlet/>`.

4. **Move data fetching** from components into `loader` functions where appropriate. Use `useLoaderData()` in the component.

5. **Replace forms** handled by `useState` with `<Form>` (react-router) and `action` on a route for server-like handling.

6. **Add `errorElement`** for routes to handle loader/action errors.

7. **Use `prefetch="intent"`** on important links to reduce perceived latency.

8. **Test loaders/actions** by calling them directly (they are plain async functions).

9. **Keep or integrate React Query** only when you need client cache invalidation and background updates — you can still call react-query from inside loaders or have loaders use react-query.

---

## 🧪 Practical Examples (Complete)

### Simple route (v6 → v7)

**v6**

```jsx
// App.jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</BrowserRouter>
```

**v7**

```js
// router.js
import Home from "./Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{ path: "/", element: <Home /> }]);
<RouterProvider router={router} />;
```

---

### Layout + nested routes (v7 pattern)

```jsx
// Layout.jsx
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

```js
// router.js
import Layout from "./Layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
]);
```

---

### Loader example: GitHub profile

```js
// githubLoader.js
export async function githubLoader() {
  const res = await fetch("https://api.github.com/users/saadnadeem07");
  if (!res.ok) throw new Response("Failed to fetch", { status: res.status });
  return res.json();
}

// router.js
{ path: "github-profile", element: <GithubProfile />, loader: githubLoader }

// GithubProfile.jsx
import { useLoaderData } from "react-router-dom";
export default function GithubProfile() {
  const data = useLoaderData();
  return (
    <div>
      <h2>{data.name}</h2>
      <img src={data.avatar_url} alt={data.login} width={120} />
      <p>{data.bio}</p>
      <p>Followers: {data.followers}</p>
    </div>
  );
}
```

**Prefetch (in Navbar or wherever)**

```jsx
<Link to="/github-profile" prefetch="intent">
  GitHub Profile
</Link>
```

---

### Action example: simple form submission

```js
// loginAction.js
import { redirect } from "react-router-dom";
export async function loginAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  // call API
  const res = await fetch("/api/login", { method: "POST", body: formData });
  if (!res.ok) {
    return { error: "Invalid login" }; // use useActionData() to read this
  }
  return redirect("/dashboard");
}

// router.js
{
  path: "login",
  element: <LoginPage />,
  action: loginAction,
}
```

Login form:

```jsx
import { Form, useActionData } from "react-router-dom";
export default function LoginPage() {
  const actionData = useActionData();
  return (
    <Form method="post">
      <input name="email" />
      <input name="password" type="password" />
      <button type="submit">Login</button>
      {actionData?.error && <p>{actionData.error}</p>}
    </Form>
  );
}
```

---

### Prefetch link example

```jsx
<Link to="/reports" prefetch="intent">
  Reports
</Link>
```

- `intent`: prefetch when user intends to navigate (hover/focus).
- `render`: prefetch immediately when link mounts (can be heavy).

---

### Deferred data example

```js
// loader
import { defer } from "react-router-dom";
export async function dashboardLoader() {
  const fast = await fetch("/api/summary").then((r) => r.json());
  const slow = fetch("/api/large-report").then((r) => r.json()); // promise left pending
  return defer({ fast, slow });
}

// component
import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

export default function Dashboard() {
  const { fast, slow } = useLoaderData();
  return (
    <>
      <Summary data={fast} />
      <Suspense fallback={<Spinner />}>
        <Await resolve={slow}>
          {(report) => <LargeReport data={report} />}
        </Await>
      </Suspense>
    </>
  );
}
```

---

## ✅ Error handling & UX best practices

- Use `errorElement` at route or parent route to show friendly messages for loader/action errors.
- Throw `new Response("msg",{status:400})` inside loaders to send HTTP-like errors; read them with `useRouteError()`.
- Use `useNavigation()` to show global loading indicators when navigation or form submits happen.
- Use `useFetcher()` for background mutations that shouldn't navigate (e.g., like/unlike).

Example `errorElement`:

```js
{ path: "/", element: <Root />, errorElement: <RootError /> }
```

Inside `RootError`:

```jsx
import { useRouteError } from "react-router-dom";
export default function RootError() {
  const err = useRouteError();
  return (
    <div>Something went wrong: {String(err.message || err.statusText)}</div>
  );
}
```

---

## 🧪 Testing routes & loaders

- Loaders and actions are plain async functions — import and call them directly in tests.
- Example (Jest):

```js
import { githubLoader } from "./githubLoader";

test("githubLoader returns json", async () => {
  global.fetch = jest
    .fn()
    .mockResolvedValue({ ok: true, json: () => ({ name: "Saad" }) });
  const data = await githubLoader();
  expect(data.name).toBe("Saad");
});
```

- For integration tests, use `createMemoryRouter` with initial entries to simulate navigation:

```js
import { createMemoryRouter, RouterProvider } from "react-router-dom";
const router = createMemoryRouter(routes, {
  initialEntries: ["/github-profile"],
});
render(<RouterProvider router={router} />);
```

---

## 🚀 Performance & SEO considerations

- For large sites, consider server-side rendering (SSR) patterns — loaders are compatible with SSR flows.
- Use `prefetch="intent"` strategically for high-traffic links (e.g., dashboard, profile).
- Use `defer()` to progressively load heavy data to improve Time-to-Interactive.
- For SEO-critical content, render on server or fetch critical content with loaders synchronously (avoid deferring everything).

---

## ⚠️ Common gotchas & troubleshooting

- **"Cannot destructure property 'basename' of React.useContext(...) as it is null"** — means a `Link` or other react-router hooks/components are used outside of a router. Ensure your `<Navbar />` (with `<Link/>`) is inside the route tree by making it part of a layout route (`element: <Layout/>`) used by `createBrowserRouter`.
- **RouterProvider has no children** — remember: `<RouterProvider router={router} />` renders the routes. You don't pass children to RouterProvider.
- **Loader throws & blank page** — add `errorElement` to see loader errors; otherwise the console may show network errors.
- **Prefetch too aggressive** — `prefetch="render"` fetches immediately; prefer `intent` to avoid wasted bandwidth.
- **Using `useEffect` + `useLoaderData()`** — unnecessary. `useLoaderData()` gives you ready data. Using `useEffect` to call same API duplicates network calls unless you design it intentionally.
- **Testing navigation states** — use `useNavigation()` to inspect `state` for `loading`, `submitting`.

---

## 🧾 Appendix: Useful Hooks & utilities

- `useLoaderData()` — get loader result.
- `useActionData()` — get last action result for the route.
- `useRouteLoaderData(routeId)` — access loader data from any route id.
- `useFetcher()` — perform fetch/action without navigation.
- `useNavigation()` — inspect navigation/submission state.
- `useMatch()` / `useParams()` — route matching & params.
- `Form` (react-router) — declarative form that triggers route action.
- `redirect()` — helper for actions to redirect.
- `defer()` — return mixture of data and promises.
- `Await` — consume deferred promises in UI.
- `createMemoryRouter` — in-memory router for tests.

---

## 📚 Further reading & references

- Official docs: https://reactrouter.com/en/main
- Migration guide: https://reactrouter.com/en/main/guides/migrating-to-v7
- Data APIs guide: https://reactrouter.com/en/main/start/data-routing

---

## ✅ Final Tips (TL;DR)

- Prefer route loaders for page data, actions for forms/mutations.
- Use layout routes with `<Outlet/>` for shared UI like Navbar.
- Use `prefetch="intent"` to make navigation feel instant.
- Keep `useState`/`useEffect` for purely local UI logic — not for primary page data when using loaders.
- Test loaders/actions directly — they're plain functions.

---

_This README was generated for educational purposes — adapt examples to your project's API shapes, error conventions, and authentication flows._
