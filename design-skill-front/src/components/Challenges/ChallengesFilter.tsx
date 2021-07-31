export const ChallengesFilter = ({callbacks}) => {
    const { handleChangeStatus, handleChangeDifficulty } = callbacks;
    return (
        <>
            <div className="filter-group mBL">
                <div className="group-label mBS">STATUS</div>
                <div className="ui-checklist-list">
                    <div className="ui-checklist-item mRM mBS">
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
                    <div className="ui-checklist-item flex mRM mBS">
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
            <div className="filter-group mBL">
                <div className="group-label mBS">DIFFICULTY</div>
                <div className="ui-checklist-list">
                    <div className="ui-checklist-item flex mRM mBS">
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
                    <div className="ui-checklist-item flex mRM mBS">
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
                    <div className="ui-checklist-item flex mRM mBS">
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
        </>
    )
}