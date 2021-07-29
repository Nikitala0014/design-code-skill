import React from "react";
import { Link } from "react-router-dom";

export const ChapterCardView = ({chapter, callbacks, role, course, classForCard}) => {
    const {_id, title, detail} = chapter;
    const {
        handleSeeChallenges,
        handleChangeCard,
        handleAddChapter,
        handleDeleteChapter,
    } = callbacks;

    return (
        <div data-testid={_id} className={`${classForCard} pM mM`}>
            {role === 'User' && 
                <div className="chapter-card-content">
                    <h3 className="chapter-card-title">{title}</h3>
                    <div className="chapter-card-detail mBM">{detail}</div>
                </div>
            }
            {role === 'Root' &&
                <div>
                    <h3 className="chapter-card-title mTS mBS mRN mLN">
                        <input 
                            type="text" 
                            name="chapter-title" 
                            value={title as string} 
                            onChange={handleChangeCard} />
                    </h3>
                    <div className="chapter-card-detail mBM">
                        <input 
                            type="text" 
                            name="chapter-detail" 
                            value={detail as string} 
                            onChange={handleChangeCard} />
                    </div>
                </div>
            }
            <div className="flex flex-column flex-nowrap">
                {_id !== '0' && 
                    <Link to={`/${course}/${title.toLowerCase()}/challenges`} className="link"> 
                        <button className="btn mTS mBS" onClick={handleSeeChallenges}>
                            See Challenges
                        </button>
                    </Link>
                }
                {_id === '0' &&
                    <button className="btn mTS mBS" onClick={handleAddChapter}>
                        Add Chapter
                    </button>
                }
                {(role === 'Root' && _id !== '0') &&
                    <button className="btn btn-delete mTS mBS" onClick={handleDeleteChapter}>
                        Delete Chapter
                    </button>
                }
            </div>
        </div>
    )
}