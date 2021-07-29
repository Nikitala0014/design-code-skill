import { Link } from 'react-router-dom';

import { IChallenge } from "../../../interfaces/challenge.interface";

export const ChallengeCardView = ({challenge, role, callbacks, chapter, course, classForCard}) => {
    const { _id, title, details, preview } = challenge as IChallenge;
    const { difficulty, skill, maxScore, successRatio } = details;
    const { 
        handleChangeCard, 
        handleDeleteChallenge,
        handleAddChallenge,
        handleSolveChallenge,
    } = callbacks;
    return (
        <div id={_id} className={`challenge-card pB mBL mLL ${classForCard}`}>
            <header className="challenge-card-header flex flex-column flex-wrap flex-between">
                <h4 className="challenge-card-title">
                    {role === 'Root'
                    ? <input 
                        type="text"
                        name="challenge-title"
                        value={title as string}
                        autoComplete="off"
                        onChange={handleChangeCard}
                        size={title.length}
                        />
                    : title}
                </h4>
                <span className="challenge-card-details pTS">
                    <span className={`
                    ${difficulty === 'Medium' ? 'difficulty-medium' 
                    : difficulty === 'Easy' ? 'difficulty-easy' : 'difficulty-hard' }
                    detail-item`}>
                        {role === 'Root'
                        ? <input 
                            type="text"
                            name="challenge-difficulty"
                            value={difficulty}
                            autoComplete="off"
                            onChange={handleChangeCard}
                            size={difficulty.length - 2}
                            />
                        : difficulty
                        },
                    </span>
                    <span className="skill detail-item"> Problem Solving ({
                        role === 'Root'
                        ? <input 
                            type="text"
                            name="challenge-skill"
                            value={skill}
                            autoComplete="off"
                            onChange={handleChangeCard}
                            size={skill.length - 4}
                            />
                        : skill
                    }),</span>
                    <span className="max-score detail-item"> Max Score: {
                        role === 'Root'
                        ? <input 
                            type="text"
                            name="challenge-maxScore"
                            value={maxScore}
                            autoComplete="off"
                            onChange={handleChangeCard}
                            size={maxScore.length}
                            />
                        : maxScore
                    },</span>
                    <span className="success-ratio detail-item"> Success Ratio: {
                        role === 'Root'
                        ? <input 
                            type="text" 
                            name="challenge-successRatio"
                            value={successRatio}
                            autoComplete="off"
                            onChange={handleChangeCard}
                            size={successRatio.length}
                            />
                        : successRatio
                    },</span>
                </span>
            </header>
            <div className={`
                preview-box mTS flex flex-row flex-wrap flex-between flex-end
                ${role === 'User' && 'preview-margin'}
            `}>
                <div className="challenge-card-preview">{
                    role === 'Root'
                    ? <input 
                        type="text"
                        name="challenge-preview"
                        value={preview}
                        autoComplete="off"
                        onChange={handleChangeCard}
                        size={preview.length}
                        />
                    : preview
                }</div>
                <span className="bookmark-cta"></span>
                <div className="btn-container">
                    {_id !== '0' &&
                        <Link to={`/${course}/arrays/challenges/${title}/problem`}>
                            <button className="btn-challenge pS mTS mBS mRS" onClick={handleSolveChallenge}>
                                Solve Challenge
                            </button>
                        </Link>
                    }
                    {_id === '0' &&
                        <button className="btn-challenge preview-margin pS mTS mBS mRS" onClick={handleAddChallenge}>
                            Add Challenge
                        </button>
                    }
                    {role === 'Root' && _id !== '0' &&
                        <button 
                            className="btn-challenge btn-delete-challenge pS mTS mBS mRS" 
                            onClick={handleDeleteChallenge}>
                            Delete Challenge
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}