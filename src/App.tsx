import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { EditorState } from 'lexical';
import { useRef, useState, useEffect } from 'react';

import { Editor } from './components/Editor';
import { demoTest, initial } from './data_sample';

interface AppPops {
  config: {
    data: string,
    onChange?: (data: string) => void;
    onChangeAsHTML?: (html: string) => void;
  }
}

function App({config}: AppPops) {
  const initialData = config.data
    ? config.data
    : initial;
  const onChangeCallback = config.onChange
    ? config.onChange
    : () => {};


  const editorRef = useRef<EditorState>(null);

  const [textData, setTextData] = useState<string>(initialData);
  const [isBlockDraggable, setIsBlockDraggable] = useState(true);

  const handleSave = () => {
    console.log(JSON.stringify(editorRef.current?.toJSON()));
  };

  const handleDemoData = () => {
    setTextData(demoTest);
  };

  const onChangeHandler = (data: string) => {
    console.log('onChange', data);
    return onChangeCallback(data);
  }

  return (
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

      <div style={{marginLeft: '32px', display: 'none'}}>
        <input
          type={'checkbox'}
          id='movedBlock'
          checked={isBlockDraggable}
          onChange={(e) => setIsBlockDraggable(e.target.checked)}
        />
        <label htmlFor='movedBlock'>Draggable blocks</label>
      </div>
      <div className='editor-shell'>
        <Editor
          ref={editorRef}
          // htmlSource={
          //   '<p class='editor-paragraph' dir='ltr'><span>Test </span><span style='color: red;'>placeholder</span></p>'
          // }
          initialText={textData}
          draggableBlocks={isBlockDraggable}
          onChange={(s) => onChangeHandler(s)}
          onChangeAsHTML={(html) => console.log(html)}
          onBlur={() => console.log('DETECT LOST FOCUS')}
        />
      </div>
    </>
  );
}

export default App;
