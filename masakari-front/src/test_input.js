const puppeteer = require('puppeteer');

exports.testInput = () => {

    return (async () => {
        console.log('[Info] ■■■ 入力テスト Start ■■■');

        const browser = await puppeteer.launch({
            headless: true,
            slowMo: 50,
        });
        const page = await browser.newPage();
        const timeout = 5000;
        page.setDefaultTimeout(timeout);

        {
            const targetPage = page;
            await targetPage.setViewport({
                width: 1239,
                height: 1001
            })
        }
        {
            const targetPage = page;
            const promises = [];
            promises.push(targetPage.waitForNavigation());
            await targetPage.goto('https://masakari.yukinissie.com/');
            await Promise.all(promises);
        }
        {
            const targetPage = page;
            await scrollIntoViewIfNeeded([
                [
                    'aria/メッセージ'
                ],
                [
                    '#root > div > div > div > div > div.d-flex.flex-row.justify-content-evenly > div.d-flex.flex-column.justify-content-between.w-25 > div:nth-child(2) > div > input'
                ],
                [
                    'xpath///*[@id="root"]/div/div/div/div/div[2]/div[2]/div[2]/div/input'
                ]
            ], targetPage, timeout);
            const element = await waitForSelectors([
                [
                    'aria/メッセージ'
                ],
                [
                    '#root > div > div > div > div > div.d-flex.flex-row.justify-content-evenly > div.d-flex.flex-column.justify-content-between.w-25 > div:nth-child(2) > div > input'
                ],
                [
                    'xpath///*[@id="root"]/div/div/div/div/div[2]/div[2]/div[2]/div/input'
                ]
            ], targetPage, { timeout, visible: true });
            await element.click({
                offset: {
                    x: 73.5999755859375,
                    y: 11.20001220703125,
                },
            });
        }
        {
            const targetPage = page;
            await scrollIntoViewIfNeeded([
                [
                    'aria/メッセージ'
                ],
                [
                    '#root > div > div > div > div > div.d-flex.flex-row.justify-content-evenly > div.d-flex.flex-column.justify-content-between.w-25 > div:nth-child(2) > div > input'
                ],
                [
                    'xpath///*[@id="root"]/div/div/div/div/div[2]/div[2]/div[2]/div/input'
                ]
            ], targetPage, timeout);
            const element = await waitForSelectors([
                [
                    'aria/メッセージ'
                ],
                [
                    '#root > div > div > div > div > div.d-flex.flex-row.justify-content-evenly > div.d-flex.flex-column.justify-content-between.w-25 > div:nth-child(2) > div > input'
                ],
                [
                    'xpath///*[@id="root"]/div/div/div/div/div[2]/div[2]/div[2]/div/input'
                ]
            ], targetPage, { timeout, visible: true });
            const inputType = await element.evaluate(el => el.type);
            if (inputType === 'select-one') {
                await changeSelectElement(element, 'test')
            } else if ([
                'textarea',
                'text',
                'url',
                'tel',
                'search',
                'password',
                'number',
                'email'
            ].includes(inputType)) {
                await typeIntoElement(element, 'test');
            } else {
                await changeElementValue(element, 'test');
            }
        }
        {
            const targetPage = page;
            await targetPage.keyboard.down('Enter');
        }
        {
            const targetPage = page;
            await targetPage.keyboard.up('Enter');
        }
        {
            const targetPage = page;
            await scrollIntoViewIfNeeded([
                [
                    'aria/メッセージ'
                ],
                [
                    '#root > div > div > div > div > div.d-flex.flex-row.justify-content-evenly > div.d-flex.flex-column.justify-content-between.w-25 > div:nth-child(2) > div > input'
                ],
                [
                    'xpath///*[@id="root"]/div/div/div/div/div[2]/div[2]/div[2]/div/input'
                ]
            ], targetPage, timeout);
            const element = await waitForSelectors([
                [
                    'aria/メッセージ'
                ],
                [
                    '#root > div > div > div > div > div.d-flex.flex-row.justify-content-evenly > div.d-flex.flex-column.justify-content-between.w-25 > div:nth-child(2) > div > input'
                ],
                [
                    'xpath///*[@id="root"]/div/div/div/div/div[2]/div[2]/div[2]/div/input'
                ]
            ], targetPage, { timeout, visible: true });
            const inputType = await element.evaluate(el => el.type);
            if (inputType === 'select-one') {
                await changeSelectElement(element, 'hoge')
            } else if ([
                'textarea',
                'text',
                'url',
                'tel',
                'search',
                'password',
                'number',
                'email'
            ].includes(inputType)) {
                await typeIntoElement(element, 'hoge');
            } else {
                await changeElementValue(element, 'hoge');
            }
        }
        {
            const targetPage = page;
            await targetPage.keyboard.down('Enter');
        }
        {
            const targetPage = page;
            await targetPage.keyboard.up('Enter');
        }

        await browser.close();

        async function waitForSelectors(selectors, frame, options) {
            for (const selector of selectors) {
                try {
                    return await waitForSelector(selector, frame, options);
                } catch (err) {
                    console.error(err);
                }
            }
            throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors));
        }

        async function scrollIntoViewIfNeeded(selectors, frame, timeout) {
            const element = await waitForSelectors(selectors, frame, { visible: false, timeout });
            if (!element) {
                throw new Error(
                    'The element could not be found.'
                );
            }
            await waitForConnected(element, timeout);
            const isInViewport = await element.isIntersectingViewport({ threshold: 0 });
            if (isInViewport) {
                return;
            }
            await element.evaluate(element => {
                element.scrollIntoView({
                    block: 'center',
                    inline: 'center',
                    behavior: 'auto',
                });
            });
            await waitForInViewport(element, timeout);
        }

        async function waitForConnected(element, timeout) {
            await waitForFunction(async () => {
                return await element.getProperty('isConnected');
            }, timeout);
        }

        async function waitForInViewport(element, timeout) {
            await waitForFunction(async () => {
                return await element.isIntersectingViewport({ threshold: 0 });
            }, timeout);
        }

        async function waitForSelector(selector, frame, options) {
            if (!Array.isArray(selector)) {
                selector = [selector];
            }
            if (!selector.length) {
                throw new Error('Empty selector provided to waitForSelector');
            }
            let element = null;
            for (let i = 0; i < selector.length; i++) {
                const part = selector[i];
                if (element) {
                    element = await element.waitForSelector(part, options);
                } else {
                    element = await frame.waitForSelector(part, options);
                }
                if (!element) {
                    throw new Error('Could not find element: ' + selector.join('>>'));
                }
                if (i < selector.length - 1) {
                    element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
                }
            }
            if (!element) {
                throw new Error('Could not find element: ' + selector.join('|'));
            }
            return element;
        }

        async function waitForElement(step, frame, timeout) {
            const {
                count = 1,
                operator = '>=',
                visible = true,
                properties,
                attributes,
            } = step;
            const compFn = {
                '==': (a, b) => a === b,
                '>=': (a, b) => a >= b,
                '<=': (a, b) => a <= b,
            }[operator];
            await waitForFunction(async () => {
                const elements = await querySelectorsAll(step.selectors, frame);
                let result = compFn(elements.length, count);
                const elementsHandle = await frame.evaluateHandle((...elements) => {
                    return elements;
                }, ...elements);
                await Promise.all(elements.map((element) => element.dispose()));
                if (result && (properties || attributes)) {
                    result = await elementsHandle.evaluate(
                        (elements, properties, attributes) => {
                            for (const element of elements) {
                                if (attributes) {
                                    for (const [name, value] of Object.entries(attributes)) {
                                        if (element.getAttribute(name) !== value) {
                                            return false;
                                        }
                                    }
                                }
                                if (properties) {
                                    if (!isDeepMatch(properties, element)) {
                                        return false;
                                    }
                                }
                            }
                            return true;

                            function isDeepMatch(a, b) {
                                if (a === b) {
                                    return true;
                                }
                                if ((a && !b) || (!a && b)) {
                                    return false;
                                }
                                if (!(a instanceof Object) || !(b instanceof Object)) {
                                    return false;
                                }
                                for (const [key, value] of Object.entries(a)) {
                                    if (!isDeepMatch(value, b[key])) {
                                        return false;
                                    }
                                }
                                return true;
                            }
                        },
                        properties,
                        attributes
                    );
                }
                await elementsHandle.dispose();
                return result === visible;
            }, timeout);
        }

        async function querySelectorsAll(selectors, frame) {
            for (const selector of selectors) {
                const result = await querySelectorAll(selector, frame);
                if (result.length) {
                    return result;
                }
            }
            return [];
        }

        async function querySelectorAll(selector, frame) {
            if (!Array.isArray(selector)) {
                selector = [selector];
            }
            if (!selector.length) {
                throw new Error('Empty selector provided to querySelectorAll');
            }
            let elements = [];
            for (let i = 0; i < selector.length; i++) {
                const part = selector[i];
                if (i === 0) {
                    elements = await frame.$$(part);
                } else {
                    const tmpElements = elements;
                    elements = [];
                    for (const el of tmpElements) {
                        elements.push(...(await el.$$(part)));
                    }
                }
                if (elements.length === 0) {
                    return [];
                }
                if (i < selector.length - 1) {
                    const tmpElements = [];
                    for (const el of elements) {
                        const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
                        if (newEl) {
                            tmpElements.push(newEl);
                        }
                    }
                    elements = tmpElements;
                }
            }
            return elements;
        }

        async function waitForFunction(fn, timeout) {
            let isActive = true;
            const timeoutId = setTimeout(() => {
                isActive = false;
            }, timeout);
            while (isActive) {
                const result = await fn();
                if (result) {
                    clearTimeout(timeoutId);
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            throw new Error('Timed out');
        }

        async function changeSelectElement(element, value) {
            await element.select(value);
            await element.evaluateHandle((e) => {
                e.blur();
                e.focus();
            });
        }

        async function changeElementValue(element, value) {
            await element.focus();
            await element.evaluate((input, value) => {
                input.value = value;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }, value);
        }

        async function typeIntoElement(element, value) {
            const textToType = await element.evaluate((input, newValue) => {
                if (
                    newValue.length <= input.value.length ||
                    !newValue.startsWith(input.value)
                ) {
                    input.value = '';
                    return newValue;
                }
                const originalValue = input.value;
                input.value = '';
                input.value = originalValue;
                return newValue.substring(originalValue.length);
            }, value);
            await element.type(textToType);
        }
        console.log('[Info] ■■■ 入力テスト END ■■■');

    })().catch(err => {
        console.error(err);
        process.exit(1);
    });
}