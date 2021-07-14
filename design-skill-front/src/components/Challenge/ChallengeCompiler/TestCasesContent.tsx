import React from 'react';

export const TestCasesContent = ({status, input, userOutput, expectedOutput}) => {
    const compilerMessage = status === 'error' ? 'Неправильный ответ' : 'Ответ верный'
    return (
        <div className="tab-list-content">
            <div className="d-flex flex-column flex-wrap tab-pane-content">
                <div className="compile-message flex-display">
                    <div className="d-flex compile-field-label">
                        Сообщение компилятора
                    </div>
                    <div className="compile-output-message">
                        <div className="d-flex compiler-message">
                            <pre>
                                <code>{compilerMessage}</code>
                            </pre>
                        </div>
                    </div>
                </div>
                <div className="stdin flex-display">
                    <div className="d-flex compile-field-label">
                        Входные данные
                    </div>
                    <div className="compile-output-message">
                        <ul className="lines-container">
                            <li className="d-flex">
                                <span className="lines-container__content-wrapper">
                                    <pre className="lines-container__content">{input.length}</pre>
                                </span>
                            </li>
                            <li className="d-flex">
                                <span className="lines-container__content-wrapper">
                                    <pre className="lines-container__content">{input.join(' ')}</pre>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="user-output flex-display">
                    <div className="d-flex compile-field-label">
                        Ваш ответ
                    </div>
                    <div className="compile-output-message">
                        <ul className="lines-container">
                            <li className="d-flex">
                                <span className="lines-container__content-wrapper">
                                    <pre className="lines-container__content">{userOutput}</pre>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="expected-output flex-display">
                    <div className="d-flex compile-field-label">
                        Ожидаемый ответ
                    </div>
                    <div className="compile-output-message">
                        <ul className="lines-container">
                            <li className="d-flex">
                                <span className="lines-container__content-wrapper">
                                    <pre className="lines-container__content">{expectedOutput}</pre>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}