import knex from 'knex';
import { Page, chromium } from 'playwright';
import '../server';


describe('Memo', () => {
    let page: Page;
    beforeAll(async () => {
        const browser = await chromium.launch();
        page = await browser.newPage();
    })

    //.... rest of the test case
    it('should successfully login', async () => {
        await page.goto('http://localhost:8080')
        await page.evaluate(() => {
            const memoContent = document.querySelector('[name=content]');

            if (memoContent) {
                (memoContent as HTMLInputElement).value = "really?";
            }
            const submit = document.querySelector('[type=submit]');
            if (submit) {
                (submit as HTMLInputElement).click();
            }

        });


        const studentMain = await page.evaluate(() => document.querySelector('#student-main'));
        expect(studentMain).toBeDefined();

    });

})

