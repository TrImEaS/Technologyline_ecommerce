import React from "react"
import { Map, Marker } from "pigeon-maps"
import { osm } from 'pigeon-maps/providers'

export default function GoogleMap({longitud, latitud}) {
  return (
    <Map
      provider={osm}
      height={350}
      defaultCenter={[longitud, latitud]}
      defaultZoom={16}
    >
    <Marker width={50} anchor={[longitud, latitud]}/>
  </Map>
  )
}