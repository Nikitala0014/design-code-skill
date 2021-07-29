import { ChapterForm } from '../Forms/ChapterForm/ChapterFormContainer';

export const ChaptersView = ({renderedListChapterCard, role}) => {
    return (
        <>
            <header className="chapters-header mS">
                <h1>
                    The Interview Preparation Kit
                </h1>
            </header>
            <section className="chapters-info-banner">
                <div className="chapters-info-banner__container flex flex-row flex-between">
                    <div className="banner-block">
                        <h2>Learnings from 1000+ Companies</h2>
                        <p>
                            We have carefully curated these challenges to help you 
                            prepare in the most comprehensive way possible.
                        </p>
                    </div>
                    <div className="banner-block">
                        <h2>Key concepts</h2>
                        <p>
                            Challenges are organised around core concepts 
                            commonly tested during Interviews.
                        </p>
                    </div>
                    <div className="banner-block">
                        <h2>How to prepare</h2>
                        <p>
                            Try to solve as many challenges from this list as possible.
                            If you are stuck, use the Discussion and Editorial sections for hints and solutions
                        </p>
                    </div>
                </div>
            </section>
            <main className="chapters-content">
                <div className="container">
                    <div className="chapters-content-playlist flex flex-row flex-justify-start flex-wrap">
                        {renderedListChapterCard}
                        { role !== 'User' && <ChapterForm /> }
                    </div>
                </div>
            </main>
        </>
    )
}