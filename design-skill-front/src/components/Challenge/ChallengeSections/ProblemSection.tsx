import React from 'react';

export const ProblemSection = ({isEdit, children, content, Editor}) => {
return (
        <section className="challenge-problem-section challenge-bsw">
            {isEdit
            ?   <Editor code={children} lang="html" />
            :   <div 
                    ref={ref => ref?.appendChild(content)}
                    className="challenge-problem-wrapper pB">
                </div>
            }
        </section>
    )
}