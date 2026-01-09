// @ts-check
import { test, expect } from '@playwright/test';

/*
https://app.todoist.com/auth/login


//Task
agregar un task ✅
luego de agregarlo ✅
funcion para agregar un task ✒️ (pending)


//Fixtures:
- login fixture
- Funciones personalizadas para agregar un task y que permitan iterar 
-Consultar array aleatoria:
    -máximos y mínimos de tareas
    -valores invalidos
    -POM: otras páginas
    -compartir el correo de Griss

*/

test('Login', async ({ page }) => {
  await page.goto('https://app.todoist.com/auth/login');
  await page.waitForLoadState('domcontentloaded');

  const emailInput = page.locator('#element-0');
  const passwordInput = page.locator('#element-2');

  await emailInput.fill('wl.interview.session@gmail.com');
  await passwordInput.fill('WL2021&*');

  await page.getByRole('button', { name: 'Log in' }).click();

  // Validando que cambie la URL
  await expect(page).toHaveURL('https://app.todoist.com/app/today');
  console.log('Login successful and navigated to the today page');

  //Adding a task
  const btntask = page.locator('.plus_add_button');
  await btntask.click();

  const taskName = page.getByRole('textbox', { name: 'Task name' });
  await taskName.fill('Name');

  const taskDescription = page.getByRole('textbox', { name: 'Description' });
  await taskDescription.fill('Description');

  const btnAddTask = page.getByRole('button', { name: 'Add task' }).nth(1);
  await btnAddTask.click();

});
