import React from 'react'
import { css, cx } from '../lib/emotion'

import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// access token
mapboxgl.accessToken =
  'pk.eyJ1IjoiZ3JlZW5mbHkiLCJhIjoiZjNlNWVmZDM1ODljZGRiZmVmNWZhYmFmNDk5YTA5YzQifQ.yNJKHV3yNnwcV5pNBTIjtA'

const mapContainer = css`
  position: relative;
`

class Map extends React.Component {
  constructor(props) {
    super()
    this.state = {}
  }
  attachMap = (ref, foo, bar) => {
    if (ref) {
      // save the ref for later
      this.mapContainer = ref

      // init the map
      const map = (this.map = new mapboxgl.Map({
        container: ref,
        style: 'mapbox://styles/mapbox/streets-v10',
        center: this.props.center[0],
        zoom: this.props.zoom[0],
      }))

      map.on('load', () => {
        if (this.props.layers) {
          this.props.layers.forEach((layer) => {
            map.addLayer(layer)
          })
        }
      })

      // listen for move events (useful for figuring out where to position the map)
      // map.on('move', () => {
      //   console.log(map.getCenter(), map.getZoom())
      // })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.center !== nextProps.center ||
      this.props.zoom !== nextProps.zoom
    ) {
      this.map.flyTo({
        center: nextProps.center[0],
        zoom: nextProps.zoom[0],
      })
    }

    if (this.props.style !== nextProps.style) {
      this.map.setStyle(nextProps.style)
    }
  }
  render() {
    return (
      <div
        className={cx(mapContainer, this.props.className)}
        ref={this.attachMap}
      />
    )
  }
}

export default Map
