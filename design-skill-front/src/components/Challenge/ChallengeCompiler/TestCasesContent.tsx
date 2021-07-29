import React from 'react';

export const TestCasesContent = ({status, input, result, expected}) => {
    const compilerMessage = status === 'Error' ? 'Неправильный ответ' : 'Ответ верный'
    return (
        <div className="tab-list-content pMHT pMHB pRL pLL">
            <div className="flex flex-column flex-wrap tab-pane-content">
                <div className="compile-message flex-display">
                    <div className="flex flex-between compile-field-label">
                        Сообщение компилятора
                    </div>
                    <div className="compile-output-message">
                        <div className="flex compiler-message pS">
                            <pre>
                                <code>{compilerMessage}</code>
                            </pre>
                        </div>
                    </div>
                </div>
                <div className="stdin flex-display">
                    <div className="flex compile-field-label">
                        Входные данные
                    </div>
                    <div className="compile-output-message">
                        <ul className="lines-container">
                            <li className="flex">
                                <span className="lines-container__content-wrapper">
                                    <pre className="lines-container__content">{input.length}</pre>
                                </span>
                            </li>
                            <li className="flex">
                                <span className="lines-container__content-wrapper">
                                    <pre className="lines-container__content">{input}</pre>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="user-output flex-display">
                    <div className="flex compile-field-label">
                        Ваш ответ
                    </div>
                    <div className="compile-output-message">
                        <ul className="lines-container">
                            <li className="flex">
                                <span className="lines-container__content-wrapper">
                                    <pre className="lines-container__content">{result}</pre>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="expected-output flex-display">
                    <div className="flex compile-field-label">
                        Ожидаемый ответ
                    </div>
                    <div className="compile-output-message">
                        <ul className="lines-container">
                            <li className="flex">
                                <span className="lines-container__content-wrapper mLS mRS pTS">
                                    <pre className="lines-container__content pmB pmT">{expected}</pre>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}