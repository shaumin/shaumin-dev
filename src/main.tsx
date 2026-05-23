import '@mantine/core/styles.css'
import './mantine-theme.css'
import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { RouterProvider } from '@tanstack/react-router'
import { shadcnCssVariableResolver } from './cssVariableResolver'
import { shadcnTheme } from './theme'
import { router } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider
      theme={shadcnTheme}
      cssVariablesResolver={shadcnCssVariableResolver}
      defaultColorScheme="auto"
    >
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
)
