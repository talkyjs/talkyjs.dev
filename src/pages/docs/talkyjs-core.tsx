import { graphql, useStaticQuery } from 'gatsby'
import * as React  from 'react'
import { MarkdownRemark } from '../../components/MarkdownRemark'
import { RootLayout as Layout } from '../../Layout'

type GithubReadmeQuery = {
    githubFile: {
        path: string;
        content: string;
    }
}

const useGitHubFiles = () => {
    const data = useStaticQuery<GithubReadmeQuery>(graphql`query GitHubReadmeQuery {
        githubFile(path: {eq: "README.md"}) {
          path
          content
        }
      }
    `)
    return data.githubFile
}

export const Readme: React.FC = () => {
    const data = useGitHubFiles()
    return (
        <Layout>
            <MarkdownRemark>{data.content}</MarkdownRemark>
        </Layout>
    )
}
export default Readme