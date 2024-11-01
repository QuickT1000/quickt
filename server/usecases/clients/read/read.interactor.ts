import { ReadClientsPresenter } from './read.presenter';
import { ClientsRepository } from '../../../repository/clients.repository';

export class ReadClientsInteractor {

  constructor(
    private repository: ClientsRepository,
    private presenter: ReadClientsPresenter
  ) {
  }

  async execute() {
    try {
      const translations = await this.repository.read();
      this.presenter.present(translations);
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }

  }
}
