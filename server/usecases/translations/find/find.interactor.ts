import { FindTranslationsPresenter } from './find.presenter';
import { TranslationsRepository } from '../../../repository/translations.repository';

export class FindTranslationInteractor {

  constructor(
    private repository: TranslationsRepository,
    private key: string,
    private presenter: FindTranslationsPresenter
  ) {
  }

  async execute() {
    try {
      const translations = await this.repository.find(this.key);
      this.presenter.present(translations);
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }

  }
}
