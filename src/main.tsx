import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MDXProvider } from '@mdx-js/react'

import './index.css'

/** @type {import('mdx/types.js').MDXComponents} */
const components = {
  table(props: any) {
    return <table {...props} className={`table table-sm ${props.className || ''}`} />
  },
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MDXProvider components={components}>
      <App />
    </MDXProvider>
  </React.StrictMode>
)
