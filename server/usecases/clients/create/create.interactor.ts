import { CreateClientsPresenter } from './create.presenter';
import { ClientsRepository } from '../../../repository/clients.repository';
import {ConfigurationsRepository} from "@server/repository/configurations.repository";

export class CreateClientsInteractor {

  constructor(
    private repository: ClientsRepository,
    private configurationsRepository: ConfigurationsRepository,
    private query: any,
    private presenter: CreateClientsPresenter
  ) {
  }

  async execute() {
    try {
      await this.repository.create(this.query);
      await this.configurationsRepository.create(this.query);
      this.presenter.present({created: true});
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }

  }
}
