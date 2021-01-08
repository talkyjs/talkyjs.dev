import React, { FC } from 'react'
import { graphql } from 'gatsby'
import { RootLayout as Layout } from '../Layout'
import { useHighlightJS } from '../libs/highlightHook'
import { Descriptions } from 'antd'

const PageNPMPackage: FC<{
  data: {
    npmPackage: {
      name: string
      license: string
      deprecated: 'true' | 'false'
      changelogFilename: string
      slug: string
      title: string
      version: string
      readme: {
        childMarkdownRemark: {
          html: string
        }
      }
    }
  }
}> = ({
  data: {
    npmPackage: {
      license,
      title,
      version,
      readme: {
        childMarkdownRemark: { html },
      },
    },
  },
}) => {
  useHighlightJS(html)
  return (
    <Layout>
      <Descriptions title={title} bordered>
        <Descriptions.Item label="Version">{version}</Descriptions.Item>
        <Descriptions.Item label="License">{license}</Descriptions.Item>
        {/* 
            <Descriptions.Item label="Changelogs">
                <a href={changelogFilename}>
                    Open CHANGELOG file
                </a>
            </Descriptions.Item>
            */}
      </Descriptions>
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </Layout>
  )
}
export const pageQuery = graphql`
  query NPMPackage($name: String) {
    npmPackage(name: { eq: $name }) {
      humanDownloadsLast30Days
      name
      license
      deprecated
      changelogFilename
      slug
      title
      version
      readme {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default PageNPMPackage
