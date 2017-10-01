require('prismjs/themes/prism-tomorrow.css')

import React from 'react'
import Link from 'gatsby-link'
import { withRouter } from 'react-router'
import { StyleRoot } from 'radium'
import { Container } from 'react-responsive-grid'

import { rhythm, scale } from '../utils/typography'
import BlogTitle from '../components/BlogTitle'
import Fade from '../components/Fade'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <StyleRoot>
        <Fade inAfter={200}>
          <Container
            style={{
              maxWidth: rhythm(24),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }}
          >
            <BlogTitle
              isRoot={location.pathname === rootPath}
            />
            <hr />
            {children()}
          </Container>
        </Fade>
      </StyleRoot>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default withRouter(Template)
