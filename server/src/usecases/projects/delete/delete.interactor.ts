import { DeleteProjectsPresenter } from './delete.presenter';
import { ProjectsRepository } from '@repository/projects.repository';

export class DeleteProjectsInteractor {

  constructor(
    private repository: ProjectsRepository,
    private body: any,
    private presenter: DeleteProjectsPresenter
  ) {
  }

  async execute() {
    try {
      this.body.map(async (projects) => {
        await this.repository.delete(projects.projectId);
      })
      const response = await this.repository.read({rows: 5, page: 0});
      this.presenter.present(response);
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }

  }
}
