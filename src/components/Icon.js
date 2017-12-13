import React from 'react'
import Radium from 'radium'
import color from 'color'

import { rhythm } from '../utils/typography'
import { cutePurple, darkPurple } from '../utils/colors'

class Icon extends React.PureComponent {
  render() {
    const {
      source,
      label,
      color: fillColor = cutePurple,
      linkTo,
      linkOptions,
    } = this.props

    const hoverStyles =
      linkTo == null
        ? {}
        : {
            ':hover': {
              fill: darkPurple
            },
          }

    const icon = (
      <svg
        role="image"
        aria-label={label}
        viewBox={source.viewBox}
        style={[
          {
            width: rhythm(),
            height: rhythm(),
            fill: fillColor,
          },
          hoverStyles,
        ]}
        dangerouslySetInnerHTML={{ __html: source.body }}
      />
    )

    return linkTo ? (
      <a href={linkTo} {...linkOptions}>
        {icon}
      </a>
    ) : (
      icon
    )
  }
}

export default Radium(Icon)
