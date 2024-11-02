import { FindOneTranslationsPresenter } from './find-one.presenter';
import { TranslationsRepository } from '../../../repository/translations.repository';

export class FindOneTranslationInteractor {

  constructor(
    private repository: TranslationsRepository,
    private id: number,
    private presenter: FindOneTranslationsPresenter
  ) {
  }

  async execute() {
    try {
      const translations = await this.repository.findOne(this.id);
      this.presenter.present(translations);
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }

  }
}
