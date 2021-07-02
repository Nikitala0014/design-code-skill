export const ChallengeFormView = ({title, status, diff, preview, handleChange, handleSubmit}) => {
    return (
        <>
            <form onSubmit={handleSubmit} aria-label="challenge">
                <label>
                    Title
                    <input data-testid="title" type="text" value={title} name="title" onChange={handleChange} />
                </label>
                <label>
                    Status
                    <input type="text" value={status} name="status" onChange={handleChange} />
                </label>
                <label>
                    Difficulty
                    <input type="text" value={diff} name="diff" onChange={handleChange} />
                </label>
                <label>
                    Preview
                    <input type="text" value={preview} name="preview" onChange={handleChange} />
                </label>
                <button type="submit">Add</button>
            </form>
        </>
    )
}