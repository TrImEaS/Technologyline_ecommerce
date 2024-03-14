import React from "react"
import { Map } from "pigeon-maps"
import { osm } from 'pigeon-maps/providers'

export default function GoogleMap({longitud, latitud}) {
  return (
    <Map
    provider={osm}
    height={200}
    defaultCenter={[longitud, latitud]}
    defaultZoom={11}
  />
  )
}