import { useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { RightPanel } from './RightPanel'
import type { BilanRole } from '../../types/point'

interface BilanFormProps {
  onSave: (role: BilanRole) => void
  onClose: () => void
}

export function BilanForm({ onSave, onClose }: BilanFormProps) {
  const [role, setRole] = useState<BilanRole | ''>('')

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as BilanRole)
  }

  return (
    <RightPanel
      title="Mon bilan porte à porte"
      footer={
        <Stack direction="row" spacing={1}>
          <Button variant="contained" fullWidth disabled={!role} onClick={() => role && onSave(role)}>
            Envoyer mon bilan
          </Button>
          <Button variant="outlined" fullWidth onClick={onClose}>
            Quitter
          </Button>
        </Stack>
      }
    >
      <Stack spacing={1}>
        <Typography variant="subtitle2" color="primary">
          Qui ?
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel id="bilan-role-label">Votre rôle</InputLabel>
          <Select labelId="bilan-role-label" label="Votre rôle" value={role} onChange={handleChange}>
            <MenuItem value="individuelle">Initiative individuelle</MenuItem>
            <MenuItem value="groupe">Au nom d'un groupe</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </RightPanel>
  )
}
