import React, { useState, useRef } from 'react';
import { useAppDispatch } from '../../../store/store';

import Editor from '../../Editor/Editor';
import { saveEditContentProblem } from '../../../store/reducers/challengesReducer';
import { ChallengeSectionsBtnEdit } from './ChallengeSectionsBtnEdit';
import { problemTemplate } from '../../../store/reducers/make-do';

export const ProblemSection = ({children, content, challengeId}) => {
    const problemRef = useRef(children ? children : problemTemplate);
    const [isEdit, setEdit] = useState(false);
    const dispatch = useAppDispatch();

    const handleEditSection = () => setEdit(true);
    const handleCancelEdit = () => setEdit(false);
    const handleSaveEdit = async () => {  
        await dispatch(saveEditContentProblem({_id: challengeId, contentProblem: problemRef.current}));
        setEdit(false);
    }

    return (
        <>
            <section className="challenge-problem-section challenge-bsw">
                {isEdit ?  
                <> 
                    <Editor 
                        code={children ? children : problemTemplate} 
                        lang="html"
                        sectionRef={problemRef}
                    />
                </>
                :   <div 
                        ref={ref => ref?.appendChild(content)}
                        className="challenge-problem-wrapper pB">
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
                    sectionName='Problem'
                />
            </section>
        </>
    )
}