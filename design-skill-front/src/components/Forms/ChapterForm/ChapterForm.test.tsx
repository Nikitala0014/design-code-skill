import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ChapterFormView } from './ChapterFormView';


function renderChapterForm(onChange = jest.fn()) {
    render(
    <ChapterFormView 
        title="Arrays"
        detail="70% of companies test this subject"
        handleChange={onChange}
        handleSubmit={jest.fn()}
    />);
}

test('has correct chapter input value', () => {
    renderChapterForm();

    expect(screen.getByRole('form', { name: /chapter/i })).toHaveFormValues({
        title: 'Arrays',
        detail: '70% of companies test this subject'
    });
});

test('has changed chapter input value', () => {
    const onChangeInput = jest.fn();
    renderChapterForm(onChangeInput);

    userEvent.type(screen.getByRole('textbox', { name: /title/i }), 'Sorting');
    userEvent.type(
        screen.getByRole('textbox', { name: /detail/i }), 
        '40% of companies test this subject',
    );

    expect(onChangeInput).toHaveBeenCalled();
});