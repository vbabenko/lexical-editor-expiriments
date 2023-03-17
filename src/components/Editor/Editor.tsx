import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
// import ToolbarPlugin from './plugins/ToolbarPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
// import AutoLinkPlugin from '@lexical/react/LexicalAutoLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin';
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import AutocompletePlugin from './plugins/AutocomplatePlugin';
import { DraggableBlockPlugin } from './plugins/DraggableBlockPlugin';

import './style.css';
import { editorConfig } from './config';
import { forwardRef, useEffect, useRef, useState } from 'react';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
import { SharedAutocompleteContext } from './context/SharedAutocompleteContext';
import {
  $getRoot,
  $insertNodes,
  EditorState,
  $applyNodeReplacement,
  $setSelection,
  LexicalEditor,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { MarkdownPlugin } from './plugins/MarkdownShortcutPlugin';
import { $generateHtmlFromNodes } from '@lexical/html';
import { LoadingHTMLData } from './plugins/LoadingHTMLData';

function Placeholder() {
  return (
    <div className='editor-placeholder' style={{paddingLeft: '24px'}}>
      Enter text
    </div>
  );
}

/**
 * Интерфейс для редактора
 */
interface EditorProps {
  initialText?: string;
  htmlSource?: string;
  draggableBlocks?: boolean;
  onChange?: (data: string) => void;
  onChangeAsHTML?: (html: string) => void;
  onBlur?: () => void;
  limit?: number;
  onWordsCountChange?: (count: number) => void
  onCharactersCountChange?: (count: number) => void
}

interface LoadingDataPluginsProps {
  data: string;
}

const LoadingDataPlugins = ({data}: LoadingDataPluginsProps): null => {
  console.log(data);
  const [editor] = useLexicalComposerContext();
  const editorState = editor.parseEditorState(data);
  editor.setEditorState(editorState);

  useEffect(() => {
    console.log('DATA CHANGED', data);
  }, [data]);

  return null;
};

export const Editor = forwardRef<EditorState, EditorProps>(
  (
    {
      initialText,
      htmlSource,
      onChange,
      onChangeAsHTML,
      onBlur,
      draggableBlocks = false,
      limit,
      onWordsCountChange,
      onCharactersCountChange
    },
    editorStateRef
  ) => {
    const [floatingAnchorElem, setFloatingAnchorElem] =
      useState<HTMLDivElement | null>(null);
    const [isSmallWidthViewport, setIsSmallWidthViewport] =
      useState<boolean>(false);

    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
      if (_floatingAnchorElem !== null) {
        setFloatingAnchorElem(_floatingAnchorElem);
      }
    };
    const [words, setWords] = useState(0)
    const [chars, setChars] = useState(0)

    const ref = useRef<EditorState>(null);

    // console.log(editorStateRef.current)
    const handleEditorChange = (
      editorState: EditorState,
      editor: LexicalEditor
    ) => {
      if (editorStateRef !== null) {
        // @ts-ignore
        editorStateRef.current = editorState;
        console.log(editorState.toJSON());
        // editorState.toJSON().root.children.forEach((v)=>v.type)
        if (onChange) {
          onChange(JSON.stringify(editorState.toJSON()));
        }
      }

      editor.update(() => {
        const s = $generateHtmlFromNodes(editor, null);
        const parsed = s.replace(/(<.*?>)/g, ' ').replace(/\s+/g, ' ');

        // console.log('PARSED', parsed);
        // console.log(`Words: ${parsed.split(' ').length}; Chars: ${parsed.length}`)
      });

      if (onChangeAsHTML) {
        editor.update(() => {
          const s = $generateHtmlFromNodes(editor, null);
          onChangeAsHTML(s);
        });
      }
    };

    useEffect(() => {
      const updateViewPortWidth = () => {
        const isNextSmallWidthViewport = window.matchMedia('(max-width: 1025px)').matches;

        if (isNextSmallWidthViewport !== isSmallWidthViewport) {
          setIsSmallWidthViewport(isNextSmallWidthViewport);
        }
      };

      window.addEventListener('resize', updateViewPortWidth);

      return () => {
        window.removeEventListener('resize', updateViewPortWidth);
      };
    }, [isSmallWidthViewport]);

    return (
      // @ts-ignore
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(initialText && {editorState: initialText}),
        }}
      >
        <SharedAutocompleteContext>
          <div className='editor-container' onBlur={onBlur}>
            {/* <ToolbarPlugin /> */}
            <div className='editor-inner'>
              <RichTextPlugin
                contentEditable={
                  <div ref={onRef}>
                    <ContentEditable className='editor-input'/>
                  </div>
                }
                placeholder={<Placeholder/>}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <OnChangePlugin onChange={handleEditorChange}/>
              <HistoryPlugin/>
              <AutoFocusPlugin/>
              {/* <CodeHighlightPlugin /> */}
              <ListPlugin/>
              <TabIndentationPlugin/>
              <CheckListPlugin/>
              <LinkPlugin/>
              <ComponentPickerPlugin/>
              <MarkdownPlugin/>
              <AutocompletePlugin/>
              {initialText && <LoadingDataPlugins data={initialText}/>}
              {htmlSource && <LoadingHTMLData html={htmlSource}/>}

              {floatingAnchorElem && !isSmallWidthViewport && (
                <>
                  <DraggableBlockPlugin anchorElem={floatingAnchorElem}/>
                  <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem}/>
                  <FloatingTextFormatToolbarPlugin
                    anchorElem={floatingAnchorElem}
                  />
                </>
              )}
              <AutoLinkPlugin/>
            </div>
          </div>
        </SharedAutocompleteContext>
      </LexicalComposer>
    );
  }
);
