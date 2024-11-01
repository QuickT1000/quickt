import { UpdateTranslationsPresenter } from './update.presenter';
import {TranslationsRepository} from "@server/repository/translations.repository";
import {EntryInterface} from "@server/interfaces/entry.interface";


export class UpdateTranslationsInteractor {

  constructor(
    private repository: TranslationsRepository,
    private model: EntryInterface,
    private presenter: UpdateTranslationsPresenter
  ) {
  }

  async execute() {
    try {
      const result = this.model.entries.map(async entry => {
        return await this.repository.update(entry);
      });

      Promise.all(result).then((result) => {
        this.presenter.present(result);
      })

    } catch (e) {
      return this.presenter.presentError(e.toString());
    }
  }
}
