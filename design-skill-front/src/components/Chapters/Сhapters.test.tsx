import React from 'react';

import * as reactRedux from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import ChaptersContainer from './ChaptersContainer';

describe('chapters render', () => {
    const fakeListOfChapterCard = [
        {id: '1', name: 'array', detail: 'array is important', route: 'array_chapter'},
        {id: '2', name: 'sorting', detail: 'sorting is important', route: 'sorting_chapter'},
        {id: '3', name: 'dynamic', detail: 'dynamic is important', route: 'dynamic_chapter'},
    ];

    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')

    let container: Element | null;
    beforeEach(() => {
        useSelectorMock.mockClear();
        useSelectorMock.mockReturnValue(fakeListOfChapterCard);
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container as Element);
        container?.remove();
        container = null;
    })

    it('length list of chapter cards', () => {
        act(() => {
            render(
                <ChaptersContainer header="interview" />, 
                container
            )
        })
        expect(container?.querySelectorAll('.chapter-card').length).toBe(3);
    });

    it('title of card to be sorting', () => {
        act(() => {
            render(
                <ChaptersContainer header="interview" />, 
                container
            )
        })
        expect(
            container?.querySelector("[data-testid='2']")?.querySelector('.chapter-card-title')
            ?.textContent).toEqual('sorting');
    })
})