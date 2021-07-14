import React, { useRef, useEffect } from 'react'

import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { ViewUpdate } from '@codemirror/view';

export default function Editor({code, lang}) {
    const editorRef = useRef(document.createElement('div'));

    const langToUse = lang === 'javascript' ? javascript() : html();
    const startState = EditorState.create({
        doc: code,
        extensions: [
            basicSetup, 
            langToUse,
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
                ".cm-content": {background: "white !important"},
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

    useEffect(() => {
        return () => {
            view.dom.remove()
        }
    })
    return (
        <>
            <div ref={ref => ref?.appendChild(view.dom)} className="editor"></div>
        </>
    )
}
