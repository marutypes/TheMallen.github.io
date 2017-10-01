import React from 'react'
import Link from 'gatsby-link'

import insta from './icons/insta.svg'
import twitter from './icons/twitter.svg'
import github from './icons/github.svg'
import Icon from './Icon'

import { rhythm } from '../utils/typography'
import { cutePurple } from '../utils/colors'

function SocialMedia() {
  return (
    <div
      style={{
        display: 'flex',
        color: cutePurple,
      }}
    >
      <Icon
        source={github}
        label={'Critique my code on Github'}
        linkTo={'http://github.com/themallen'}
      />
      &#8226;
      <Icon
        source={twitter}
        label={'Follow me on Twitter'}
        linkTo={'http://twitter.com/the_mallen'}
      />
      &#8226;
      <Icon
        source={insta}
        label={'Check out my Instagram'}
        linkTo={'http://instagram.com/themallen'}
      />
    </div>
  )
}

export default SocialMedia
