import React from 'react'
import { css } from '../../lib/emotion'
import styled from '../../lib/react-emotion'
import Img from '../../lib/Image'
import FaIcon from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/fontawesome-free-solid'
import Remarkable from 'remarkable'
// import loadJS from 'load-js'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// import 'mapbox-gl/mapb-x'

import logoFlame from '../../assets/white-logo-flame.svg'
import bg from '../../assets/contact-fill.svg'
import scenery from '../../assets/contact-scenery.svg'
import { blacklistProps } from '../../lib/propRemoval'
import Mapbox from '../../elements/Mapbox'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
`

const TopRow = styled.div`
  height: 4rem;
  background: #656565;
  display: flex;
  overflow: auto;
  box-sizing: border-box;
`

const TopRowInner = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 1.5rem;
  box-sizing: border-box;
  flex: none;
`

const SectionTitle = styled.h2`
  color: white;
  padding-right: 1.5rem;
  margin-right: 1rem;
  border-right: 2px solid white;
  height: 70%;
  display: flex;
  align-items: center;
  font-size: 1.3rem;
`

const LocationOptions = styled.div`
  display: flex;
  align-items: center;

  ${'' /* @media (max-width: 790px) {
    flex-direction: column;
  } */};
`

const LocationOption = styled.div`
  background: white;
  border-radius: 3px;
  margin-right: 1rem;
  padding: 0.3rem;
  color: #c17073;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  flex: none;
`

const OptionDot = styled(blacklistProps(['isActive'], FaIcon))`
  margin-right: 1ch;
  margin-left: 0.5ch;
  color: ${(p) => (p.isActive ? '#5aa3e8' : '#c1c1c1')};
`
const LowerRow = styled.div`
  display: flex;
  height: 30rem;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`

// Contains a bunch of markdown, hence the child styles
const DirectionsContainer = styled.div`
  flex: 1;
  background: #444;
  color: white;

  & h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  & strong {
    font-weight: bold;
  }

  & em {
    font-style: italic;
  }
`

const DirectionsInner = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1.2rem 4.5rem;
  box-sizing: border-box;

  & h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  & strong {
    font-weight: bold;
  }

  & em {
    font-style: italic;
  }
`

const mapContainer = css`
  flex: 1;
  position: relative;
`

const map = css`
  flex: 1;
  ${'' /* height: 100%;

  width: 100%; */};
`

class Directions extends React.Component {
  constructor(props) {
    super()
    this.state = {
      currentLocation: props.strings.locations[0].name,
      mapComponent: null,
    }
  }
  // componentDidMount() {
  // if (!this.state.mapComponent) {
  // loadJS('https://bundle.run/react-mapbox-gl@3.8.0').then(() => {
  // loadJS('https://api.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.js').then(
  // () => {
  // loadJS('/react-mapbox-gl.js').then(() => {
  // this.setState({
  // mapComponent: ReactMapboxGl({
  //   accessToken:
  //     'pk.eyJ1IjoiZ3JlZW5mbHkiLCJhIjoiZjNlNWVmZDM1ODljZGRiZmVmNWZhYmFmNDk5YTA5YzQifQ.yNJKHV3yNnwcV5pNBTIjtA',
  // }),
  // })
  // },
  // )
  // }
  // }
  mapMove = (map, event) => {
    // console.log(map.getCenter(), map.getZoom())
  }
  attachMap = (ref, foo, bar) => {
    if (ref) {
      console.log('ref', ref)
      mapboxgl.accessToken =
        'pk.eyJ1IjoiZ3JlZW5mbHkiLCJhIjoiZjNlNWVmZDM1ODljZGRiZmVmNWZhYmFmNDk5YTA5YzQifQ.yNJKHV3yNnwcV5pNBTIjtA'
      const map = (this.map = new mapboxgl.Map({
        container: ref,
        style: 'mapbox://styles/mapbox/streets-v10',
      }))
    }
  }
  render() {
    const { strings } = this.props

    const loc = strings.locations.find(
      (l) => l.name === this.state.currentLocation,
    )

    const md = new Remarkable()
    const renderedDirections = { __html: md.render(loc.directionsBody) }

    const icons = {
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: strings.locations.map((location) => {
            return {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [
                  location.coordinates.lng,
                  location.coordinates.lat,
                ],
              },
              properties: {
                name: location.mapName,
              },
            }
          }),
        },
      },
      layout: {
        'icon-image': 'airfield-15',
        'text-field': '{name}',
        'text-offset': [0, 0.6],
        'text-anchor': 'top',
      },
    }

    return (
      <Container>
        <TopRow>
          <TopRowInner>
            <SectionTitle>{strings.directionsHeading}</SectionTitle>
            {/* <LocationOptions> */}
            {strings.locations.map((location) => (
              <LocationOption
                key={location.name}
                onClick={() =>
                  this.setState({ currentLocation: location.name })
                }
              >
                <OptionDot
                  isActive={location.name === this.state.currentLocation}
                  icon={faCircle}
                />
                {location.name}
              </LocationOption>
            ))}
            {/* </LocationOptions> */}
          </TopRowInner>
        </TopRow>
        <LowerRow>
          <DirectionsContainer>
            <DirectionsInner dangerouslySetInnerHTML={renderedDirections} />
          </DirectionsContainer>
          <Mapbox
            className={map}
            center={[loc.coordinates]}
            zoom={[loc.zoom]}
            style="mapbox://styles/mapbox/streets-v10"
            layers={[icons]}
          />
        </LowerRow>
      </Container>
    )
  }
}

export default Directions

export const pageQuery = graphql`
  fragment DirectionsStrings on fields_2 {
    directionsHeading
    locations {
      name
      mapName
      directionsBody
      coordinates {
        lng
        lat
      }
      zoom
    }
  }
`
