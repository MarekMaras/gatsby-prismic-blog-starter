/** @jsx jsx */

import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SliceZone from "../components/sliceZone"
import { jsx, Styled } from "theme-ui"
import { FiClock } from "react-icons/fi"

const Article = ({ data: { article } }) => {
  console.log(article)

  return (
    <Layout>
      <SEO
        title={`${article.data.title.text} | Article`}
        description={article.data.excerpt.text}
      />
      <Styled.h1 sx={{ textAlign: "center", letterSpacing: "0.1rem", mb: 3 }}>
        {article.data.title.text}
      </Styled.h1>
      <p sx={{ fontWeight: "bold", my: 0, pt: 0, textAlign: "center" }}>
        <Styled.em
          title={`${article.data.created} (yyyy-mm-dd)`}
          aria-label={`${article.data.created} (yyyy-mm-dd)`}
        >
          {article.data.created}
        </Styled.em>
        <Styled.em
          sx={{ mx: 4 }}
          title="Time to read the article"
          aria-label="Time to read the article"
        >
          <FiClock style={{ marginBottom: "-0.1rem" }} />
          &nbsp;{article.data.read_time}&nbsp;min read
        </Styled.em>
      </p>
      <Styled.p sx={{ my: 4 }}>{article.data.excerpt.text}</Styled.p>

      {/* slices */}
      <SliceZone slices={article.data.body} />

      {/* {article.data.body.map((slice, index) => {
        switch (slice.slice_type) {
          case "banner_with_caption":
            return (
              <div key={index}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${slice.primary.title_of_banner.text}`,
                  }}
                ></div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${slice.primary.description.text}`,
                  }}
                ></div>
              </div>
            )
          case "image_gallery":
            return (
              <div
                key={index}
                dangerouslySetInnerHTML={{
                  __html: `${slice.primary.name_of_the_gallery.html}`,
                }}
              ></div>
            )
          default:
            return null
        }
      })}
      {article.tags.map((tag, index) => (
        <Link to={`/tag/${tag}`} key={index}>
          {tag}
        </Link>
      ))} */}
    </Layout>
  )
}

export default Article

export const articleQuery = graphql`
  query Article($uid: String) {
    article: prismicArticle(uid: { eq: $uid }) {
      data {
        excerpt {
          text
        }
        title {
          text
        }
        created
        modified
        read_time
        body {
          ... on PrismicArticleBodyText {
            slice_type
            primary {
              content {
                html
                raw
              }
            }
          }
          ... on PrismicArticleBodyQuote {
            slice_type
            primary {
              quote {
                html
              }
            }
          }
          ... on PrismicArticleBodyBannerWithCaption {
            id
            slice_type
            primary {
              description {
                text
              }
              image_banner {
                alt
                thumbnails
                url
              }
              title_of_banner {
                text
              }
            }
          }
          ... on PrismicArticleBodyImageGallery {
            id
            slice_type
            primary {
              name_of_the_gallery {
                text
              }
            }
            items {
              gallery_image {
                alt
                thumbnails
                url
              }
              image_captions {
                text
              }
            }
          }
          ... on PrismicArticleBodyCode {
            id
            slice_type
            primary {
              code {
                raw
                text
                html
              }
              lang
            }
          }
          ... on PrismicArticleBodyEmbed {
            id
            slice_type
            primary {
              embed {
                embed_url
              }
              platform
            }
          }
        }
        categories {
          category {
            document {
              ... on PrismicCategory {
                data {
                  name
                }
              }
            }
          }
        }
      }
      tags
    }
  }
`
