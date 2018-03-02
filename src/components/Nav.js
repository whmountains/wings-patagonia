import React from 'react'
import styled, { css, cx } from 'react-emotion'
import Link from 'gatsby-link'
import FaIcon from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/fontawesome-free-solid'
import { Manager, Target, Popper, Arrow } from 'react-popper'

import logoFlame from '../assets/white-logo-flame.svg'

const Navbar = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: ${(p) =>
    p.noScrim
      ? 'transparent'
      : 'linear-gradient(to top, transparent, rgba(76, 93, 111, 0.8))'};
  display: flex;
  height: 4rem;
  padding: 0 1.3rem;
  box-sizing: border-box;
  align-items: center;
`

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
  height: 3rem;
  list-style: none;
  font-weight: 300;
  margin-left: auto;
`

const Logo = styled.img`
  flex: none;
  height: 3rem;
`

const NavItem = styled.li`
  margin-left: 1rem;
  color: ${(p) => p.color};
  cursor: pointer;
`

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &.active {
    text-decoration: underline;
    ${'' /* font-weight: bold; */};
  }

  &:hover {
    text-decoration: underline;
  }
`

const dropdown = css`
  margin-top: -0.2rem;
  transition: 0.1s opacity ease-in;

  pointer-events: none;
  opacity: 0;

  ${NavItem}:hover & {
    opacity: 1;
    pointer-events: all;
  }

  &.open {
    opacity: 1;
    pointer-events: all;
  }
`
const DropdownContents = styled.div`
  margin-top: 1rem;
  padding: 0.8rem;
  border-radius: 0.5rem;
  box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1),
    0 15px 35px rgba(50, 50, 93, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);
  background: white;
  color: #595959;
`

const dropdownArrow = css`
  width: 1rem;
  height: 1rem;
  position: absolute;
  border: 0.5rem solid transparent;
  border-bottom-color: white;
  box-sizing: border-box;
`

const caret = css`
  margin-left: 0.6ch;
  transition: 0.1s transform ease-in;

  &.rotate {
    transform: rotate(180deg);
  }
`

const DropdownLinks = styled.ul`
  list-style-position: inside;
  display: flex;
  flex-direction: column;
`

const DropdownLink = styled.li``

const eventChomper = (e) => {
  console.log('chomped', e)
  e.stopPropagation()
}

class Nav extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      dropdownOpen: false,
    }
  }
  render() {
    return (
      <Manager>
        <Navbar
          color={this.props.color || 'white'}
          noScrim={this.props.noScrim}
        >
          {!this.props.noLogo && (
            <Link to="/">
              <Logo src={logoFlame} />
            </Link>
          )}
          <NavItems>
            <NavItem>
              <NavLink exact activeClassName="active" to="/">
                Home
              </NavLink>
            </NavItem>

            <NavItem
              onClick={() =>
                this.setState({ dropdownOpen: !this.state.dropdownOpen })
              }
            >
              <Target>
                Flights
                <FaIcon
                  icon={faCaretDown}
                  className={cx(caret, { rotate: this.state.dropdownOpen })}
                />
              </Target>
              <Popper
                onClick={eventChomper}
                placement="bottom"
                className={cx(dropdown, { open: this.state.dropdownOpen })}
              >
                <Arrow className={dropdownArrow} />
                <DropdownContents>
                  <DropdownLinks>
                    <DropdownLink>
                      <NavLink activeClassName="active" to="/flights/scenic">
                        Scenic Tours
                      </NavLink>
                    </DropdownLink>
                    <DropdownLink>
                      <NavLink activeClassName="active" to="/flights/custom">
                        Custom Flights
                      </NavLink>
                    </DropdownLink>
                    <DropdownLink>
                      <NavLink
                        activeClassName="active"
                        to="/flights/commercial"
                      >
                        Commercial Solutions
                      </NavLink>
                    </DropdownLink>
                  </DropdownLinks>
                </DropdownContents>
              </Popper>
            </NavItem>

            <NavItem>
              <NavLink to="/contact" activeClassName="active">
                Contact Us
              </NavLink>
            </NavItem>
          </NavItems>
        </Navbar>
      </Manager>
    )
  }
}

export default Nav
