import React, { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';

import { ChallengeCompiler } from '../../Challenge/ChallengeCompiler/ChallengeCompiler';
import Editor from '../../Editor/Editor';
import { IChallenge } from '../../../interfaces/challenge.interface';
import { 
    saveEditContentCode,
    valideSubmitedCode,
} from '../../../store/reducers/challengesReducer';
import { ChallengeSectionsBtnEdit } from './ChallengeSectionsBtnEdit';
import { CodeEditorCase } from './CodeEditorCase';

export const EditorSection = ({challengeId, contentCode, codeSubmissions}) => {
    const userId = useAppSelector((state) => state.user.user._id);
    const currentCodeId = useAppSelector((state) => state.challenges.submitedCodeId);
    const submissionData = currentCodeId && 
        codeSubmissions.find((submission) => submission.submitedCodeId === currentCodeId)
        ?.submissionDetails?.submissionData

    const { code, cases } = contentCode as IChallenge["content"]["contentCode"];    
    const codeRef = useRef(code);
    
    const [casesState, setCases] = useState({
        case_0: cases.case_0,
        case_1: cases.case_1,
        case_2: cases.case_2,
    } as IChallenge["content"]["contentCode"]["cases"])
    const [isEdit, setEdit] = useState(false);
    const dispatch = useAppDispatch();

    const handleSubmitCode = async () => {
        console.log('code state: ', codeRef.current);
        await dispatch(valideSubmitedCode(
            {challengeId, userId, submitedCode: codeRef.current}
        ));
    }

    const handleEditSection = () => setEdit(true);
    const handleCancelEdit = () => setEdit(false);
    const handleSaveEdit = async () => {
        await dispatch(saveEditContentCode({
            _id: challengeId, 
            contentCode: {
                code: codeRef.current,
                cases: casesState,
            }
        }));
        setEdit(false);
    };

    const handleChangeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'input-case_0':
                setCases({
                    ...casesState,
                    case_0: {...casesState.case_0, input: value}
                })
                break;
            case 'input-case_1':
                setCases({
                    ...casesState,
                    case_1: {...casesState.case_1, input: value}
                })
                break;
            case 'input-case_2':
                setCases({
                    ...casesState,
                    case_2: {...casesState.case_2, input: value}
                })
                break;
            
            default:
                break;
        }
    }
    const handleChangeExpected = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'expected-case_0':
                setCases({
                    ...casesState,
                    case_0: {...casesState.case_0, expectedOutput: value}
                })
                break;
            case 'expected-case_1':
                setCases({
                    ...casesState,
                    case_1: {...casesState.case_1, expectedOutput: value}
                })
                break;
            case 'expected-case_2':
                setCases({
                    ...casesState,
                    case_2: {...casesState.case_2, expectedOutput: value}
                })
                break;
            
            default:
                break;
        }
    }

    return (
        <>
            <section className="code-editor-section">
                <div className="code-editor-wrapper mBS challenge-bsw">
                    <Editor 
                        code={code} 
                        lang="javascript"
                        sectionRef={codeRef}
                    />
                </div>
                {isEdit &&
                    <div className="code-editor-cases flex flex-column">
                        <CodeEditorCase
                            value={casesState.case_0}
                            names={{nameInput: 'input-case_0', nameExpected: 'expected-case_0'}}
                            callbacks={{
                                handleChangeInput,
                                handleChangeExpected,
                            }}
                        />
                        <CodeEditorCase
                            value={casesState.case_1}
                            names={{nameInput: 'input-case_1', nameExpected: 'expected-case_1'}}
                            callbacks={{
                                handleChangeInput,
                                handleChangeExpected,
                            }}
                        />
                        <CodeEditorCase
                            value={casesState.case_2}
                            names={{nameInput: 'input-case_2', nameExpected: 'expected-case_2'}}
                            callbacks={{
                                handleChangeInput,
                                handleChangeExpected,
                            }}
                        />
                    </div>
                }
            </section>
            <section className="sections-btn-edit">
                <ChallengeSectionsBtnEdit 
                    callbacks={{
                        handleEditSection,
                        handleCancelEdit,
                        handleSaveEdit,
                    }}
                    isEdit={isEdit}
                    sectionName='Editor'
                />
            </section>
            {!isEdit &&
                <div className="plT pmL pmR pmB run-code-wrapper">
                    <button className="btn-normal btn-primary" onClick={handleSubmitCode}>
                        <div className="ui-content">
                            <span className="ui-text">Submit Code</span>
                        </div>
                    </button>
                </div>
            }
            {   currentCodeId &&
            <section className="compiler-section">
                <ChallengeCompiler cases={submissionData}/>
            </section>
            }
        </>
    )
}