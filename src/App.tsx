import { useState } from 'react'
import { AppShell } from './components/layout/AppShell'
import { MapCanvas } from './components/map/MapCanvas'
import { FloatingActions } from './components/map/FloatingActions'
import { PointOfInterestForm } from './components/panel/PointOfInterestForm'
import { BilanForm } from './components/panel/BilanForm'
import { usePoints } from './hooks/usePoints'
import { useBilans } from './hooks/useBilans'
import type { BilanRole } from './types/point'

type ActivePanel = 'point-of-interest' | 'bilan' | null

function App() {
  const { points, addPoint } = usePoints()
  const { addBilan } = useBilans()

  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const [placementMode, setPlacementMode] = useState(false)
  const [pendingLocation, setPendingLocation] = useState<{ lng: number; lat: number } | null>(null)

  const closePanel = () => {
    setActivePanel(null)
    setPlacementMode(false)
    setPendingLocation(null)
  }

  const handleNewPointOfInterest = () => {
    setActivePanel('point-of-interest')
    setPendingLocation(null)
    setPlacementMode(true)
  }

  const handleNewBilan = () => {
    setActivePanel('bilan')
    setPlacementMode(false)
  }

  const handleMapClick = (lngLat: { lng: number; lat: number }) => {
    if (activePanel !== 'point-of-interest') return
    setPendingLocation(lngLat)
    setPlacementMode(false)
  }

  const handleSavePointOfInterest = ({ label, comment }: { label: string; comment: string }) => {
    if (!pendingLocation) return
    addPoint({ ...pendingLocation, label, comment })
    closePanel()
  }

  const handleSaveBilan = (role: BilanRole) => {
    addBilan(role)
    closePanel()
  }

  return (
    <AppShell>
      <MapCanvas
        points={points}
        pendingLocation={pendingLocation}
        placementMode={placementMode}
        onMapClick={handleMapClick}
      />
      <FloatingActions
        placementMode={placementMode}
        onNewPointOfInterest={handleNewPointOfInterest}
        onNewBilan={handleNewBilan}
      />
      {activePanel === 'point-of-interest' && (
        <PointOfInterestForm pendingLocation={pendingLocation} onSave={handleSavePointOfInterest} onClose={closePanel} />
      )}
      {activePanel === 'bilan' && <BilanForm onSave={handleSaveBilan} onClose={closePanel} />}
    </AppShell>
  )
}

export default App
