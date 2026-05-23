import {
  createHashHistory,
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
  Link,
} from '@tanstack/react-router'

const rootRoute = createRootRoute({
  component: () => (
    <div>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', gap: '1rem' }}>
        <Link to="/" activeProps={{ style: { fontWeight: 'bold' } }}>
          Home
        </Link>
        <Link to="/about" activeProps={{ style: { fontWeight: 'bold' } }}>
          About
        </Link>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <div>
      <h1>Home</h1>
      <p>Welcome to the SPA. Navigation uses <code>/#/</code> hash routing for GitHub Pages compatibility.</p>
    </div>
  ),
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: () => (
    <div>
      <h1>About</h1>
      <p>This is a TanStack Router + Vite SPA deployed on GitHub Pages.</p>
    </div>
  ),
})

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute])

export const router = createRouter({
  routeTree,
  history: createHashHistory(),
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
