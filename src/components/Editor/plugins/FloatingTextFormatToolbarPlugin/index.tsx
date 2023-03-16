// import "./index.css";
//
// import { $isCodeHighlightNode } from "@lexical/code";
// import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  // mergeRegister,
  $findMatchingParent,
  // $getNearestNodeOfType,
} from "@lexical/utils";
// import {
//   $getSelection,
//   $isRootOrShadowRoot,
//   $isRangeSelection,
//   $isTextNode,
//   COMMAND_PRIORITY_LOW,
//   FORMAT_TEXT_COMMAND,
//   FORMAT_ELEMENT_COMMAND,
//   LexicalEditor,
//   SELECTION_CHANGE_COMMAND,
// } from "lexical";
// import {
//   INSERT_ORDERED_LIST_COMMAND,
//   INSERT_UNORDERED_LIST_COMMAND,
//   INSERT_CHECK_LIST_COMMAND,
//   REMOVE_LIST_COMMAND,
//   $isListNode,
//   ListNode,
// } from "@lexical/list";
// import { $wrapNodes } from "@lexical/selection";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from "@lexical/rich-text";
// import {
//   $getSelectionStyleValueForProperty,
//   $patchStyleText,
// } from "@lexical/selection";
// import { useCallback, useEffect, useRef, useState } from "react";
// import * as React from "react";
// import { createPortal } from "react-dom";
//
// import { getDOMRangeRect } from "../../utils/getDOMRangeRect";
// import { getSelectedNode } from "../../utils/getSelectedNode";
// import { setFloatingElemPosition } from "../../utils/setFloatingElemPosition";
//
// import { BoldIcon } from "../../icons/Bold2";
// import { ItalicIcon } from "../../icons/Italic2";
// import { UnderlineIcon } from "../../icons/Underline2";
// import { StrikethroughIcon } from "../../icons/Strikethrough2";
// import { LinkIcon } from "../../icons/LinkIcon2";
// import { Devider } from "../../../Divider";
import ColorPicker from "../../ui/ColorPicker/ColorPicker";
// import { FontColorIcon } from "../../icons/FontColorIcon";
import { BlockFormatDropDown } from "../../ui/BlockTypePicker";
// import { TextAlignPicker } from "../../ui/TextAlignPicker";
// import { ListTypePicker } from "../../ui/ListTypePicker";
// import clsx from "clsx";
// import { ToolbarButton } from "../../../ToolbarButton";
//
// export type ListType = "number" | "bullet" | "check";
//
// function TextFormatFloatingToolbar({
//   editor,
//   anchorElem,
//   isLink,
//   isBold,
//   isItalic,
//   isUnderline,
//   isCode,
//   isStrikethrough,
//   isSubscript,
//   isSuperscript,
//   isList,
//   listType,
//   fontColor,
//   bgColor,
//   blockType,
// }: {
//   editor: LexicalEditor;
//   anchorElem: HTMLElement;
//   isBold: boolean;
//   isCode: boolean;
//   isItalic: boolean;
//   isLink: boolean;
//   isStrikethrough: boolean;
//   isSubscript: boolean;
//   isSuperscript: boolean;
//   isUnderline: boolean;
//   isList: boolean;
//   listType: ListType | undefined;
//   fontColor: string;
//   bgColor: string;
//   blockType: string;
// }): JSX.Element {
//   const popupCharStylesEditorRef = useRef<HTMLDivElement | null>(null);
//
//   const [activeEditor, setActiveEditor] = useState(editor);
//
//   const insertLink = useCallback(() => {
//     if (!isLink) {
//       editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
//     } else {
//       editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
//     }
//   }, [editor, isLink]);
//
//   const applyStyleText = useCallback(
//     (styles: Record<string, string>) => {
//       activeEditor.update(() => {
//         const selection = $getSelection();
//         if ($isRangeSelection(selection)) {
//           $patchStyleText(selection, styles);
//         }
//       });
//     },
//     [activeEditor]
//   );
//
//   const onFontColorSelect = useCallback(
//     (value: string) => {
//       applyStyleText({ color: value });
//     },
//     [applyStyleText]
//   );
//
//   const onBgColorSelect = useCallback(
//     (value: string) => {
//       applyStyleText({ "background-color": value });
//     },
//     [applyStyleText]
//   );
//
//   const onClearFontColor = useCallback(() => {
//     applyStyleText({ color: "#fff", "background-color": "#0000" });
//   }, [applyStyleText]);
//
//   const insertComment = () => {
//     // editor.dispatchCommand(INSERT_INLINE_COMMAND, undefined);
//   };
//
//   const updateTextFormatFloatingToolbar = useCallback(() => {
//     const selection = $getSelection();
//
//     const popupCharStylesEditorElem = popupCharStylesEditorRef.current;
//     const nativeSelection = window.getSelection();
//
//     if (popupCharStylesEditorElem === null) {
//       return;
//     }
//
//     const rootElement = editor.getRootElement();
//     if (
//       selection !== null &&
//       nativeSelection !== null &&
//       !nativeSelection.isCollapsed &&
//       rootElement !== null &&
//       rootElement.contains(nativeSelection.anchorNode)
//     ) {
//       const rangeRect = getDOMRangeRect(nativeSelection, rootElement);
//
//       setFloatingElemPosition(rangeRect, popupCharStylesEditorElem, anchorElem);
//     }
//   }, [editor, anchorElem]);
//
//   useEffect(() => {
//     const scrollerElem = anchorElem.parentElement;
//
//     const update = () => {
//       editor.getEditorState().read(() => {
//         updateTextFormatFloatingToolbar();
//       });
//     };
//
//     window.addEventListener("resize", update);
//     if (scrollerElem) {
//       scrollerElem.addEventListener("scroll", update);
//     }
//
//     return () => {
//       window.removeEventListener("resize", update);
//       if (scrollerElem) {
//         scrollerElem.removeEventListener("scroll", update);
//       }
//     };
//   }, [editor, updateTextFormatFloatingToolbar, anchorElem]);
//
//   useEffect(() => {
//     editor.getEditorState().read(() => {
//       updateTextFormatFloatingToolbar();
//     });
//     return mergeRegister(
//       editor.registerUpdateListener(({ editorState }) => {
//         editorState.read(() => {
//           updateTextFormatFloatingToolbar();
//         });
//       }),
//
//       editor.registerCommand(
//         SELECTION_CHANGE_COMMAND,
//         (_payload, newEditor) => {
//           updateTextFormatFloatingToolbar();
//           setActiveEditor(newEditor);
//           return false;
//         },
//         COMMAND_PRIORITY_LOW
//       )
//     );
//   }, [editor, updateTextFormatFloatingToolbar]);
//
//   return (
//     <div ref={popupCharStylesEditorRef} className="floating-text-format-popup">
//       {editor.isEditable() && (
//         <>
//           <BlockFormatDropDown
//             disabled={false}
//             blockType={blockType}
//             editor={editor}
//           />
//
//           <Devider />
//           <ToolbarButton
//             handleClick={() => {
//               editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
//             }}
//             className={"popup-item spaced " + (isBold ? "active" : "")}
//             ariaLabeles="Format text as bold"
//             icon={<BoldIcon />}
//             tooltip="Bold"
//           />
//
//           <ToolbarButton
//             handleClick={() => {
//               editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
//             }}
//             className={"popup-item spaced " + (isItalic ? "active" : "")}
//             ariaLabeles="Format text as italics"
//             icon={<ItalicIcon />}
//             tooltip={"Italic"}
//           />
//
//           <ToolbarButton
//             handleClick={() => {
//               editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
//             }}
//             className={"popup-item spaced " + (isUnderline ? "active" : "")}
//             ariaLabeles="Format text to underlined"
//             icon={<UnderlineIcon />}
//             tooltip={"Underline"}
//           />
//
//           <ToolbarButton
//             handleClick={() => {
//               editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
//             }}
//             className={"popup-item spaced " + (isStrikethrough ? "active" : "")}
//             ariaLabeles="Format text with a strikethrough"
//             icon={<StrikethroughIcon />}
//             tooltip={"Strikethrough"}
//           />
//
//           <Devider />
//
//           <ColorPicker
//             disabled={false}
//             buttonClassName="toolbar-item color-picker"
//             buttonAriaLabel="Formatting text color"
//             buttonIconClassName="icon font-color"
//             color={fontColor}
//             onChange={onFontColorSelect}
//             title="text color"
//           />
//
//           <TextAlignPicker
//             buttonClassName="popup-item spaced"
//             tooltip="Align"
//             // blockType={blockType}
//             editor={editor}
//           />
//
//           <ListTypePicker
//             buttonClassName={clsx("popup-item spaced", isList && "active")}
//             tooltip="Lists"
//             editor={editor}
//             isList={isList}
//             listType={listType}
//           />
//
//           <Devider />
//           <ToolbarButton
//             handleClick={insertLink}
//             className={"popup-item spaced "}
//             ariaLabeles="Insert link"
//             icon={<LinkIcon />}
//             tooltip={"Link"}
//           />
//         </>
//       )}
//     </div>
//   );
// }
//
// function useFloatingTextFormatToolbar(
//   editor: LexicalEditor,
//   anchorElem: HTMLElement
// ): JSX.Element | null {
//   const [isText, setIsText] = useState(false);
//   const [isLink, setIsLink] = useState(false);
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [isUnderline, setIsUnderline] = useState(false);
//   const [isStrikethrough, setIsStrikethrough] = useState(false);
//   const [isSubscript, setIsSubscript] = useState(false);
//   const [isSuperscript, setIsSuperscript] = useState(false);
//   const [isCode, setIsCode] = useState(false);
//
//   const [isList, setIsList] = useState(false);
//   const [listType, setListType] = useState<ListType | undefined>(undefined);
//
//   const [blockType, setBlockType] = useState<string>("");
//
//   const [fontColor, setFontColor] = useState<string>("#fff");
//   const [bgColor, setBgColor] = useState<string>("#0000");
//
//   const updatePopup = useCallback(() => {
//     editor.getEditorState().read(() => {
//       // Should not to pop up the floating toolbar when using IME input
//       if (editor.isComposing()) {
//         return;
//       }
//       const selection = $getSelection();
//       const nativeSelection = window.getSelection();
//       const rootElement = editor.getRootElement();
//
//       if (
//         nativeSelection !== null &&
//         (!$isRangeSelection(selection) ||
//           rootElement === null ||
//           !rootElement.contains(nativeSelection.anchorNode))
//       ) {
//         setIsText(false);
//         return;
//       }
//
//       if (!$isRangeSelection(selection)) {
//         return;
//       }
//
//       const node = getSelectedNode(selection);
//
//       const anchorNode = selection.anchor.getNode();
//       let element =
//         anchorNode.getKey() === "root"
//           ? anchorNode
//           : $findMatchingParent(anchorNode, (e) => {
//               const parent = e.getParent();
//               return parent !== null && $isRootOrShadowRoot(parent);
//             });
//
//       if (element === null) {
//         element = anchorNode.getTopLevelElementOrThrow();
//       }
//
//       const elementKey = element.getKey();
//
//       // Update text format
//       setIsBold(selection.hasFormat("bold"));
//       setIsItalic(selection.hasFormat("italic"));
//       setIsUnderline(selection.hasFormat("underline"));
//       setIsStrikethrough(selection.hasFormat("strikethrough"));
//       setIsSubscript(selection.hasFormat("subscript"));
//       setIsSuperscript(selection.hasFormat("superscript"));
//       setIsCode(selection.hasFormat("code"));
//
//       // Update links
//       const parent = node.getParent();
//       if ($isLinkNode(parent) || $isLinkNode(node)) {
//         setIsLink(true);
//       } else {
//         setIsLink(false);
//       }
//
//       //lists
//       console.log("NODE IS ", node.getType(), parent?.getType());
//
//       const type = $isHeadingNode(element)
//         ? element.getTag()
//         : element.getType();
//       console.log("TYPE IS", type);
//       setBlockType(type);
//
//       if ($isListNode(element)) {
//         setIsList(true);
//         const parentList = $getNearestNodeOfType<ListNode>(
//           anchorNode,
//           ListNode
//         );
//         const type = parentList
//           ? parentList.getListType()
//           : element.getListType();
//         console.log(type);
//         setListType(type);
//       } else {
//         setIsList(false);
//         setListType(undefined);
//       }
//
//       setFontColor(
//         $getSelectionStyleValueForProperty(selection, "color", "#ffff")
//       );
//       setBgColor(
//         $getSelectionStyleValueForProperty(
//           selection,
//           "background-color",
//           "#0000"
//         )
//       );
//
//       if (
//         !$isCodeHighlightNode(selection.anchor.getNode()) &&
//         selection.getTextContent() !== ""
//       ) {
//         setIsText($isTextNode(node));
//       } else {
//         setIsText(false);
//       }
//     });
//   }, [editor]);
//
//   useEffect(() => {
//     document.addEventListener("selectionchange", updatePopup);
//     return () => {
//       document.removeEventListener("selectionchange", updatePopup);
//     };
//   }, [updatePopup]);
//
//   useEffect(() => {
//     return mergeRegister(
//       editor.registerUpdateListener(() => {
//         updatePopup();
//       }),
//       editor.registerRootListener(() => {
//         if (editor.getRootElement() === null) {
//           setIsText(false);
//         }
//       })
//     );
//   }, [editor, updatePopup]);
//
//   if (!isText || isLink) {
//     return null;
//   }
//
//   return createPortal(
//     <TextFormatFloatingToolbar
//       editor={editor}
//       anchorElem={anchorElem}
//       isLink={isLink}
//       isBold={isBold}
//       isItalic={isItalic}
//       isStrikethrough={isStrikethrough}
//       isSubscript={isSubscript}
//       isSuperscript={isSuperscript}
//       isUnderline={isUnderline}
//       isCode={isCode}
//       isList={isList}
//       listType={listType}
//       fontColor={fontColor}
//       bgColor={bgColor}
//       blockType={blockType}
//     />,
//     anchorElem
//   );
// }
//
// export default function FloatingTextFormatToolbarPlugin({
//   anchorElem = document.body,
// }: {
//   anchorElem?: HTMLElement;
// }): JSX.Element | null {
//   const [editor] = useLexicalComposerContext();
//   return useFloatingTextFormatToolbar(editor, anchorElem);
// }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import './index.css';

import {$isCodeHighlightNode} from '@lexical/code';
import {$isLinkNode, TOGGLE_LINK_COMMAND} from '@lexical/link';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {mergeRegister} from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { $patchStyleText, $getSelectionStyleValueForProperty } from '@lexical/selection';
import {useCallback, useEffect, useRef, useState} from 'react';
import * as React from 'react';
import {createPortal} from 'react-dom';

import {getDOMRangeRect} from '../../utils/getDOMRangeRect';
import {getSelectedNode} from '../../utils/getSelectedNode';
import {setFloatingElemPosition} from '../../utils/setFloatingElemPosition';

function TextFormatFloatingToolbar({
                                     editor,
                                     anchorElem,
                                     isLink,
                                     isBold,
                                     isItalic,
                                     isUnderline,
                                     isCode,
                                     isStrikethrough,
                                     isSubscript,
                                     isSuperscript,
                                     blockType,
                                     fontColor,
                                   }: {
  editor: LexicalEditor;
  anchorElem: HTMLElement;
  isBold: boolean;
  isCode: boolean;
  isItalic: boolean;
  isLink: boolean;
  isStrikethrough: boolean;
  isSubscript: boolean;
  isSuperscript: boolean;
  isUnderline: boolean;
  blockType: string;
  fontColor: string;
}): JSX.Element {
  const popupCharStylesEditorRef = useRef<HTMLDivElement | null>(null);
  const [activeEditor, setActiveEditor] = useState(editor);

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const applyStyleText = useCallback(
    (styles: Record<string, string>) => {
      activeEditor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, styles);
        }
      });
    },
    [activeEditor]
  );

  const onFontColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ color: value });
    },
    [applyStyleText]
  );

  function mouseMoveListener(e: MouseEvent) {
    if (
      popupCharStylesEditorRef?.current &&
      (e.buttons === 1 || e.buttons === 3)
    ) {
      popupCharStylesEditorRef.current.style.pointerEvents = 'none';
    }
  }
  function mouseUpListener(e: MouseEvent) {
    if (popupCharStylesEditorRef?.current) {
      popupCharStylesEditorRef.current.style.pointerEvents = 'auto';
    }
  }

  useEffect(() => {
    if (popupCharStylesEditorRef?.current) {
      document.addEventListener('mousemove', mouseMoveListener);
      document.addEventListener('mouseup', mouseUpListener);

      return () => {
        document.removeEventListener('mousemove', mouseMoveListener);
        document.removeEventListener('mouseup', mouseUpListener);
      };
    }
  }, [popupCharStylesEditorRef]);

  const updateTextFormatFloatingToolbar = useCallback(() => {
    const selection = $getSelection();

    const popupCharStylesEditorElem = popupCharStylesEditorRef.current;
    const nativeSelection = window.getSelection();

    if (popupCharStylesEditorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement);

      setFloatingElemPosition(rangeRect, popupCharStylesEditorElem, anchorElem);
    }
  }, [editor, anchorElem]);

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement;

    const update = () => {
      editor.getEditorState().read(() => {
        updateTextFormatFloatingToolbar();
      });
    };

    window.addEventListener('resize', update);
    if (scrollerElem) {
      scrollerElem.addEventListener('scroll', update);
    }

    return () => {
      window.removeEventListener('resize', update);
      if (scrollerElem) {
        scrollerElem.removeEventListener('scroll', update);
      }
    };
  }, [editor, updateTextFormatFloatingToolbar, anchorElem]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateTextFormatFloatingToolbar();
    });
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          updateTextFormatFloatingToolbar();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateTextFormatFloatingToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, updateTextFormatFloatingToolbar]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateTextFormatFloatingToolbar();
    });
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateTextFormatFloatingToolbar();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateTextFormatFloatingToolbar();
          setActiveEditor(newEditor);
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, updateTextFormatFloatingToolbar]);

  return (
    <div ref={popupCharStylesEditorRef} className="floating-text-format-popup">
      {editor.isEditable() && (
        <>
          <BlockFormatDropDown
            disabled={false}
            blockType={blockType}
            editor={editor}
          />
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
            }}
            className={'popup-item spaced ' + (isBold ? 'active' : '')}
            aria-label="Format text as bold">
            <i className="format bold" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
            }}
            className={'popup-item spaced ' + (isItalic ? 'active' : '')}
            aria-label="Format text as italics">
            <i className="format italic" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
            }}
            className={'popup-item spaced ' + (isUnderline ? 'active' : '')}
            aria-label="Format text to underlined">
            <i className="format underline" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
            }}
            className={'popup-item spaced ' + (isStrikethrough ? 'active' : '')}
            aria-label="Format text with a strikethrough">
            <i className="format strikethrough" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
            }}
            className={'popup-item spaced ' + (isCode ? 'active' : '')}
            aria-label="Insert code block">
            <i className="format code" />
          </button>
          <ColorPicker
            disabled={false}
            buttonClassName="toolbar-item color-picker"
            buttonAriaLabel="Formatting text color"
            buttonIconClassName="icon font-color"
            color={fontColor}
            onChange={onFontColorSelect}
            title="text color"
            />
          <button
            onClick={insertLink}
            className={'popup-item spaced ' + (isLink ? 'active' : '')}
            aria-label="Insert link">
            <i className="format link" />
          </button>
        </>
      )}
    </div>
  );
}

function useFloatingTextFormatToolbar(
  editor: LexicalEditor,
  anchorElem: HTMLElement,
): JSX.Element | null {
  const [isText, setIsText] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [blockType, setBlockType] = useState<string>("");
  const [fontColor, setFontColor] = useState<string>("#000");

  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      // Should not to pop up the floating toolbar when using IME input
      if (editor.isComposing()) {
        return;
      }
      const selection = $getSelection();
      const nativeSelection = window.getSelection();
      const rootElement = editor.getRootElement();

      if (
        nativeSelection !== null &&
        (!$isRangeSelection(selection) ||
          rootElement === null ||
          !rootElement.contains(nativeSelection.anchorNode))
      ) {
        setIsText(false);
        return;
      }

      if (!$isRangeSelection(selection)) {
        return;
      }

      const node = getSelectedNode(selection);

      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsSubscript(selection.hasFormat('subscript'));
      setIsSuperscript(selection.hasFormat('superscript'));
      setIsCode(selection.hasFormat('code'));

      // Update links
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (
        !$isCodeHighlightNode(selection.anchor.getNode()) &&
        selection.getTextContent() !== ''
      ) {
        setIsText($isTextNode(node));
      } else {
        setIsText(false);
      }

      const rawTextContent = selection.getTextContent().replace(/\n/g, '');
      if (!selection.isCollapsed() && rawTextContent === '') {
        setIsText(false);
        return;
      }

      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }
      const type = $isHeadingNode(element)
        ? element.getTag()
        : element.getType();
      console.log("TYPE IS", type);
      setBlockType(type);
      setFontColor(
        $getSelectionStyleValueForProperty(selection, "color", "#000")
      );
    });
  }, [editor]);

  useEffect(() => {
    document.addEventListener('selectionchange', updatePopup);
    return () => {
      document.removeEventListener('selectionchange', updatePopup);
    };
  }, [updatePopup]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        updatePopup();
      }),
      editor.registerRootListener(() => {
        if (editor.getRootElement() === null) {
          setIsText(false);
        }
      }),
    );
  }, [editor, updatePopup]);

  if (!isText || isLink) {
    return null;
  }

  return createPortal(
    <TextFormatFloatingToolbar
      editor={editor}
      anchorElem={anchorElem}
      isLink={isLink}
      isBold={isBold}
      isItalic={isItalic}
      isStrikethrough={isStrikethrough}
      isSubscript={isSubscript}
      isSuperscript={isSuperscript}
      isUnderline={isUnderline}
      isCode={isCode}
      blockType={blockType}
      fontColor={fontColor}
    />,
    anchorElem,
  );
}

export default function FloatingTextFormatToolbarPlugin({
                                                          anchorElem = document.body,
                                                        }: {
  anchorElem?: HTMLElement;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  return useFloatingTextFormatToolbar(editor, anchorElem);
}

