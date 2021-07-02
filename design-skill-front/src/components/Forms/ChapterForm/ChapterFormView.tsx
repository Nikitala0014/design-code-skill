export const ChapterFormView = ({title, detail, handleChange, handleSubmit}) => {
    return (
        <>
            <form aria-label="chapter" onSubmit={handleSubmit}>
                <label>
                    Title
                    <input type="text" value={title} name="title" onChange={handleChange} />
                </label>
                <label>
                    Detail
                    <input type="text" value={detail} name="detail" onChange={handleChange} />
                </label>
                <button type="submit">Add</button>
            </form>
        </>
    )
}