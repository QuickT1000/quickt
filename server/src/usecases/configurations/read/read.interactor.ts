import { ReadConfigurationPresenter } from './read.presenter';
import {ConfigurationsRepository} from "@repository/configurations.repository";

export class ReadConfigurationInteractor {

  constructor(
    private repository: ConfigurationsRepository,
    private model: any,
    private presenter: ReadConfigurationPresenter
  ) {
  }

  async execute() {
    try {
      const translations = await this.repository.read(this.model);
      this.presenter.present(translations);
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }

  }
}
