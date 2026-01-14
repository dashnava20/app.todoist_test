import { test, expect } from '../../fixtures/authenticatedPage.js';
import { SidebarPage } from '../../pages/SidebarPage.js';
import { TasksPage } from '../../pages/TasksPage.js';
import { uniqueTaskName } from '../../utils/testData.js';

test.describe('📋 Tasks E2E con Arquitectura Limpia - Todoist', () => {
    let tasksPage;
    let taskName;

    test.beforeEach(async ({ authenticatedPage }) => {
        tasksPage = new TasksPage(authenticatedPage);
        taskName = uniqueTaskName('E2E Task desde Sidebar');
    });

    test('Crear tarea desde el sidebar', async ({ authenticatedPage }) => {
        const sidebar = new SidebarPage(authenticatedPage);
        const tasks = new TasksPage(authenticatedPage);

        await sidebar.openTaskEditor();
        await tasks.fillTask(taskName,'Añadida desde el sidebar');
        await tasks.submitTask();

        await expect(tasks.taskByName(taskName)).toBeVisible();
    });
});