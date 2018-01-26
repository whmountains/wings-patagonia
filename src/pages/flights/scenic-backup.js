import React from 'react'

import Footer from '../../components/Footer'
import '../../styles/freelancer.scss'

const ScenicFlights = ({ data }) => {
  return (
    <div className="use-freelancer-css">
      <div className="header-section section-wrapper section">
        <nav className="header-navigation">
          <div className="logo-wrapper">
            <img src="img/logo.png" alt="Logo Image" />
          </div>

          <div className="navigation-content">
            <a href="#">Home</a>
            <a href="#" className="dropdown-trigger">
              Flights <span className="arrow-down" />
            </a>
            <a href="#">Contact Us</a>
            <div className="dropdown-menu">
              <ul>
                <li>
                  <a href="#">Scenic Flights</a>
                </li>
                <li>
                  <a href="custom-flights.html">Custom Flights</a>
                </li>
                <li>
                  <a href="#">Commercial Solutions</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="header-section-content">
          <h1 className="main-title">Scenic Flights</h1>
          <h3 className="secondary-title">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
            nemo minima consectetur.
          </h3>
        </div>
      </div>

      <div className="description-section section">
        <div className="half-image" />
        <div className="description-section-content">
          <div className="description-section-text">
            <h2>Experience The Incredible</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Dignissimos, nemo! Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quia, officiis.
            </p>
          </div>

          <ul className="vertical-dot-nav">
            <li className="dot active" />
            <li className="dot" />
            <li className="dot" />
            <li className="dot" />
            <li className="dot" />
          </ul>
        </div>
      </div>

      <div className="sign-up-section section">
        <div className="sign-up-section-content">
          <div className="sign-up-section-text">
            <h2>Where do I sign up?</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum
              veritatis sunt, fugit perferendis. Dignissimos, quis! Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Tenetur, aliquid?
            </p>
          </div>
          <div className="sign-up-section-buttons">
            <input type="button" value="Shoot Us An Email" />
            <input type="button" value="Give us a Call" />
          </div>
        </div>
      </div>

      <div className="images-section section">
        <div className="images">
          <div className="image-element" />
          <div className="image-element" />
          <div className="image-element" />
          <div className="image-element" />
          <div className="image-element" />
          <div className="image-element" />
          <div className="image-element" />
          <div className="image-element" />
        </div>
      </div>

      <div className="questions-section section">
        <div className="questions-content">
          <h2>Frequently Asked Questions</h2>

          <div className="question-block">
            <b>Q: How long are the flights?</b>
            <p>A: Flights typically last around one hour</p>
          </div>

          <div className="question-block">
            <b>Q: Do I get free snacks?</b>
            <p>
              A: Spicy Cheetos are the only snacks allowed on the plane, all
              other snacks will be confiscated
            </p>
          </div>
        </div>
      </div>

      <Footer strings={data.globalStrings.frontmatter} />
    </div>
  )
}

export default ScenicFlights

// export const pageQuery = graphql`
//   query ScenicFlightsQuery {
//     globalStrings: markdownRemark(fileAbsolutePath: { regex: "/global.md$/" }) {
//       frontmatter {
//         ...FooterQuery
//       }
//     }
//   }
// `
