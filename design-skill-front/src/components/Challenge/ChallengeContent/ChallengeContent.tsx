import React from 'react';
import './ChallengeContent.scss';

import Editor from '../../Editor/Editor';

import { code } from '../../../store/reducers/make-do';

export default function ChallengeContent({children}) {

    function handleSubmit() {
        console.log('submit code state');
    }

    return (
        <>
            <section className="challenge-problem-section" >
                    <div 
                        ref={ref => ref?.appendChild(children)}
                        className="challenge-problem-wrapper">
                    </div>
            </section>
            <section className="code-editor-section">
                <div className="code-editor-wrapper">
                    <Editor handleSubmit={handleSubmit} code={code} />
                </div>
                <div className="plT pmL pmR pmB run-code-wrapper">
                    <button className="btn-normal btn-primary">
                        <div className="ui-content">
                            <span className="ui-text">Submit Code</span>
                        </div>
                    </button>
                </div>
            </section>
        </>
    )
}
