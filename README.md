# ⚛️ React Router Mastery

Welcome to **React Router Mastery** — a complete learning project that explores everything from **React Router v6 basics** to **React Router v7 data APIs**, including loaders, actions, and nested routes.

This repository is built for those who want to **understand routing deeply in React**, covering practical code examples and clear explanations. Learn, practice, and master React Router v6 and modern React Router v7 with real-world examples.

### This Repo is a sub-part of my main repo [Saadnadeem07/react-basics-to-pro](https://github.com/Saadnadeem07/react-basics-to-pro)

---

## 📚 Topics Covered

| Category                   | Concepts                                                                         |
| -------------------------- | -------------------------------------------------------------------------------- |
| **v6 Fundamentals**        | BrowserRouter, Routes, Route, Link, NavLink, useParams, useLocation, useNavigate |
| **Navigation**             | Dynamic navigation bars, active links, and parameterized routes                  |
| **Nested Routing**         | Parent-child routes with `<Outlet />`, dashboards, and sub-pages                 |
| **React Router Hooks**     | `useParams`, `useLocation`, `useNavigate`                                        |
| **Data Fetching (v7)**     | Using `loader` and `useLoaderData` instead of `useEffect`                        |
| **Prefetching**            | Optimizing data fetching using React Router’s built-in APIs                      |
| **Migration from v6 → v7** | Full comparison and conversion guide                                             |
| **Error Handling**         | Custom error elements and error boundaries                                       |
| **Real Example**           | Fetching GitHub user data with a loader (`GithubProfile.jsx`)                    |

---

---

## 🚀 Learning Roadmap

### 🧭 React Router v6

1. Set up `BrowserRouter`, `Routes`, and `Route`.
2. Use `Link` and `NavLink` for navigation.
3. Implement dynamic routes with `useParams`.
4. Add nested routing using `<Outlet />`.
5. Use hooks like `useLocation` and `useNavigate`.

### ⚙️ React Router v7

1. Switch from `BrowserRouter` → `createBrowserRouter` and `RouterProvider`.
2. Define routes as a **route configuration object**.
3. Add **loaders** to fetch data before rendering.
4. Use `useLoaderData()` to access prefetched data.
5. Replace `useEffect` + `useState` patterns for data loading.
6. Handle errors via `errorElement`.

---

# 🧩 Why v7 is a Big Step Forward

| Feature                               | v6                | v7                      |
| ------------------------------------- | ----------------- | ----------------------- |
| **Routing setup**                     | `<BrowserRouter>` | `createBrowserRouter()` |
| **Data fetching**                     | `useEffect()`     | `loader()`              |
| **Error handling**                    | Manual try/catch  | `errorElement`          |
| **Preloading**                        | Manual fetch      | Built-in prefetch       |
| **File-based route support (future)** | ❌                | ✅ Planned              |

---

## 📖 Documentation

For a deep-dive guide explaining **v6 → v7 migration, loaders, and examples**, see:  
📘 [`docs/React_Router_v6_to_v7_Guide.md`](./docs/React_Router_v6_to_v7_Guide.md)

---

## 🧑‍💻 Author

**Muhammad Saad Nadeem**  
📧 saadnadeem5509@gmail.com
