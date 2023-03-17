import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './main.css'

interface Config {
  editorRootElement: string;
  data: string,
  onChange: () => void,
}

export class DDEditor {
  private root: null;

  constructor() {
    this.root = null;
  }

  async init(conf: Config) {
    try {
      // @ts-ignore
      this.root = ReactDOM.createRoot(document.getElementById(conf.editorRootElement) as HTMLElement);
      // @ts-ignore
      this.root.render(
        <React.StrictMode>
          <App config={conf} />
        </React.StrictMode>,
      )
    } catch (err) {
      console.error(err);
    }

  }
  destroy() {
    // @ts-ignore
    if (this.root) this.root.unmount();
  }
}
