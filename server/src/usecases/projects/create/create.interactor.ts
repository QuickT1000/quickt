import { CreateProjectsPresenter } from './create.presenter';
import { ProjectsRepository } from '@repository/projects.repository';
import {ConfigurationsRepository} from "@repository/configurations.repository";

export class CreateProjectsInteractor {

  constructor(
    private repository: ProjectsRepository,
    private configurationsRepository: ConfigurationsRepository,
    private body: any,
    private presenter: CreateProjectsPresenter
  ) {
  }

  async execute() {
    try {
      await this.repository.create(this.body);
      await this.configurationsRepository.create(this.body);
      this.presenter.present({created: true});
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }

  }
}
