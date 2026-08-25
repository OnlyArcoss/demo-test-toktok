import { Alert, Button } from '@mui/material'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined'

interface FloatingActionsProps {
  placementMode: boolean
  onNewPointOfInterest: () => void
  onNewBilan: () => void
}

export function FloatingActions({ placementMode, onNewPointOfInterest, onNewBilan }: FloatingActionsProps) {
  return (
    <>
      {placementMode && (
        <Alert
          severity="info"
          sx={{ position: 'absolute', zIndex: 10, top: 16, left: '50%', transform: 'translateX(-50%)', boxShadow: 3 }}
        >
          Cliquez sur la carte pour placer le point
        </Alert>
      )}

      <Button
        variant="contained"
        color="inherit"
        startIcon={<AddLocationAltOutlinedIcon />}
        onClick={onNewPointOfInterest}
        sx={{
          position: 'absolute',
          zIndex: 10,
          bottom: 24,
          left: 24,
          bgcolor: 'background.paper',
          borderRadius: 999,
          px: 2.5,
          boxShadow: 3,
          '&:hover': { bgcolor: 'grey.100' },
        }}
      >
        Nouveau point d'intérêt
      </Button>

      <Button
        variant="contained"
        color="primary"
        startIcon={<MeetingRoomOutlinedIcon />}
        onClick={onNewBilan}
        sx={{ position: 'absolute', zIndex: 10, bottom: 24, right: 24, borderRadius: 999, px: 2.5, boxShadow: 3 }}
      >
        Nouveau porte à porte
      </Button>
    </>
  )
}
