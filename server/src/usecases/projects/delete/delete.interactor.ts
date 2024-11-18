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

      this.body.map(async (projectId) => {
        await this.repository.delete(projectId);
      })
      const response = await this.repository.read({pageSize: 5, pageIndex: 1});
      this.presenter.present(response);
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }

  }
}
