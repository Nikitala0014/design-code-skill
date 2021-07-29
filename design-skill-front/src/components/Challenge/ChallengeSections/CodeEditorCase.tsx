export const CodeEditorCase = ({names, value, callbacks}) => {
    const { handleChangeInput, handleChangeExpected } = callbacks;
    
    return (
        <div className="code-editor-case flex flex-row flex-nowrap">
            <label className="code-editor-case__input">
                Input
                <input 
                    type="text" 
                    name={names.nameInput} 
                    value={value.input}
                    onChange={handleChangeInput}
                />
            </label>
            <label className="code-editor-case__input">
                Expected Output
                <input 
                    type="text" 
                    name={names.nameExpected} 
                    value={value.expectedOutput}
                    onChange={handleChangeExpected}
                />
            </label>
        </div>
    )
}