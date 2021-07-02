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
        <div data-testid={_id} className={style}>
            {role === 'User' && 
                <div className="chapter-card-content">
                    <h3 className="chapter-card-title">{title}</h3>
                    <div className="chapter-card-detail">{detail}</div>
                </div>
            }
            {role === 'Root' &&
                <div>
                    <h3 className="chapter-card-title">
                        <input 
                            type="text" 
                            name="chapter-title" 
                            value={title as string} 
                            onChange={handleChangeTitle} />
                    </h3>
                    <div className="chapter-card-detail">
                        <input 
                            type="text" 
                            name="chapter-detail" 
                            value={detail as string} 
                            onChange={handleChangeDetail} />
                    </div>
                </div>
            }
            {style === 'chapter-card' && 
                <Link to={`/${course}/${title.toLowerCase()}/challenges`}> 
                    <button className="btn" onClick={handleSeeChallenges}>
                        See Challenges
                    </button>
                </Link>
            }
            {style === 'new-chapter-card' &&
                <button className="btn" onClick={handleAddChapter}>
                    Add Chapter
                </button>
            }
            {   
                role === 'Root'
                &&
                <button className="btn btn-delete" onClick={handleDeleteChapter}>
                    Delete Chapter
                </button>
            }
        </div>
    )
}