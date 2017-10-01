import * as React from 'react'
import Radium from 'radium'
import Link from 'gatsby-link'

import { rhythm, scale } from '../utils/typography'
import { cutePurple, white } from '../utils/colors'
import media from '../utils/media'

function BlogTitle({isRoot}) {
  const titleSize = isRoot
    ? styles.titleBig
    : styles.titleSmall;

  return (
    <h1 style={[styles.title, titleSize]}>
      <Link
        style={styles.link}
        to={'/'}
      >
        <span style={styles.mal}>
          Mal
        </span>
        Types
        <span style={styles.exclamation}>
          !
        </span>
      </Link>
    </h1>
  )
}

const styles = {
  mal: {
    backgroundColor: cutePurple.hex(),
    color: white.hex(),
    borderRadius: rhythm(0.25),
    padding: rhythm(0.25),
    marginRight: rhythm(0.25),
  },

  exclamation: {
    color: cutePurple.hex(),
  },

  link: {
    textDecoration: 'none',
    color: 'inherit',
  },

  title: {
    marginTop: 0,
    [media.smallScreen]: {
      textAlign: 'center',
    },
  },

  titleSmall: {
    ...scale(1),
    marginBottom: rhythm(),
  },

  titleBig: {
    ...scale(1.5),
    marginBottom: rhythm(2),
  }
}

export default Radium(BlogTitle)
