import { useState } from 'react'
import { Alert, Button, Stack, TextField, Typography } from '@mui/material'
import { RightPanel } from './RightPanel'

interface PointOfInterestFormProps {
  pendingLocation: { lng: number; lat: number } | null
  onSave: (data: { label: string; comment: string }) => void
  onClose: () => void
}

export function PointOfInterestForm({ pendingLocation, onSave, onClose }: PointOfInterestFormProps) {
  const [label, setLabel] = useState('')
  const [comment, setComment] = useState('')
  const canSave = label.trim().length > 0 && pendingLocation !== null

  return (
    <RightPanel
      title="Nouveau point d'intérêt"
      footer={
        <Stack direction="row" spacing={1}>
          <Button variant="contained" fullWidth disabled={!canSave} onClick={() => onSave({ label, comment })}>
            Enregistrer
          </Button>
          <Button variant="outlined" fullWidth onClick={onClose}>
            Annuler
          </Button>
        </Stack>
      }
    >
      <Stack spacing={2}>
        {!pendingLocation ? (
          <Alert severity="info">Cliquez sur la carte pour placer le point.</Alert>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Position : {pendingLocation.lat.toFixed(5)}, {pendingLocation.lng.toFixed(5)}
          </Typography>
        )}
        <TextField
          label="Titre"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Commentaire"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          multiline
          minRows={3}
        />
      </Stack>
    </RightPanel>
  )
}
