import React from 'react';

export const ChallengeSectionsBtnEdit = ({callbacks, isEdit, sectionName}) => {
    const { 
        handleCancelEdit,
        handleEditSection,
        handleSaveEdit
    } = callbacks;

    return (
        <div className="edit-challenge-wrapper flex flex-row">
            { isEdit &&
                <div className="btn-container-edit-cancel mMHR">
                    <button 
                        className="edit-challenge-button cancel" 
                        onClick={handleCancelEdit}>
                        Cancel Edit
                    </button>
                </div>
            }
            <div className="btn-container-edit-challenge flex">
                { !isEdit
                    ?
                    <button 
                        className="edit-challenge-button" 
                        onClick={handleEditSection}>
                        Edit {sectionName}
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
    )
}