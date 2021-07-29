import React, { useState, useRef } from 'react';
import { useAppDispatch } from '../../../store/store';

import Editor from '../../Editor/Editor';
import { saveEditContentEditorial } from '../../../store/reducers/challengesReducer';
import { ChallengeSectionsBtnEdit } from './ChallengeSectionsBtnEdit';

export const EditorialSection = ({children, content, challengeId}) => {
    const editorialRef = useRef(children);
    const [isEdit, setEdit] = useState(false);
    const dispatch = useAppDispatch();

    const handleEditSection = () => setEdit(true);
    const handleCancelEdit = () => setEdit(false);
    const handleSaveEdit = async () => {
        await dispatch(saveEditContentEditorial({_id: challengeId, contentEditorial: editorialRef.current}));
        setEdit(false);
    };

    return (
        <>
            <section className="challenge-editorial-section challenge-bsw">
                {isEdit
                ?   <Editor 
                        code={children} 
                        lang="html"
                        sectionRef={editorialRef}
                    />
                :   <div 
                        ref={ref => ref?.appendChild(content)}
                        className="challenge-editorial-wrapper pB">
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
                    sectionName='Editorial'
                />
            </section>
        </>
    )
}