import React from 'react';

export const EditorialSection = ({isEdit, children, content, Editor}) => {
    return (
            <section className="challenge-editorial-section challenge-bsw">
                {isEdit
                ?   <Editor code={children} lang="html" />
                :   <div 
                        ref={ref => ref?.appendChild(content)}
                        className="challenge-editorial-wrapper">
                    </div>
                }
            </section>
        )
}