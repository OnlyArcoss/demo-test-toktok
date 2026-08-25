import { Box } from '@mui/material'
import type { ReactNode } from 'react'
import { Sidebar, SIDEBAR_WIDTH } from './Sidebar'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          position: 'relative',
          flex: 1,
          overflow: 'hidden',
          ml: `calc(${SIDEBAR_WIDTH}px + 2rem)`,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
