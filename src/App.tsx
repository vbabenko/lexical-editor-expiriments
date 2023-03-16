import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";
import { useRef, useState, useEffect } from "react";

import { Editor } from "./components/Editor";
import { demoTest, initial } from "./data_sample";

function App() {
  const editorRef = useRef<EditorState>(null);

  const [textData, setTextData] = useState<string>(initial);
  const [isBlockDraggable, setIsBlockDraggable] = useState(true);

  // const [editor] = useLexicalComposerContext();

  // editor.parseEditorState()

  const handleSave = () => {
    console.log(JSON.stringify(editorRef.current?.toJSON()));
  };

  const handleDemoData = () => {
    setTextData(demoTest);
  };

  return (
    // <div className="App">
    //
    <>
      <div className='app-title'>
        <h1>Text Editor test</h1>
        <button className='btn-title btn-secondary' onClick={handleDemoData}>
          Test data
        </button>
        <button className='btn-title' onClick={handleSave}>
          Save
        </button>
      </div>

      <div style={{ marginLeft: "32px", display: "none" }}>
        <input
          type={"checkbox"}
          id='movedBlock'
          checked={isBlockDraggable}
          onChange={(e) => setIsBlockDraggable(e.target.checked)}
        />
        <label htmlFor='movedBlock'>Перемещаемые блоки</label>
      </div>
      <div className="editor-shell">
        <Editor
          ref={editorRef}
          // htmlSource={
          //   '<p class="editor-paragraph" dir="ltr"><span>Test </span><span style="color: red;">placeholder</span></p>'
          // }
          initialText={textData}
          draggableBlocks={isBlockDraggable}
          // onChange={(s) => console.log(s)}
          onChangeAsHTML={(html) => console.log(html)}
          onBlur={() => console.log("DETECT LOST FOCUS")}
        />
      </div>
    </>

    // </div>
  );
}

export default App;
