import { Link } from 'react-router-dom';

import { IChallenge } from "../../../interfaces/challenge.interface";

export const ChallengeCardView = ({challenge, role, callbacks, style, chapter, course}) => {
    const { _id, title, details, preview } = challenge as IChallenge;
    const { difficulty, skill, maxScore, successRatio } = details;
    const { 
        handleChangeChallenge, 
        handleDeleteChallenge,
        handleAddChallenge,
        handleChangeTitle,
    } = callbacks;
    return (
        <>
            <div id={_id} className={`${style} pB mBL mLL`}>
                <header className="challenge-card-header flex flex-column flex-wrap flex-between">
                    <h4 className="challenge-card-title">
                        {role === 'Root'
                        ? <input 
                            type="text"
                            name="challenge-title"
                            value={title as string}
                            autoComplete="off"
                            onChange={handleChangeTitle}
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
                                onChange={handleChangeChallenge}
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
                                onChange={handleChangeChallenge}
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
                                onChange={handleChangeChallenge}
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
                                onChange={handleChangeChallenge}
                                size={successRatio.length}
                              />
                            : successRatio
                        },</span>
                    </span>
                </header>
                <div className="preview-box mTS flex flex-row flex-wrap flex-between flex-end">
                    <div className="challenge-card-preview">{
                        role === 'Root'
                        ? <input 
                            type="text"
                            name="challenge-preview"
                            value={preview}
                            autoComplete="off"
                            onChange={handleChangeChallenge}
                            size={preview.length}
                          />
                        : preview
                    }</div>
                    <span className="bookmark-cta"></span>
                    <div className="btn-container">
                        {style === 'challenge-card' &&
                            <Link to={`/${course}/arrays/challenges/${title}/problem`}>
                                <button className="btn-challenge pS mTS mBS mRS">Solve Challenge</button>
                            </Link>
                        }
                        {style === 'new-challenge-card' &&
                            <button className="btn-challenge pS mTS mBS mRS" onClick={handleAddChallenge}>
                                Add Challenge
                            </button>
                        }
                        {role === 'Root' && style === 'challenge-card' &&
                            <button 
                                className="btn-challenge btn-delete-challenge pS mTS mBS mRS" 
                                onClick={handleDeleteChallenge}>
                                Delete Challenge
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}