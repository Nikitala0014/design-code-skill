export const SidebarSection = ({username, diff, score}) => {
    const diffClass = diff === 'medium' ? 'difficulty-medium' 
    : diff === 'hard' ? 'difficulty-hard' : 'difficulty-easy';
    return (
        <div className="sidebar-problem-difficulty">
            <div className="difficulty-block">
                <p className="difficulty-label">Author</p>
                <div className="ui-tooltip-wrapper">
                    <a href="/profile/NikitaLa00" className="text-link link-style">
                        {username}
                    </a>
                </div>
            </div>
            <div className="difficulty-block">
                <p className="difficulty-label">Difficulty</p>
                <p className={diffClass}>{diff}</p>
            </div>
            <div className="difficulty-block">
                <p className="difficulty-label">Max Score</p>
                <p className="difficulty-score">{score}</p>
            </div>
            <div className="difficulty-block">
                <p className="difficulty-label">Submitted By</p>
                <a href="/challenges/leaderboard" className="text-link">1</a>
            </div>
        </div>
    )
}