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
`

const Footer: FunctionComponent = function () {
  return (
    <FooterWrapper>
      Thank you for visiting my blog for Develop Log.
      <a style={{ display: 'flex' }} href="https://github.com/Turtle-Hwan">
        © 2023<div style={{ color: 'blue' }}>&nbsp; Turtle-Hwan</div>, Powered
        by Gatsby.
      </a>
    </FooterWrapper>
  )
}

export default Footer
