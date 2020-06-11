import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Listing from "./../components/listing"
import { Styled } from "theme-ui"

const Tag = ({ data: { articles }, pageContext }) => {
  return (
    <Layout>
      <SEO
        title={`${pageContext.slug} | Tag`}
        description={`Articles related to ${pageContext.slug}`}
      />
      <div style={{ textAlign: "center" }}>
        <Styled.h2 style={{ marginBottom: "0.25rem" }}>
          {pageContext.slug}
        </Styled.h2>
        <Styled.p>The articles related to {pageContext.slug}.</Styled.p>
      </div>
      <Listing articles={articles} />
    </Layout>
  )
}

export default Tag

export const TagQuery = graphql`
  query TagQuery($tag: String) {
    articles: allPrismicArticle(filter: { tags: { eq: $tag } }) {
      edges {
        node {
          uid
          tags
          data {
            excerpt {
              text
            }
            title {
              text
            }
            created
          }
        }
      }
    }
  }
`
