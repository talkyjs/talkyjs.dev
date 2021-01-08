import React, { FC } from 'react'
import {useStaticQuery, graphql }  from 'gatsby'
import { Timeline } from 'antd'
import { RootLayout as Layout } from '../../Layout'
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
            <Timeline>
                {edges.map(({node}) => (
                    <Timeline.Item key={node.id}>
                        <p>{new Date(node.publishedAt).toLocaleDateString()}: {node.name ? (<b> {node.name}</b>):null}</p>
                        <p><a href={node.htmlUrl}>{node.htmlUrl}</a></p>
                        <div dangerouslySetInnerHTML={{
                            __html: node.body
                        }} />
                    </Timeline.Item>
                ))}
            </Timeline>
        </Layout>
    )
}

export default Releases