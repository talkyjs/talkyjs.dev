import * as React from 'react'
import * as unified from 'unified'
import * as parse from 'remark-parse'
const remark2react = require('remark-react')
import { useHighlightJS } from '../libs/highlightHook'

export const MarkdownRemark: React.FC<{
  children: string
}> = ({ children }) => {
  useHighlightJS(children)
  const result = React.useMemo(() => {
    if (typeof children !== 'string') return children
    // @ts-expect-error
    return unified().use(parse).use(remark2react).processSync(children).result
  }, [children])
  return result
}
