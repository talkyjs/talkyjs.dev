import React, { FC } from 'react'
import {useStaticQuery, graphql }  from 'gatsby'
import { RootLayout as Layout } from '../Layout'
import { Card, Col, Row } from 'antd'
type AllGithubReleaseQuery = {
    allGithubRelease: {
        edges: {
            node: {
                id: string;
                name: string;
                prerelease: boolean;
                htmlUrl: string;
                publishedAt: string;
                body: string;
                zipballUrl: string;
            }
        }[]
    }
}
const useAllGithubRelease = () => {
    const {
        allGithubRelease: {
            edges
        }
    } = useStaticQuery<AllGithubReleaseQuery>(graphql`query LIST_RELEASES {
        allGithubRelease {
            edges {
                node {
                    id
                    name
                    prerelease
                    htmlUrl
                    publishedAt
                    body
                    zipballUrl
                }
            }
        }
      }`)
    return edges
}

export const Releases: FC = () => {
    const edges = useAllGithubRelease()
    return (
        <Layout>
            <h1>Releases</h1>
            <Row gutter={16}>
                {edges.map(({node}) => (
                    <Col span={12}  style={{marginBottom: 16}} key={node.id}>
                        <Card title={node.name}>
                            <dl>
                                <dt>Released at</dt>
                                <dd>{new Date(node.publishedAt).toLocaleDateString()}</dd>
                                <dt>URL</dt>
                                <dd>
                                    <a href={node.htmlUrl}>
                                        {node.htmlUrl}
                                    </a>
                                </dd>
                            </dl>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Layout>
    )
}

export default Releases