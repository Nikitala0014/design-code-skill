export const EditorSection = ({code, Editor}) => {
    return (
        <section className="code-editor-section">
            <div className="code-editor-wrapper challenge-bsw">
                <Editor code={code} lang="javascript" />
            </div>
            <div className="plT pmL pmR pmB run-code-wrapper">
                <button className="btn-normal btn-primary">
                    <div className="ui-content">
                        <span className="ui-text">Submit Code</span>
                    </div>
                </button>
            </div>
        </section>
    )
}