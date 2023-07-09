//페이지 하단 푸터
import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

const FooterWrapper = styled.div`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`

const Footer: FunctionComponent = function () {
  return (
    <FooterWrapper>
      Thank you for visiting my blog for Develop Log.
      <div style={{ display: 'flex' }}>
        <a style={{ display: 'flex' }} href="https://github.com/Turtle-Hwan">
          © 2023&nbsp;
          <div style={{ color: 'green', textDecoration: 'underline' }}>
            Turtle-Hwan
          </div>
          , Powered by&nbsp;
        </a>
        <a
          style={{ textDecoration: 'underline' }}
          href="https://github.com/gatsbyjs/gatsby"
        >
          Gatsby.
        </a>
      </div>
    </FooterWrapper>
  )
}

export default Footer
