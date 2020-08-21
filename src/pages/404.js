/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Listing } from '../components'

import { withUnpublishedPreview } from 'gatsby-source-prismic'
import Article from './../templates/article'
import Category from './../templates/category'
import Tag from '../templates/tag'

const NotFoundPage = ({ data: { articles } }) => (
  <Layout>
    <SEO title="404: Not found | Blog" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <p
      sx={{
        fontSize: [2, 3, 4],
        textAlign: 'center'
      }}
    >
      <em>
        Dive into many interesting articles related to Web Development, Software
        Tools, Tips&nbsp;&&nbsp;Tricks,&nbsp;etc.
      </em>
    </p>
    <Listing articles={articles} />
  </Layout>
)

export default withUnpublishedPreview(NotFoundPage, {
  templateMap: {
    article: Article,
    category: Category,
    tag: Tag
  }
})

export const listQuery = graphql`
  query {
    articles: allPrismicArticle(sort: { order: DESC, fields: data___created }) {
      edges {
        node {
          ...ArticleFragment
        }
      }
    }
  }
`
