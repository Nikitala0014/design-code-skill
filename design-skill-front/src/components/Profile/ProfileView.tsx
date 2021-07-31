
interface ChallengesProfile {
    bookmarked: [];
    solved: [];
    attempted: [],
}

export const ProfileView = ({challenges}) => {
    const { solved, attempted } = challenges as ChallengesProfile;
    console.log('attempted', attempted);
    
    return (
        <div className="profile-container">
            <header className="profile-header flex flex-column">
                <div className="profile-image"></div>
                <h1>Добро пожаловать, Nikita Lavrenov!</h1>
                <div className="profile-description-abilities">
                    Настройте параметры своего аккаунта, выберите избранные задачи, посмотрите
                    свой прогресс, вспомните решенные задачи и те, которые не удалось решить.
                    Одним словом - дерзайте.
                </div>
            </header>
            <section className="profile-challenges flex flex-wrap flex-between flex-column">
                <div className="profile-challenges-item solved">
                    <h1>Solved</h1>
                    {solved}
                </div>
                <div className="profile-challenges-item attempted">
                    <h1>Attempted</h1>
                    {attempted}
                </div>
            </section>
        </div>
    )
}