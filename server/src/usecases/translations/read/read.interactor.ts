import { ReadTranslationsPresenter } from './read.presenter';
import { TranslationsRepository } from '../../../repository/translations.repository';

export class ReadTranslationsInteractor {

  constructor(
    private repository: TranslationsRepository,
    private body: any,
    private presenter: ReadTranslationsPresenter
  ) {
  }

  async execute() {
    try {
      const translations = await this.repository.read(this.body);
      this.presenter.present(translations);
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }
  }

}
