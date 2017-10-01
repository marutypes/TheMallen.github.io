import React from 'react'
import Radium from 'radium'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import { rhythm } from '../utils/typography'
import { cutePurple, darkPurple } from '../utils/colors'
import Bio from '../components/Bio'
import Fade from '../components/Fade'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div>
        <Fade inAfter={200}>
          <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />
          <Bio />
          <hr />
          {posts.map(post => {
            if (post.node.path !== '/404/') {
              const title = get(post, 'node.frontmatter.title') || post.node.path
              return (
                <div key={post.node.frontmatter.path}>
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
                      to={post.node.frontmatter.path}
                    >
                      {post.node.frontmatter.title}
                    </Link>
                  </h3>
                  <small>{post.node.frontmatter.date}</small>
                  <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
                </div>
              )
            }
          })}
        </Fade>
      </div>
    )
  }
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
