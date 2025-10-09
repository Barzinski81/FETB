const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000';
const errorRegister = 'No empty fields are allowed and confirm password has to match password!';
const errorLogin = 'Unable to log in!';
const errorGame = 'All fields are required!';

let random = Math.floor(Math.random() * 1000);

let browser;
let context;
let page;

let user = {

    email: "",
    password: "123456",
    confirmPass: "123456"
};

let game = {

    title: "",
    category: "",
    id: "",
    maxLevel: "99",
    imageUrl: "https://jpeg.org/images/jpeg-home.jpg",
    summary: "This is an amazing game"
}

describe("e2e tests", () => {

    beforeAll(async () => {

        browser = await chromium.launch();
    });

    afterAll(async () => {

        await browser.close();
    });

    beforeEach(async () => {

        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {

        await page.close();
        await context.close();
    });

    describe("authentication", () => {

        test("Registration with valid data redirects to the correct page", async () => {

            await page.goto(host);
            await page.click('text=Register');

            await page.waitForSelector('form');

            user.email = `mail${random}@mail.bg`;

            await page.locator("#email").fill(user.email);
            await page.locator("#register-password").fill(user.password);
            await page.locator("#confirm-password").fill(user.confirmPass);

            await page.click('[type="submit"]');

            await expect(page.locator('nav >> text=Logout')).toBeVisible();
            expect(page.url()).toBe(`${host}/`);

        });

        test("Registration with empty fields should fail", async () => {

            await page.goto(host);
            await page.click('text=Register');

            await page.click('[type="submit"]');

            page.on('dialog', async dialog => {
                expect(dialog.type()).toContain('alert');
                expect(dialog.message()).toContain(errorRegister);
                await dialog.accept();
            });

            expect(page.url()).toBe(`${host}/register`);

        });

        test("Login with valid data redirects to the correct page", async () => {

            await page.goto(host);
            await page.click('text=Login');

            await page.waitForSelector('form');

            await page.locator("#email").fill(user.email);
            await page.locator("#login-password").fill(user.password);

            await page.click('[type="submit"]');

            await expect(page.locator('nav >> text=Logout')).toBeVisible();
            expect(page.url()).toBe(`${host}/`);

        });

        test("Login with empty fields should fail", async () => {

            await page.goto(host);
            await page.click('text=Login');

            await page.waitForSelector('form');

            await page.click('[type="submit"]');

            page.on('dialog', async dialog => {
                expect(dialog.type()).toContain('alert');
                expect(dialog.message()).toContain(errorLogin);
                await dialog.accept();
            });

            await expect(page.locator('nav >> text=Login')).toBeVisible();
            expect(page.url()).toBe(`${host}/login`);

        });

        test("Logout after successful login with valid data redirects to the correct page", async () => {

            await page.goto(host);
            await page.click('text=Login');

            await page.waitForSelector('form');

            await page.locator("#email").fill(user.email);
            await page.locator("#login-password").fill(user.password);

            await page.click('[type="submit"]');

            await expect(page.locator('nav >> text=Logout')).toBeVisible();
            expect(page.url()).toBe(`${host}/`);

            await page.locator('nav >> text=Logout').click();

            await expect(page.locator('nav >> text=Login')).toBeVisible();
            expect(page.url()).toBe(`${host}/`);

        });
    });

    describe("navbar", () => {

        test("The navigantion bar for logged in user is properly displayed", async () => {

            await page.goto(host);
            await page.click('text=Login');

            await page.waitForSelector('form');

            await page.locator("#email").fill(user.email);
            await page.locator("#login-password").fill(user.password);

            await page.click('[type="submit"]');

            await expect(page.locator('nav >> text=All games')).toBeVisible();
            await expect(page.locator('nav >> text=Create Game')).toBeVisible();
            await expect(page.locator('nav >> text=Logout')).toBeVisible();
            await expect(page.locator('nav >> text=Login')).toBeHidden();
            await expect(page.locator('nav >> text=Register')).toBeHidden();
            expect(page.url()).toBe(`${host}/`);

        });

        test("The navigantion bar for guest user is properly displayed", async () => {

            await page.goto(host);

            await expect(page.locator('nav >> text=All games')).toBeVisible();
            await expect(page.locator('nav >> text=Create Game')).toBeHidden();
            await expect(page.locator('nav >> text=Logout')).toBeHidden();
            await expect(page.locator('nav >> text=Login')).toBeVisible();
            await expect(page.locator('nav >> text=Register')).toBeVisible();
            expect(page.url()).toBe(`${host}/`);

        });

    });

    describe("CRUD", () => {

        beforeEach(async () => {

            await page.goto(host);
            await page.click('text=Login');

            await page.waitForSelector('form');

            await page.locator("#email").fill(user.email);
            await page.locator("#login-password").fill(user.password);

            await page.click('[type="submit"]');

        });

        test('Creating a game fails with empty fields', async () => {

            await page.click('text=Create Game');
            await page.waitForSelector('form');
            await page.click('[type="submit"]');

            page.on('dialog', async dialog => {
                expect(dialog.type()).toContain('alert');
                expect(dialog.message()).toContain(errorGame);
                await dialog.accept();
            });

            expect(page.url()).toBe(`${host}/create`)

        });

        test('Creating a game with valid data successfully creates the game', async () => {

            game.title = `Game title ${random}`;
            game.category = `Game category ${random}`;

            await page.click('text=Create Game');
            await page.waitForSelector('form');

            await page.fill('[name="title"]', game.title);
            await page.fill('[name="category"]', game.title);
            await page.fill('[name="maxLevel"]', game.maxLevel);
            await page.fill('[name="imageUrl"]', game.imageUrl);
            await page.fill('[name="summary"]', game.summary);

            await page.click('[type="submit"]');

            await expect(page.locator('.game h3', { hasText: game.title })).toHaveCount(1);
            expect(page.url()).toBe(`${host}/`);

        });

        test('"Edit" and "Delete" buttons are visible for the game\'s creator', async () => {

            await page.goto(`${host}/catalog`);

            await page.click(`.allGames .allGames-info:has-text("${game.title}") .details-button`);

            game.id = page.url().split('/').pop();

            await expect(page.locator('text="Edit"')).toBeVisible();
            await expect(page.locator('text="Delete"')).toBeVisible();

        });

        test('"Edit" and "Delete" buttons are hidden for non-owner', async () => {

            await page.goto(`${host}/catalog`);

            await page.click(`.allGames .allGames-info:has-text("CoverFire") .details-button`);

            game.id = page.url().split('/').pop();

            await expect(page.locator('text="Edit"')).toBeHidden();
            await expect(page.locator('text="Delete"')).toBeHidden();

        });

        test('"Edit" with valid data successfully modifies the game', async () => {

            await page.goto(`${host}/catalog`);

            await page.click(`.allGames .allGames-info:has-text("${game.title}") .details-button`);

            game.id = page.url().split('/').pop();

            await page.click('text=Edit');

            await page.waitForSelector('form');

            game.title = `Modified ${game.title}`;

            await page.locator('[name="title"]').fill(game.title);

            await page.click('[type="submit"]');

            await expect(page.locator('.game-header h1', { hasText: game.title })).toHaveCount(1);
            await expect(page.url()).toBe(`${host}/details/${game.id}`);

        });

        test('"Edit" with empty field throws an error', async () => {

            await page.goto(`${host}/catalog`);

            await page.click(`.allGames .allGames-info:has-text("${game.title}") .details-button`);

            game.id = page.url().split('/').pop();

            await page.click('text=Edit');

            await page.waitForSelector('form');

            await page.locator('[name="title"]').fill(""); // This can be changed to any/all fields

            await page.click('[type="submit"]');

            page.on('dialog', async dialog => {
                expect(dialog.type()).toContain('alert');
                expect(dialog.message()).toContain(errorGame);
                await dialog.accept();
            });

            await expect(page.url()).toBe(`${host}/edit/${game.id}`);

        });

        test('"Delete" button successfully deletes the game', async () => {

            await page.goto(`${host}/catalog`);

            await page.click(`.allGames .allGames-info:has-text("${game.title}") .details-button`);

            await page.click('text=Delete');

            await expect(page.locator('.game h3', { hasText: game.title })).toHaveCount(0);
            expect(page.url()).toBe(`${host}/`);

        });

    });

    describe('Home Page', () => {

        test('The Home page is contains all expected elements', async () => {

            await page.goto(host);

            expect(page.locator('.welcome-message h2')).toHaveText("ALL new games are");
            expect(page.locator('.welcome-message h3')).toHaveText("Only in GamesPlay");
            expect(page.locator('#home-page h1')).toHaveText("Latest Games");

            const gameDivs = await page.locator('#home-page .game').all();

            expect(gameDivs.length).toBeGreaterThanOrEqual(3);
        });

    });

});

