import { ReadL10nPresenter } from './read.presenter';
import { L10nRepository } from '@repository/l10n.repository';

export class ReadL10nInteractor {

  constructor(
    private repository: L10nRepository,
    private query: any,
    private presenter: ReadL10nPresenter
  ) {
  }

  async execute() {
    try {
      const l10n = await this.repository.read(this.query);
      this.presenter.present(l10n);
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }

  }
}
