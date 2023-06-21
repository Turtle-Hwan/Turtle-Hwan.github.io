import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import Text from 'components/Text'

type InfoPageProps = {}

const InfoPage: FunctionComponent<InfoPageProps> = function () {
  return (
    <div>
      <Text text="Hello" />
    </div>
  )
}

export default InfoPage