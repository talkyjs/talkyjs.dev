import { useEffect} from 'react'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import php from 'highlight.js/lib/languages/php';
import shell from 'highlight.js/lib/languages/shell';
import yaml from 'highlight.js/lib/languages/yaml';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/atom-one-dark.css';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('jsx', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('tsx', typescript);
hljs.registerLanguage('php', php);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('sh-session', shell);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('json', json);

export const useHighlightJS = (content?: string) => {
    useEffect(() => {
        if (!content) return;
        hljs.initHighlighting();
        hljs.initHighlighting.called = false
    },[content]);
}