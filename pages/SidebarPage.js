export class SidebarPage {
  constructor(page) {
    this.page = page;
  }

  addTaskButton() {
    return this.page
      .getByTestId('app-sidebar-container')
      .getByRole('button', { name: /añadir tarea/i });
  }

  async openTaskEditor() {
    await this.addTaskButton().click();
  }
}
