const { test, expect } = require('@playwright/test');

const URL = 'http://localhost:3000';
const bookTitle = `Title Book ${Date.now()}`;
const testUser = `testuser_${Date.now()}@abv.bg`;
const testImage = 'https://img.freepik.com/free-vector/realistic-book-template-front-side_23-2147504375.jpg';


test('Verify that the "All Books" link is visible', async ({ page }) => {

    await page.goto(URL);
    await page.waitForSelector('nav.navbar');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);

});

test('Verify that the "Login" button is visible', async ({ page }) => {

    await page.goto(URL);
    await page.waitForSelector('nav.navbar');

    const loginButton = await page.$('a[href="/login"]');
    const isButtonVisible = await loginButton.isVisible();

    expect(isButtonVisible).toBe(true);

});

test('Verify that the "Register" button is visible', async ({ page }) => {

    await page.goto(URL);
    await page.waitForSelector('nav.navbar');

    const registerButton = await page.$('a[href="/register"]');
    const isButtonVisible = await registerButton.isVisible();

    expect(isButtonVisible).toBe(true);

});

test('Verify that the "All Books" link is visible after user login', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify that the "My Books" button is visible after user login', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const myBooksButton = await page.$('a[href="/profile"]');
    const isLinkVisible = await myBooksButton.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify that the "Add Book" button is visible after user login', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const addBookButton = await page.$('a[href="/create"]');
    const isLinkVisible = await addBookButton.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify that the user\'s email address is visible after user login', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const welcomeText = await page.textContent('#user span');
    expect(welcomeText).toContain('peter@abv.bg');
});

test('Login with valid credentials', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(`${URL}/catalog`);
});

test('Try to log in with empty input fields', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe(`${URL}/login`);

});

test('Try to log in with empty email input field', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe(`${URL}/login`);

});

test('Try to log in with empty password input field', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe(`${URL}/login`);

});

test('Register with valid values', async ({ page }) => {

    await page.goto(`${URL}/register`);

    await page.fill('input[name="email"]', testUser);
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(`${URL}/catalog`);
});

test('Register with empty values', async ({ page }) => {

    await page.goto(`${URL}/register`);

    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(`${URL}/register`);
});

test('Register with empty email', async ({ page }) => {

    await page.goto(`${URL}/register`);

    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(`${URL}/register`);
});

test('Register with empty password', async ({ page }) => {

    await page.goto(`${URL}/register`);

    await page.fill('input[name="email"]', testUser);
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(`${URL}/register`);
});

test('Register with empty confirm password', async ({ page }) => {

    await page.goto(`${URL}/register`);

    await page.fill('input[name="email"]', testUser);
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(`${URL}/register`);
});

test('Register with different passwords', async ({ page }) => {

    await page.goto(`${URL}/register`);

    await page.fill('input[name="email"]', testUser);
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123123');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Passwords don\'t match!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    await page.waitForURL(`${URL}/register`);
    expect(page.url()).toBe(`${URL}/register`);
});

test('Add book with correct data', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(`${URL}/catalog`)
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.fill('#title', bookTitle);
    await page.fill('#description', 'Test book description');
    await page.fill('#image', testImage);
    await page.selectOption('#type', 'Classic');
    await page.click('#create-form input[type="submit"]');

    await page.waitForURL(`${URL}/catalog`);
    expect(page.url()).toBe(`${URL}/catalog`);

});

test('Add book with empty title field', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(`${URL}/catalog`)
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.fill('#description', 'Test book description');
    await page.fill('#image', testImage);
    await page.selectOption('#type', 'Classic');
    await page.click('#create-form input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.waitForURL(`${URL}/create`);
    expect(page.url()).toBe(`${URL}/create`);

});

test('Add book with empty description field', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(`${URL}/catalog`)
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.fill('#title', bookTitle);
    await page.fill('#description', 'Test book description');
    await page.selectOption('#type', 'Classic');
    await page.click('#create-form input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.waitForURL(`${URL}/create`);
    expect(page.url()).toBe(`${URL}/create`);

});

test('Add book with empty image URL field', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(`${URL}/catalog`)
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.fill('#title', bookTitle);
    await page.fill('#image', testImage);
    await page.selectOption('#type', 'Classic');
    await page.click('#create-form input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.waitForURL(`${URL}/create`);
    expect(page.url()).toBe(`${URL}/create`);

});

test('Login and verify all books are displayed', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(`${URL}/catalog`)
    ]);

    await page.waitForSelector('#dashboard-page');

    const bookElements = await page.$$('.other-books-list li');
    expect(bookElements.length).toBeGreaterThan(0);

});

test('Login and navigate to "Details" page', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(`${URL}/catalog`)
    ]);

    await page.click('a[href="/profile"]');
    await page.waitForSelector('.otherBooks');

    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('To Kill a Mockingbird');

});

test('Verify the title of the last created book', async ({ page }) => {

    await page.goto(URL);

    await page.click('a[href="/catalog"]'),
        await page.waitForURL(`${URL}/catalog`)

    const firstBookTitle = page.locator('.other-books-list li h3').first();
    await expect(firstBookTitle).toHaveText(bookTitle);

});


test('Navigate to the "Details" page without login', async ({ page }) => {

    await page.goto(URL);

    await page.click('a[href="/catalog"]'),
        await page.waitForURL(`${URL}/catalog`)

    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe(bookTitle);

});

test('Verify that the Login and Delete buttons are visible for the creator', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(`${URL}/catalog`)
    ]);

    await page.click('a[href="/profile"]');
    await page.waitForSelector('.otherBooks');

    await page.locator('.otherBooks:has-text("To Kill a Mockingbird") a.button').click();
    await page.waitForSelector('.book-information');

    // const editButton = await page.$('.actions a[href^="/edit"]'); // selects the <a> whose href starts with /edit
    const editButton = await page.$('.actions a:has-text("Edit")');
    const isEditVisible = await editButton.isVisible();

    const deleteButton = await page.$('.actions a:has-text("Delete")');
    const isDeleteVisible = await deleteButton.isVisible();

    expect(isEditVisible && isDeleteVisible).toBe(true);

});

test('Verify that the Login and Delete buttons are hidden for non-creator', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(`${URL}/catalog`)
    ]);

    // await page.click('a[href="/profile"]');
    await page.waitForSelector('.otherBooks');

    await page.locator('.otherBooks:has-text("To Kill a Mockingbird") a.button').click();
    await page.waitForSelector('.book-information');

    await expect(page.locator('.actions a.button:has-text("Edit")')).toHaveCount(0);
    await expect(page.locator('.actions a.button:has-text("Delete")')).toHaveCount(0);

});


test('Verify that the Like button is not visible for the creator', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(`${URL}/catalog`)
    ]);

    await page.click('a[href="/profile"]');
    await page.waitForSelector('.otherBooks');

    await page.locator('.otherBooks:has-text("To Kill a Mockingbird") a.button').click();
    await page.waitForSelector('.book-information');

    await expect(page.locator('.actions a.button:has-text("Like")')).toHaveCount(0);

});

test('Verify that the Like button is visible for non-creator', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(`${URL}/catalog`)
    ]);

    // await page.click('a[href="/profile"]');
    await page.waitForSelector('.otherBooks');

    await page.locator('.otherBooks:has-text("To Kill a Mockingbird") a.button').click();
    await page.waitForSelector('.book-information');

    await expect(page.locator('.actions a.button:has-text("Like")')).toHaveCount(1);

});

test('Verify redirection of Logout link after user login', async ({ page }) => {

    await page.goto(`${URL}/login`);

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(`${URL}/catalog`)
    ]);

    const logoutLink = await page.locator('.navbar a.button#logoutBtn');
    await logoutLink.click();

    const redirectedURL = page.url();
    expect(redirectedURL).toBe(`${URL}/catalog`);
    
});