export const ChallengesView = ({renderedChallengeCards, title, callbacks}) => {
    const { handleChangeStatus, handleChangeDifficulty } = callbacks;
    return (
        <>
            <h1 className="challenges-title">Hello From Challenges of {title}</h1>
            <header className="challenges-header"></header>
            <main className="challenges-content">
                <div className="content-container">
                    <div className="challenges-list left-pane-challenges">
                        {renderedChallengeCards}
                    </div>
                    <div className="challenges-filter-section right-pane-challenges">
                        <div className="filter-group">
                            <div className="group-label">STATUS</div>
                            <div className="ui-checklist-list">
                                <div className="ui-checklist-item">
                                    <label className="label-wrap">
                                        <div className="checkbox-wrap">
                                            <input 
                                                type="checkbox" 
                                                className="checkbox-input"
                                                value="solved"
                                                onClick={handleChangeStatus}
                                            />
                                            <span className="custom-holder"></span>
                                        </div>
                                        <div className="label">
                                            Solved
                                        </div>
                                    </label>
                                </div>
                                <div className="ui-checklist-item">
                                    <label className="label-wrap">
                                        <div className="checkbox-wrap">
                                            <input 
                                                type="checkbox" 
                                                className="checkbox-input"
                                                value="unsolved"
                                                onClick={handleChangeStatus}
                                            />
                                            <span className="custom-holder"></span>
                                        </div>
                                        <div className="label">
                                            Unsolved
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="filter-group">
                            <div className="group-label">DIFFICULTY</div>
                            <div className="ui-checklist-list">
                                <div className="ui-checklist-item">
                                    <label className="label-wrap">
                                        <div className="checkbox-wrap">
                                            <input 
                                                type="checkbox" 
                                                className="checkbox-input"
                                                value="easy" 
                                                onClick={handleChangeDifficulty}
                                            />
                                            <span className="custom-holder"></span>
                                        </div>
                                        <div className="label">
                                            Easy
                                        </div>
                                    </label>
                                </div>
                                <div className="ui-checklist-item">
                                    <label className="label-wrap">
                                        <div className="checkbox-wrap">
                                            <input 
                                                type="checkbox" 
                                                className="checkbox-input"
                                                value="medium"
                                                onClick={handleChangeDifficulty}
                                            />
                                            <span className="custom-holder"></span>
                                        </div>
                                        <div className="label">
                                            Medium
                                        </div>
                                    </label>
                                </div>
                                <div className="ui-checklist-item">
                                    <label className="label-wrap">
                                        <div className="checkbox-wrap">
                                            <input 
                                                type="checkbox" 
                                                className="checkbox-input"
                                                value="hard"
                                                onClick={handleChangeDifficulty}
                                            />
                                            <span className="custom-holder"></span>
                                        </div>
                                        <div className="label">
                                            Hard
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}