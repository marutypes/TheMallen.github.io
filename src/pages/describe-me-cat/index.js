import React from 'react'
import Radium from 'radium'
import Link from 'gatsby-link'
import debounce from "lodash/debounce"

import { rhythm } from '../../utils/typography'
import { cutePurple, darkPurple, white } from '../../utils/colors'

const DESCRIPTION_SERVICE ='https://eastus.api.cognitive.microsoft.com' +
  '/vision/v1.0/describe?maxCandidates=12'
const RANDOM_CAT = 'https://cataas.com/cat'
const KEY = '5c61d9578d954431b57903f74cf96fe6'

const STRINGS = {
  NO_CAT: 'I only describe cats, and I cannot discern a cat here.',
  BAD_URL: 'Invalid URL',
  UNKNOWN_ERROR: 'Something internety went wrong.',
  DESCRIPTION: `
    I recently attended ConFoo in Vancouver, and one of the cool trending topics there was cognitive services.
    Basically most of these come down to REST apis that you can query to do various AI or machine-learning reated tasks.
    This 'post' is really just a toy app I built as an excuse to test out cognitive services in a fun way.
    Fetch a random cat or paste an image url and the app will describe it for you.
  `,
}

class DescribeMyCat extends React.Component {
  state = {
    image: null,
    caption: null,
    loadingCaption: false,
  }

  render() {
    const {
      image,
      caption,
      loadingCaption,
      error,
    } = this.state

    const imageURL = image && URL.createObjectURL(image)

    return (
      <div style={styles.stackVertical}>
        <div style={styles.stackChild}>
          <h1>Describe My Cat</h1>
          <p>
            {STRINGS.DESCRIPTION}
          </p>

          <div style={styles.catForm}>
            <label htmlFor="image-path">
              Cat image path
              <input
                name="image-path"
                onChange={this.handlePathChange}
              />
            </label>

            <button
              onClick={() => this.fetchImageData()}
              style={styles.button}
            >
              Random cat
            </button>
          </div>
        </div>
        {
          error && (
            <div style={styles.stackChild}>
              <p style={styles.error}>{error}</p>
            </div>
          )
        }
        {
          image && (
            <div style={styles.stackChild}>
              <img style={styles.image} alt={caption} src={imageURL} />
            </div>
          )
        }
        {
          loadingCaption && (
            <div style={styles.stackChild}>
              <p style={styles.caption}>Loading....</p>
            </div>
          )
        }
        {
          caption && (
            <div style={styles.stackChild}>
              <p style={styles.caption}>{caption}</p>
            </div>
          )
        }
      </div>
    )
  }

  handlePathChange = debounce((event) => {
    const {value} = event.target;

    try {
      new URL(value)
    } catch (error) {
      this.setState({error: STRINGS.BAD_URL})
      return
    }

    this.fetchImageData(value)
  }, 1000, {leading: true})

  fetchImageData = (url = RANDOM_CAT) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        this.setState({
          image: blob,
          caption: null,
          loadingCaption: true,
          error: false
        })

        const formData = new FormData()
        formData.append('image', blob)
        return fetch(DESCRIPTION_SERVICE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': KEY,
          },
          body: blob,
        })
      })
      .then((response) => {
        return response.json()
      })
      .then(({description}) => {
        const {captions} = description

        const [{text: caption}] = captions
          .filter(({text}) => text.indexOf('cat') !== -1)

        this.setState({
          caption,
          error: false,
          loadingCaption: false,
        })
      })
      .catch((error) => {
        this.setState({
          loadingCaption: false,
          error: STRINGS.UNKNOWN_ERROR,
        })
      })
  }
}

const styles = {
  button: {
    color: white,
    backgroundColor: cutePurple,
    borderRadius: rhythm(.2),
    padding: rhythm(.2),
    ':hover': {
      backgroundColor: darkPurple,
    },
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
  caption: {
    textAlign: 'center',
  },
  image: {
    maxWidth: 300,
    margin: '0 auto',
    display: 'block',
  },
  stackVertical: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'no-wrap',
    marginLeft: rhythm(-.5),
    marginTop: rhythm(-.5),
  },
  stackChild: {
    marginLeft: rhythm(.5),
    marginTop: rhythm(.5),
  },
  catForm: {
    textAlign: 'center',
  }
}

export const POST_DATA = {
  frontmatter: {
    title: 'Describe My Cat',
    date: '12 December, 2017',
    path: '/describe-me-cat',
  },
  excerpt: STRINGS.DESCRIPTION,
};

export default Radium(DescribeMyCat)
