// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
/**
 * This pattern:
 *
 * test('whatever', () => {
 *  const foo = someThing()
 *  // use foo
 * })
 *
 * makes for a WAY simpler testbase than:
 *
 * let foo
 * beforeEach(() => {
 *  foo = someThing()
 * })
 *
 * test('whatever', () => {
 *  // use foo
 * })
 *
 * Avoid mutable variables. Your tests will be easier to understand
 */

/**
 * Таким образом, наш тест обычно должен видеть/взаимодействовать 
 * только с переданными реквизитами(props) и визуализированным выводом(render component).
 */

/**
 * Чем больше ваши тесты похожи на то, как используется ваше программное обеспечение, 
 * тем больше уверенности они могут вам дать.
 */