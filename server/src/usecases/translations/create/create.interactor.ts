import { CreateTranslationsPresenter } from './create.presenter';
import {TranslationsRepository} from "@repository/translations.repository";
import {EntryInterface} from "@interfaces/entry.interface";

export class CreateTranslationsInteractor {

  constructor(
    private repository: TranslationsRepository,
    private model: EntryInterface,
    private presenter: CreateTranslationsPresenter
  ) {

  }

  async execute() {
    try {
      const result = this.model.entries.map(async entry => {
        try {
          return await this.repository.create(entry);
        } catch (e) {

          return this.presenter.presentError(e.toString());
        }
      });

      Promise.all(result).then((result) => {
        this.presenter.present(result);
      })
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }
  }
}
