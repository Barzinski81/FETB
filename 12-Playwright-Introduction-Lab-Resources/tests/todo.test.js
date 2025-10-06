const { test, expect} = require('@playwright/test');

// Verify if the user can add a task

test('The user can add a task', async ({page}) => {
    //Add a task
    await page.goto('http://localhost:8080/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    // Verify the added task
    const taskText = await page.textContent('.task');
    expect (taskText).toContain('Test Task');

});

// Verify if the user can delete a task

test ('The user can delete a task', async ({page}) => {
    //Add a task
    await page.goto('http://localhost:8080/');
    await page.fill("#task-input", 'Test Task');
    await page.click('#add-task');

    // Delete the task
    await page.click('.task .delete-task')

    const tasks = await page.$$eval('.task',
        tasks => tasks.map(task => task.textContent));
    expect(tasks).not.toContain('Test Task');

});

// Verify if the user can mark a task as complete

test('The user can mark a task as complete', async ({page}) => {
    //Add a task
    await page.goto('http://localhost:8080/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    //Mark the task as complete
    await page.click('.task .task-complete');

    const completedTask = await page.$('.task.completed');
    expect (completedTask).not.toBeNull();

});

// Test if the user can filter tasks

test('The user can filter tasks', async ({page}) => {
    //Add a task
    await page.goto('http://localhost:8080/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    //Mark the task as complete
    await page.click('.task .task-complete');
    
    // Filter tasks
    await page.selectOption('#filter', 'Completed');

    const incompleteTask = await page.$('.task:not(.completed)');
    expect (incompleteTask).toBeNull();

});