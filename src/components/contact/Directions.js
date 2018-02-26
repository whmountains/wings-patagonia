import React from 'react'
import { css } from 'emotion'
import styled from 'react-emotion'
import Img from 'gatsby-image'
import FaIcon from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/fontawesome-free-solid'
import Remarkable from 'remarkable'
import loadJS from 'load-js'

// import 'mapbox-gl/mapb-x'

import logoFlame from '../../assets/white-logo-flame.svg'
import bg from '../../assets/contact-fill.svg'
import scenery from '../../assets/contact-scenery.svg'
import { blacklistProps } from '../../lib/propRemoval'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
`

const TopRow = styled.div`
  display: flex;

  height: 4rem;
  background: #656565;
  align-items: center;
`

const SectionTitle = styled.h2`
  color: white;
  padding: 0 1.5rem;
  margin-right: 1rem;
  border-right: 2px solid white;
  height: 70%;
  display: flex;
  align-items: center;
  font-size: 1.3rem;
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
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1.2rem;

  & h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`

const MapContainer = styled.div`
  flex: 1;
  position: relative;
`

const map = css`
  height: 100%;
  width: 100%;
`

class Directions extends React.Component {
  constructor(props) {
    super()
    this.state = {
      currentLocation: props.strings.locations[0].name,
      mapComponent: null,
    }
  }
  componentDidMount() {
    if (!this.state.mapComponent) {
      // loadJS('https://bundle.run/react-mapbox-gl@3.8.0').then(() => {

      loadJS('/react-mapbox-gl.js').then(() => {
        this.setState({
          mapComponent: window.ReactMapboxGl({
            accessToken:
              'pk.eyJ1IjoiZ3JlZW5mbHkiLCJhIjoiZjNlNWVmZDM1ODljZGRiZmVmNWZhYmFmNDk5YTA5YzQifQ.yNJKHV3yNnwcV5pNBTIjtA',
          }),
        })
      })
    }
  }
  mapMove = (map, event) => {
    // console.log(map.getCenter(), map.getZoom())
  }
  render() {
    const { strings } = this.props

    const Map = this.state.mapComponent
    let Layer, Feature
    if (Map) {
      Layer = ReactMapboxGl.Layer
      Feature = ReactMapboxGl.Feature
    }

    const loc = strings.locations.find(
      (l) => l.name === this.state.currentLocation,
    )

    const md = new Remarkable()
    const renderedDirections = { __html: md.render(loc.directionsBody) }

    return (
      <Container>
        <TopRow>
          <SectionTitle>{strings.directionsHeading}</SectionTitle>
          {strings.locations.map((location) => (
            <LocationOption
              key={location.name}
              onClick={() => this.setState({ currentLocation: location.name })}
            >
              <OptionDot
                isActive={location.name === this.state.currentLocation}
                icon={faCircle}
              />
              {location.name}
            </LocationOption>
          ))}
        </TopRow>
        <LowerRow>
          <DirectionsContainer dangerouslySetInnerHTML={renderedDirections} />
          <MapContainer>
            {Map && (
              <Map
                onZoom={this.mapMove}
                className={map}
                center={loc.coordinates}
                zoom={[loc.zoom]}
                onMoveEnd={this.mapMove}
                style={'mapbox://styles/mapbox/outdoors-v10'}
              >
                <Layer
                  type="symbol"
                  id="marker"
                  layout={{
                    'icon-image': 'airfield-15',
                    'text-field': '{name}',
                    'text-offset': [0, 0.6],
                    'text-anchor': 'top',
                  }}
                >
                  {strings.locations.map((location) => {
                    return (
                      <Feature
                        key={location.name}
                        properties={{ name: location.mapName }}
                        coordinates={[
                          location.coordinates.lng,
                          location.coordinates.lat,
                        ]}
                      />
                    )
                  })}
                </Layer>
              </Map>
            )}
          </MapContainer>
        </LowerRow>
      </Container>
    )
  }
}

export default Directions

export const pageQuery = graphql`
  fragment DirectionsStrings on frontmatter_2 {
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
