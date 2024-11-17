import { ImportTranslationsPresenter } from './import.presenter';
import {TranslationsRepository} from "@repository/translations.repository";

export class ImportTranslationsInteractor {

  constructor(
    private repository: TranslationsRepository,
    private data: any,
    private presenter: ImportTranslationsPresenter
  ) {}

  async execute() {
    try {
      await this.repository.bulkInsert(this.data);
      this.presenter.present('import completed')
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }
  }
}
