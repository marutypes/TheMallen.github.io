import React from 'react'
import Radium from 'radium'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import { rhythm } from '../utils/typography'
import { cutePurple, darkPurple } from '../utils/colors'
import Bio from '../components/Bio'
import Fade from '../components/Fade'
import {POST_DATA as DESCRIBE_CAT_POST_DATA} from './describe-me-cat';

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    const postNodes = [
      ...posts.map(({node}) => node),
      // add toy app posts here
      DESCRIBE_CAT_POST_DATA,
    ].sort((postA, postB) => {
      const dateA = new Date(get(postA, 'frontmatter.date'));
      const dateB = new Date(get(postB, 'frontmatter.date'));
      return dateA < dateB;
    })

    return (
      <div>
        <Fade inAfter={200}>
          <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />
          <Bio />
          <hr />
          {postNodes.map(post => {
            if (post.path !== '/404/') {
              const title = get(post, 'frontmatter.title') || post.path
              return (
                <Post
                  key={title}
                  excerpt={post.excerpt}
                  {...post.frontmatter}
                />
              )
            }
          })}
        </Fade>
      </div>
    )
  }
}

function Post({path, date, title, excerpt}) {
  return (
    <div key={path}>
      <h3
        style={{
          marginBottom: rhythm(1 / 4),
        }}
      >
        <Link
          style={{
            textDecoration: 'none',
            color: cutePurple.hex(),
            ':hover': {
              color: darkPurple.hex(),
              textDecoration: 'underline',
            }
          }}
          to={path}
        >
          {title}
        </Link>
      </h3>
      <small>{date}</small>
      <p dangerouslySetInnerHTML={{ __html: excerpt }} />
    </div>
  );
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default Radium(BlogIndex)

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
