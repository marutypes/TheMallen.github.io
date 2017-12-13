import React from 'react'
import Radium from 'radium'

import SocialMedia from './SocialMedia'
import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'
import media from '../utils/media'

class Bio extends React.Component {
  render() {
    return (
      <div style={[styles.container]}>
        <img src={profilePic} alt={`Mallory Allen`} style={styles.profilePic} />
        <div style={styles.blurb}>
          <p style={styles.blurbIntro}>
            <strong>Hi there!</strong>
          </p>
          <p>
            I'm <strong>Mallory Allen</strong>, an Ottawanian javascripter and
            nerd at large. I work at Shopify as a Front End Developer.
          </p>
        </div>
        <div>
          <SocialMedia />
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'horizontal',
    flexWrap: 'wrap',
    marginBottom: rhythm(),
    alignItems: 'center',
    [media.smallScreen]: {
      justifyContent: 'center',
    },
  },

  profilePic: {
    float: 'left',
    marginRight: rhythm(0.5),
    marginBottom: 0,
    width: rhythm(5),
    height: rhythm(5),
    borderRadius: '50%',
    alignSelf: 'flex-start',
    [media.smallScreen]: {
      marginBottom: rhythm(),
    },
  },

  blurb: {
    [media.largeScreen]: {
      width: '50%',
    },
  },

  blurbIntro: {
    marginBottom: 0,
  },
}

export default Radium(Bio)
