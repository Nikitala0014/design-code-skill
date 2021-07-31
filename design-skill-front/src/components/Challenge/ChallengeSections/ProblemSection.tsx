import React, { useState, useRef, useContext, useEffect } from 'react';
import { useAppDispatch } from '../../../store/store';

import Editor from '../../Editor/Editor';
import { saveEditContentProblem } from '../../../store/reducers/challengesReducer';
import { ChallengeSectionsBtnEdit } from './ChallengeSectionsBtnEdit';
import { problemTemplate } from '../../../store/reducers/make-do';
import { UserRoleContext } from '../../../Context';

export const ProblemSection = ({children, content, challengeId}) => {
    const role = useContext(UserRoleContext);
    const problemRef = useRef(children ? children : problemTemplate);
    const [isEdit, setEdit] = useState(false);
    const dispatch = useAppDispatch();
    const problemContentRef = useRef(content);

    const handleEditSection = () => setEdit(true);
    const handleCancelEdit = () => setEdit(false);
    const handleSaveEdit = async () => {  
        await dispatch(saveEditContentProblem({_id: challengeId, contentProblem: problemRef.current}));
        setEdit(false);
    }

    useEffect(() => {
        console.log('content', content);
        
    }, [content])

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
                        ref={ref => ref?.appendChild(problemContentRef.current)}
                        className="challenge-problem-wrapper pB">
                    </div>
                }
            </section>
            {role === 'Root' &&
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
            }
        </>
    )
}