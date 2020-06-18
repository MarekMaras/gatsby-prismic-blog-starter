/** @jsx jsx */

import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Listing from "../components/Listing"
import { jsx, Styled } from "theme-ui"

const IndexPage = ({ data: { articles } }) => {
  console.log(articles)

  return (
    <Layout>
      <SEO title="Home" />
      <Styled.p
        sx={{
          fontFamily: "title",
          fontSize: [2, 3, 4],
          letterSpacing: "0.05rem",
          textAlign: "center",
        }}
      >
        Dive into many interesting articles related to Web Development, Software
        Tools, Tips&nbsp;&&nbsp;Tricks,&nbsp;etc.
      </Styled.p>
      <Listing articles={articles} />
    </Layout>
  )
}

export default IndexPage

export const IndexQuery = graphql`
  query Articles {
    articles: allPrismicArticle {
      edges {
        node {
          uid
          tags
          data {
            title {
              text
            }
            excerpt {
              text
            }
            read_time
            created
          }
        }
      }
    }
  }
`
