import React from 'react';

/**
 * render: Позволяет нам рендерить компонент (как это делал бы React)
 * screen: Утилита для поиска элементов так же, как это делает пользователь
 */
import { render, screen } from '@testing-library/react';

import ChallengeCard from './ChallengeCardContainer';

/**
 * React Testing Library автоматически очищает выходные данные
 * для каждого теста, поэтому нам не нужно вызывать cleanup для 
 * функции Jest afterEach или beforeEach.
 */

test('has correct render challenge card', () => {
    render(
        <ChallengeCard
            _id="309170582019940"
        />
    )
    expect(screen.getByRole('heading')).toHaveTextContent('Array Manipulation');
})