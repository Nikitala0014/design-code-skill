import React, { useState, useEffect } from 'react';
import './ChallengeHeader.scss';
import { ChallengeNavigation } from '../ChallengeNavigation/ChallengeNavigation';

export const ChallengeHeader = ({problem, editorial, role}) => {
    const { isEditProblem, setEditProblem } = problem;
    const { isEditEditorial, setEditEditorial } = editorial;
    const [selectedSection, setSelectedSection] = useState('Problem');

    useEffect(() => {
        setEditProblem(false);
        setEditEditorial(false);
    }, [selectedSection, setEditEditorial, setEditProblem])

    function handleSaveEdit() {
        return ''
    }

    const handleEditSection = () => {
        return selectedSection === 'Problem' ? setEditProblem(true) : setEditEditorial(true);
    }

    const handleCancelEdit = () => {
        return selectedSection === 'Problem' ? setEditProblem(false) : setEditEditorial(false);
    }

    return (
        <div className="challenge-page-header container">
            <div className="ui-tabs-wrap">
                <div className="render-list">
                    <div className="tab-header" role="navigation">
                        <ChallengeNavigation label="Problem" selected={setSelectedSection} />
                        <ChallengeNavigation label="Submissions" selected={setSelectedSection} />
                        <ChallengeNavigation label="Editorial" selected={setSelectedSection} />
                    </div>
                </div>
                { role === 'Root' &&
                    <div className="edit-challenge-wrapper">
                        { (isEditProblem || isEditEditorial) &&
                            <div className="btn-container-edit-cancel">
                                <button 
                                    className="edit-challenge-button cancel" 
                                    onClick={handleCancelEdit}>
                                    Cancel Edit
                                </button>
                            </div>
                        }
                        <div className="btn-container-edit-challenge">
                            { !isEditProblem && !isEditEditorial
                                ?
                                <button 
                                    className="edit-challenge-button" 
                                    onClick={handleEditSection}>
                                    Edit {selectedSection}
                                </button>
                                :
                                <button 
                                    className="edit-challenge-button save" 
                                    onClick={handleSaveEdit}>
                                    Save Edit
                                </button>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
