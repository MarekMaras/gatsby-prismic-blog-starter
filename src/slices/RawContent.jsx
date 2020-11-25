/** @jsx jsx */

import React from 'react'
import { jsx } from 'theme-ui'
import sanitizeHTML from './../utils/sanitizeHTML'

const RawContent = ({ data: { primary } }) =>
  primary.content.raw.map((block, index) => {
    switch (block.type) {
      case 'o-list-item':
        return (
          <ol key={index}>
            <li
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(block.text) }}
              sx={{ variant: 'styles' }}
            ></li>
          </ol>
        )
      case 'list-item':
        return (
          <ul key={index}>
            <li
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(block.text) }}
              sx={{ variant: 'styles' }}
            ></li>
          </ul>
        )
      default:
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(block.text) }}
            sx={{ variant: 'styles', my: 4 }}
          ></div>
        )
    }
  })

export default RawContent
