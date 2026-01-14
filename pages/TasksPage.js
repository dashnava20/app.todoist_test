export class TasksPage {
  constructor(page) {
    this.page = page;
    this.tasks = page.locator('[data-testid="task-list-item"]');

    // Locators
    this.addTaskButton = page
      .getByTestId('project-list-view')
      .getByRole('button', { name: 'Añadir tarea' });

    this.taskNameInput = page
      .getByRole('textbox', { name: 'Nombre de la tarea' })
      .getByRole('paragraph');

    this.taskDescriptionInput = page
      .getByRole('textbox', { name: 'Descripción' })
      .getByRole('paragraph');

    this.submitTaskButton = page.getByTestId('task-editor-submit-button');

    this.tasks = page.getByTestId('task-list-item');
  }

   async openEditor() {
    await this.addTaskButton.click();
    await this.taskNameInput.waitFor({ state: 'visible' });
  }

   async fillTask(name, description = '') {
    await this.taskNameInput.fill(name);

    if (description) {
      await this.taskDescriptionInput.fill(description);
    }
  }

  async submitTask() {
    await this.submitTaskButton.click();
  }

  async createTask(name, description = '') {
    await this.openEditor();
    await this.fillTask(name, description);
    await this.submitTask();
  }

  async getTaskCount() {
    return await this.tasks.count();
  }

  taskByName(name) {
    return this.page
      .getByTestId('task-list-item')
      .filter({ hasText: name });
  }

  async deleteFirstTaskIfExists() {
    const count = await this.tasks.count();
    if (count === 0) return false;

    const firstTask = this.tasks.first();

    await firstTask.hover();
    await firstTask.locator('[data-testid="more_menu"]').click();
    await this.page.getByRole('menuitem', { name: /eliminar/i }).click();
    await this.page.getByRole('button', { name: /eliminar/i }).click();

    return true;
  }
}
