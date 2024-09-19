import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import { EditorView, keymap } from '@codemirror/view';
import { EditorSelection, EditorState } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import {
  acceptCompletion,
  autocompletion,
  completeFromList
} from '@codemirror/autocomplete';
import { indentWithTab } from '@codemirror/commands';

interface PseudoEditorProps {
  value: string;
  onChange: (value: string) => void;
}

interface PseudoEditorHandle {
  focus: () => void;
  clearContent: () => void;
  addText: (text: string) => void;
}

const PseudoEditor = forwardRef<PseudoEditorHandle, PseudoEditorProps>(
  ({ value, onChange }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const editorViewRef = useRef<EditorView | null>(null);

    const handleFocus = () => {
      console.log('🚀 ~ handleFocus ~ editorRef.current:', editorRef.current);
      if (editorRef.current) {
        editorRef.current.focus();
      }
    };

    useEffect(() => {
      if (editorRef.current && !editorViewRef.current) {
        // Danh sách từ khóa cho gợi ý code
        const keywords = [
          { label: 'BEGIN', type: 'keyword' },
          { label: 'END', type: 'keyword' },
          { label: 'IF', type: 'keyword' },
          { label: 'ELSE', type: 'keyword' },
          { label: 'ENDIF', type: 'keyword' },
          { label: 'WHILE', type: 'keyword' },
          { label: 'DO', type: 'keyword' },
          { label: 'ENDWHILE', type: 'keyword' },
          { label: 'INPUT', type: 'function' },
          { label: 'OUTPUT', type: 'function' }
          // Thêm các từ khóa khác nếu cần
        ];

        const state = EditorState.create({
          doc: value,
          extensions: [
            basicSetup,
            autocompletion({
              override: [completeFromList(keywords)]
            }),
            keymap.of([
              {
                key: 'Tab',
                run: (view) => {
                  const completionAccepted = acceptCompletion(view);
                  if (completionAccepted) {
                    return true; // Nếu có gợi ý được chấp nhận, trả về true
                  }
                  handleAddText('    ');
                  view.focus();
                  return false;
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
            // Thêm các phím tắt cho tab và format nếu cần
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
        clearContent() {
          if (editorViewRef.current) {
            const { state } = editorViewRef.current;

            const transaction = state.update({
              changes: {
                from: 0,
                to: state.doc.length,
                insert: ''
              }
            });

            editorViewRef.current.dispatch(transaction);
          }
        },
        addText(text: string) {
          handleAddText(text);
        }
      }),
      []
    );

    const handleAddText = (text: string) => {
      if (editorViewRef.current) {
        const { state } = editorViewRef.current;

        // Kiểm tra xem vị trí con trỏ (selection) có tồn tại không
        const cursorPos = state.selection.main.empty
          ? state.selection.main.from
          : state.selection.main.to; // Nếu không có con trỏ, đặt vào cuối tài liệu

        // Tạo một transaction để thêm văn bản
        const transaction = state.update({
          changes: {
            from: cursorPos === 0 ? state.doc.length : cursorPos,
            insert: text
          },
          selection: { anchor: state.selection.main.from + text.length }, // Move cursor to the end of the inserted spaces
          scrollIntoView: true // Ensure that the cursor stays in view after the change
        });

        // Dispatch transaction để cập nhật văn bản
        editorViewRef.current.dispatch(transaction);
        setTimeout(() => editorViewRef.current?.focus(), 10);
      }
    };
    
    return <div ref={editorRef} className="h-full w-full" />;
  }
);

export default PseudoEditor;
