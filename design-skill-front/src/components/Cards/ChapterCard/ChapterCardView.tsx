import React from "react";
import { Link } from "react-router-dom";

export const ChapterCardView = ({chapter, callbacks, role, style, course}) => {
    const {_id, title, detail} = chapter;
    const {
        handleSeeChallenges,
        handleChangeTitle, 
        handleChangeDetail, 
        handleAddChapter,
        handleDeleteChapter,
    } = callbacks;

    return (
        <div data-testid={_id} className={`${style} pM mM`}>
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
                            onChange={handleChangeTitle} />
                    </h3>
                    <div className="chapter-card-detail mBM">
                        <input 
                            type="text" 
                            name="chapter-detail" 
                            value={detail as string} 
                            onChange={handleChangeDetail} />
                    </div>
                </div>
            }
            <div className="flex flex-column flex-nowrap">
                {style === 'chapter-card' && 
                    <Link to={`/${course}/${title.toLowerCase()}/challenges`} className="link"> 
                        <button className="btn mTS mBS" onClick={handleSeeChallenges}>
                            See Challenges
                        </button>
                    </Link>
                }
                {style === 'new-chapter-card' &&
                    <button className="btn mTS mBS" onClick={handleAddChapter}>
                        Add Chapter
                    </button>
                }
                {   
                    role === 'Root'
                    &&
                    <button className="btn btn-delete mTS mBS" onClick={handleDeleteChapter}>
                        Delete Chapter
                    </button>
                }
            </div>
        </div>
    )
}