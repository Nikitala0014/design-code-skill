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
            id="array_manipulation"
            title="Array Manipulation"
            difficulty="Medium"
            preview="Max score: 60, Success rate: 56.75%"
            route="array_manipulation"
        />
    )
    expect(screen.getByRole('heading')).toHaveTextContent('Array Manipulation');
})