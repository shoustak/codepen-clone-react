import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import UseLocalStorage from "../hooks/UseLocalStorage";

function App() {
  const [html, setHtml] = UseLocalStorage('html', '')
  const [css, setCss] = UseLocalStorage('css', '')
  const [js, setJs] = UseLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        <html>
      `)
    }, 500)

    return () => clearTimeout(timeout)

  }, [html, css, js])


  return (
    <>
      <div className="board top-board">

        <Editor
          language="xml"
          displayEditorName="HTML"
          value={html}
          onChange={setHtml}
        />

        <Editor
          language="css"
          displayEditorName="CSS"
          value={css}
          onChange={setCss}
        />

        <Editor
          language="javascript"
          displayEditorName="JS"
          value={js}
          onChange={setJs}
        />

      </div>

      <div className="board">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>

    </>
  );
}

export default App;
