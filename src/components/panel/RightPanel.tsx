import { Box, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'

interface RightPanelProps {
  title: string
  children: ReactNode
  footer: ReactNode
}

export const RIGHT_PANEL_WIDTH = 340

export function RightPanel({ title, children, footer }: RightPanelProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 1000,
        top: '1rem',
        right: '1rem',
        height: 'calc(100vh - 2rem)',
        width: RIGHT_PANEL_WIDTH,
        bgcolor: 'background.paper',
        borderRadius: 0.5,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 6,
      }}
    >
      <Stack sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6">{title}</Typography>
      </Stack>

      <Box sx={{ p: 2, flex: 1, overflowY: 'auto' }}>{children}</Box>

      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>{footer}</Box>
    </Box>
  )
}
