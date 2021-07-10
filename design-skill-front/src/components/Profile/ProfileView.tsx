
interface ChallengesProfile {
    bookmarked: [];
    solved: [];
    attempted: [],
}

export const ProfileView = ({challenges}) => {
    const { bookmarked, solved, attempted } = challenges as ChallengesProfile;
    return (
        <div className="profile-container">
            <header className="profile-header">
                <div className="profile-image"></div>
                <h1>Добро пожаловать, Nikita Lavrenov!</h1>
                <div className="profile-description-abilities">
                    Настройте параметры своего аккаунта, выберите избранные задачи, посмотрите
                    свой прогресс, вспомните решенные задачи и те, которые не удалось решить.
                    Одним словом - дерзайте.
                </div>
            </header>
            <section className="profile-challenges">
                <div className="profile-challenges-item bookmarked">
                    <h1>Bookmarked</h1>
                    {bookmarked}
                </div>
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