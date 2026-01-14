import { test, expect } from '../../fixtures/authenticatedPage.js';
import { TasksPage } from '../../pages/TasksPage.js';
import { uniqueTaskName } from '../../utils/testData.js';

test.describe('📋 Tasks E2E - Todoist', () => {
  let tasksPage;
  let taskName;

  test.beforeEach(async ({ authenticatedPage }) => {
    tasksPage = new TasksPage(authenticatedPage);
    taskName = uniqueTaskName('E2E Task');
  });

  test('✅ Crear tarea', async ({ authenticatedPage }) => {
    await tasksPage.createTask(
      taskName,
      'Descripción de la tarea E2E'
    );

    await expect(tasksPage.taskByName(taskName)).toBeVisible();
  });

  test('🗑️ Eliminar una tarea existente', async ({ authenticatedPage }) => {
    const tasksPage = new TasksPage(authenticatedPage);

    const initialCount = await tasksPage.getTaskCount();
    expect(initialCount).toBeGreaterThan(0);
    console.log('Initial Task Count:', initialCount);

    const deleted = await tasksPage.deleteFirstTaskIfExists();

    const finalCount = await tasksPage.getTaskCount();
    expect(deleted).toBeTruthy();
    expect(finalCount).toBe(initialCount - 1);
    console.log('Final Task Count:', finalCount);
  });


});
