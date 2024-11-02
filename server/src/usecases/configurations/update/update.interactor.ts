import { FindOneConfigurationPresenter } from './update.presenter';
import {ConfigurationsRepository} from "../../../repository/configurations.repository";

export class FindOneConfigurationInteractor {

  constructor(
    private repository: ConfigurationsRepository,
    private model: any,
    private presenter: FindOneConfigurationPresenter
  ) {
  }

  async execute() {
    try {
      const translations = await this.repository.findOne(this.model);
      this.presenter.present(translations);
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }

  }
}
