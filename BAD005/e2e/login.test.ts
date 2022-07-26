import { Page, chromium } from 'playwright';
import '../server';


describe('Login', () => {
    let page: Page;
    beforeAll(async () => {
        const browser = await chromium.launch();
        page = await browser.newPage();
    })

    //.... rest of the test case
    it('should successfully login', async () => {
        await page.goto('http://localhost:8080')
        await page.evaluate(() => {
            const username = document.querySelector('[name=username]');
            const password = document.querySelector('[name=password]');
            if (username && password) {
                (username as HTMLInputElement).value = "jason@tecky.io";
                (password as HTMLInputElement).value = "1234";
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

