import { Box } from '@mui/material'
import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <Sidebar />
      <Box component="main" sx={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }}>
        {children}
      </Box>
    </Box>
  )
}
