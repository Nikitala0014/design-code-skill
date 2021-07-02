import React, { useRef } from 'react'

import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { ViewUpdate } from '@codemirror/view';

export default function Editor({handleSubmit, code}) {
    const editorRef = useRef(document.createElement('div'));

    const startState = EditorState.create({
        doc: code,
        extensions: [
            basicSetup, 
            javascript(),
            EditorView.updateListener.of((v: ViewUpdate) => {
                const prevState = v.startState.doc.toString();
                const newState = v.state.doc.toString();
                newState !== prevState ? console.log(newState) : console.log('');
            }),
            EditorView.theme({
                "&.cm-focused": {outline: "none"},
                ".cm-gutters": {
                    background: "white",
                    color: "#4d41d644",
                },
                ".cm-selectionBackground": {
                    background: "rgba(50, 50, 168, 0.20) !important",
                },
                ".cm-activeLineGutter": {background: "white", color: "#4D41D6"},
                "&.cm-focused .cm-content": {color: "dark"},
                ".cm-line": {
                    border: "2px solid transparent",
                    borderLeft: "none",
                    borderRight: "none",
                },
                ".cm-activeLine": {
                    background: "white",
                    borderColor: "#4d41d644",
                }
            }),
        ],
    });
    const view = new EditorView({
        state: startState,
        parent: editorRef.current
    });

    return (
        <>
            <div ref={ref => ref?.appendChild(view.dom)} className="editor"></div>
        </>
    )
}
