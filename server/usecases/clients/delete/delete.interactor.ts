import { DeleteClientsPresenter } from './delete.presenter';
import { ClientsRepository } from '../../../repository/clients.repository';

export class DeleteClientsInteractor {

  constructor(
    private repository: ClientsRepository,
    private query: any,
    private presenter: DeleteClientsPresenter
  ) {
  }

  async execute() {
    try {
      await this.repository.delete(this.query);
      const clients = await this.repository.read();
      this.presenter.present(clients);
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }

  }
}
