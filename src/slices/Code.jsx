import React, { useState, Fragment } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import light from 'prism-react-renderer/themes/github'
import dark from 'prism-react-renderer/themes/vsDark'
import { useThemeUI } from 'theme-ui'
import styled from '@emotion/styled'

/* copy to clipboard UI/UX */
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/* custom syntax highlight theme */
// import "../styles/prism-theme.css"

const Code = ({ data: { primary } }) => {
  const { theme, colorMode } = useThemeUI()
  const [copied, setCopied] = useState(false)

  /**
   * Toast
   * language of the block copied to clipboard
   * @param {String} lang
   */
  const copyText = (lang) => {
    // remove older toast and copied state
    toast.dismiss()
    setCopied(false)

    // new toast and copied state
    toast.info(`${lang.toUpperCase()} block copied to clipboard`, {
      onOpen: () => {
        setCopied(true)
      },
      onClose: () => {
        setCopied(false)
      }
    })
  }

  const Button = styled.button`
    color: ${theme.colors.text};
    background: ${theme.colors.shade2};
    padding: 0.25rem;
    border: none;
    font-family: ${theme.fonts.body};
    letter-spacing: 1px;
    cursor: pointer;
    &:hover {
      color: ${theme.colors.accent};
      background: ${theme.colors.text};
    }
  `

  return (
    <Fragment>
      <Highlight
        {...defaultProps}
        theme={colorMode === 'light' ? light : dark}
        code={primary.code.text}
        language={primary.lang}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              backgroundColor: theme.colors.code,
              marginLeft: primary.type === 'list' ? '2.5rem' : null,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: theme.colors.shade2,
              borderRadius: '0.25rem'
            }}
          >
            <div
              className={className}
              style={{
                ...style,
                margin: '-0.25rem auto 0.5rem auto',
                textAlign: 'right',
                color: theme.colors.accent,
                backgroundColor: theme.colors.code
              }}
            >
              <span>{primary.lang.toUpperCase()}</span>
              <CopyToClipboard
                text={primary.code.text}
                onCopy={() => copyText(primary.lang)}
                style={{ margin: '0 0.5rem' }}
              >
                {copied ? <span>Copied</span> : <Button>Copy</Button>}
              </CopyToClipboard>
            </div>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <ToastContainer
        closeOnClick
        newestOnTop
        pauseOnHover
        transition={Slide}
        draggable
        draggablePercent={60}
        role="alert"
      />
    </Fragment>
  )
}

export default Code
