import { SearchTranslationsPresenter } from './search.presenter';
import { TranslationsRepository } from '../../../repository/translations.repository';

export class SearchTranslationsInteractor {

  constructor(
    private repository: TranslationsRepository,
    private query: any,
    private presenter: SearchTranslationsPresenter
  ) {
  }

  async execute() {
    try {
      const translations = await this.repository.search(this.query);
      this.presenter.present(translations);
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }

  }
}
