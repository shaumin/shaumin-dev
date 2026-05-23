import { createHashHistory, createRoute, createRootRoute, createRouter } from '@tanstack/react-router'
import { AppLayout } from './components/AppLayout'
import { EssaysPage } from './pages/EssaysPage'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { RSSPage } from './pages/RSSPage'

const rootRoute = createRootRoute({ component: AppLayout })

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage })
const projectsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/projects', component: ProjectsPage })
const essaysRoute = createRoute({ getParentRoute: () => rootRoute, path: '/essays', component: EssaysPage })
const rssRoute = createRoute({ getParentRoute: () => rootRoute, path: '/rss', component: RSSPage })

const routeTree = rootRoute.addChildren([indexRoute, projectsRoute, essaysRoute, rssRoute])

export const router = createRouter({
  routeTree,
  history: createHashHistory(),
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
