import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle
} from 'react';
import { EditorSelection, EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { markdown } from '@codemirror/lang-markdown';
import { basicSetup } from 'codemirror';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

// Define the type for the ref, specifying the focus method
interface MarkdownEditorHandle {
  focus: () => void;
  addText: (text: string) => void;
}

// const myTheme = EditorView.theme({
//   '&': {
//     // color: '#f8f8f2'
//     backgroundColor: '#CAC4D0' // Tùy chỉnh background cho toàn bộ editor
//   },
//   '.cm-content': {
//     // fontFamily: 'monospace', // Thay đổi font
//     // caretColor: '#ff79c6' // Thay đổi màu con trỏ
//   },
//   '.cm-gutters': {
//     backgroundColor: '#CAC4D0',
//     color: '#f8f8f2',
//     border: '#CAC4D0' // Xóa đường viền của gutter
//   }
// });

const MarkdownEditor = forwardRef<MarkdownEditorHandle, MarkdownEditorProps>(
  ({ value, onChange }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const editorViewRef = useRef<EditorView | null>(null);

    useEffect(() => {
      if (editorRef.current && !editorViewRef.current) {
        const state = EditorState.create({
          doc: value,
          extensions: [
            basicSetup,
            markdown(),
            keymap.of([
              {
                key: 'Mod-b', // 'Mod' represents 'Ctrl' on Windows/Linux and 'Cmd' on Mac
                run: () => {
                  handleAddFormatting('**');
                  return true;
                }
              },
              {
                key: 'Mod-i',
                run: () => {
                  handleAddFormatting('_');
                  return true;
                }
              }
            ]),
            EditorView.lineWrapping,
            EditorView.updateListener.of((update) => {
              if (update.docChanged) {
                const doc = update.state.doc;
                const newValue = doc.toString();
                onChange(newValue);
              }
            })
          ]
        });

        editorViewRef.current = new EditorView({
          state,
          parent: editorRef.current
        });

        return () => {
          if (editorViewRef.current) {
            editorViewRef.current.destroy();
            editorViewRef.current = null;
          }
        };
      }
    }, [onChange]);

    useImperativeHandle(
      ref,
      () => ({
        focus() {
          editorViewRef.current?.focus();
        },
        addText(text: string) {
          if (editorViewRef.current) {
            const { state } = editorViewRef.current;
            const transaction = state.update({
              changes: { from: state.selection.main.from, insert: text }
            });
            editorViewRef.current.dispatch(transaction);
          }
        }
      }),
      []
    );

    const handleAddFormatting = (format: string) => {
      if (editorViewRef.current) {
        const { state } = editorViewRef.current;
        const { from, to } = state.selection.main;

        const selectedText = state.doc.sliceString(from, to);
        const newText = format + selectedText + format;

        const transaction = state.update({
          changes: { from, to, insert: newText },
          selection: EditorSelection.single(
            from + format.length,
            to + format.length
          )
        });

        editorViewRef.current.dispatch(transaction);
      }
    };

    return <div ref={editorRef} className="h-full w-full"></div>;
  }
);

export default MarkdownEditor;
