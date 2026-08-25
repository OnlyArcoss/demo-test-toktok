import { useEffect, useRef } from 'react'
import { Map as MapLibreMap, Marker, NavigationControl, Popup, type MapMouseEvent } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Box } from '@mui/material'
import type { PointOfInterest } from '../../types/point'

const MAP_STYLE = 'https://tiles.openfreemap.org/styles/liberty'
const DEFAULT_CENTER: [number, number] = [2.3522, 48.8566]
const DEFAULT_ZOOM = 5

interface MapCanvasProps {
  points: PointOfInterest[]
  pendingLocation: { lng: number; lat: number } | null
  placementMode: boolean
  onMapClick: (lngLat: { lng: number; lat: number }) => void
}

export function MapCanvas({ points, pendingLocation, placementMode, onMapClick }: MapCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const markersRef = useRef<globalThis.Map<string, Marker>>(new globalThis.Map())
  const pendingMarkerRef = useRef<Marker | null>(null)
  const stateRef = useRef({ placementMode, onMapClick })

  useEffect(() => {
    stateRef.current = { placementMode, onMapClick }
  }, [placementMode, onMapClick])

  // Init map once
  useEffect(() => {
    if (!containerRef.current) return

    const map = new MapLibreMap({
      container: containerRef.current,
      style: MAP_STYLE,
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
    })
    map.addControl(new NavigationControl(), 'top-right')

    map.on('click', (e: MapMouseEvent) => {
      if (!stateRef.current.placementMode) return
      stateRef.current.onMapClick({ lng: e.lngLat.lng, lat: e.lngLat.lat })
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  // Cursor feedback while in placement mode
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    map.getCanvas().style.cursor = placementMode ? 'crosshair' : ''
  }, [placementMode])

  // Sync saved points as markers
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const currentIds = new Set(points.map((p) => p.id))
    for (const [id, marker] of markersRef.current) {
      if (!currentIds.has(id)) {
        marker.remove()
        markersRef.current.delete(id)
      }
    }

    for (const point of points) {
      const existing = markersRef.current.get(point.id)
      if (existing) {
        existing.setLngLat([point.lng, point.lat])
        continue
      }
      const el = document.createElement('div')
      el.style.width = '16px'
      el.style.height = '16px'
      el.style.borderRadius = '50%'
      el.style.background = '#1976d2'
      el.style.border = '2px solid white'
      el.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.2)'

      const marker = new Marker({ element: el })
        .setLngLat([point.lng, point.lat])
        .setPopup(new Popup({ offset: 12 }).setText(point.label))
        .addTo(map)
      markersRef.current.set(point.id, marker)
    }
  }, [points])

  // Pending marker while filling the form, before it's saved
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    if (!pendingLocation) {
      pendingMarkerRef.current?.remove()
      pendingMarkerRef.current = null
      return
    }

    if (pendingMarkerRef.current) {
      pendingMarkerRef.current.setLngLat([pendingLocation.lng, pendingLocation.lat])
      return
    }

    const el = document.createElement('div')
    el.style.width = '18px'
    el.style.height = '18px'
    el.style.borderRadius = '50%'
    el.style.background = '#f57c00'
    el.style.border = '2px solid white'
    el.style.boxShadow = '0 0 0 4px rgba(245,124,0,0.3)'

    pendingMarkerRef.current = new Marker({ element: el })
      .setLngLat([pendingLocation.lng, pendingLocation.lat])
      .addTo(map)
  }, [pendingLocation])

  return <Box ref={containerRef} sx={{ position: 'absolute', inset: 0 }} />
}
