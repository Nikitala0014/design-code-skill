import { ChallengeForm } from '../Forms/ChallengeForm/ChallengeFormContainer';
import { ChallengesFilter } from './ChallengesFilter';

export const ChallengesView = ({renderedChallengeCards, title, callbacks, role}) => {
    const { handleChangeStatus, handleChangeDifficulty } = callbacks;
    return (
        <div className="theme-grey">
            <header className="challenges-header">
                <h1 className="challenges-title mLL pTM pBM">
                    Hello From Challenges of {title}
                </h1>
            </header>
            <main className="challenges-content pTL">
                <div className="content-container flex flex-row flex-nowrap">
                    <div className="challenges-list left-pane-challenges mBL">
                        {renderedChallengeCards}
                        { role !== 'User' && <ChallengeForm /> }
                    </div>
                    <div className="challenges-filter-section right-pane-challenges mBL mLL">
                        {false && <ChallengesFilter callbacks={{
                            handleChangeStatus, handleChangeDifficulty
                        }} />}
                    </div>
                </div>
            </main>
        </div>
    )
}