import React from 'react';

/**
 * render: Позволяет нам рендерить компонент (как это делал бы React)
 * screen: Утилита для поиска элементов так же, как это делает пользователь
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ChallengeFormView } from './ChallengeFormView';

function renderChallengeForm(onChange = jest.fn()) {
    render(
        <ChallengeFormView
            title="Array Manipulation"
            diff="Hard"
            preview="Max score: 60, Success rate: 56.75%"
            handleChange={onChange}
        />
    )
}

test('has correct challenge input value', () => {
    renderChallengeForm();

    // screen.debug();
    // screen.logTestingPlaygroundURL();
    expect(screen.getByRole('form', { name: /challenge/i })).toHaveFormValues({
        title: 'Array Manipulation',
        diff: 'Hard',
        preview:'Max score: 60, Success rate: 56.75%', 
    });
})

test('has changed challenge input value', () => {
    const onChangeInput = jest.fn();
    renderChallengeForm(onChangeInput);

    userEvent.type(screen.getByRole('textbox', { name: /title/i }), 'Sorting: Bubble Sort');
    userEvent.type(screen.getByRole('textbox', { name: /diff/i }), 'Easy');

    expect(onChangeInput).toHaveBeenCalled()
})
