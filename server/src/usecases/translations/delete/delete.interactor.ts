import { DeleteTranslationsPresenter } from './delete.presenter';
import {TranslationsRepository} from "@repository/translations.repository";
import {EntryInterface} from "@interfaces/entry.interface";

export class DeleteTranslationsInteractor {

  constructor(
    private repository: TranslationsRepository,
    private model: EntryInterface,
    private presenter: DeleteTranslationsPresenter
  ) {
  }

  execute() {
    try {
      const result = this.model.entries.map(async entry => {
        return await this.repository.delete(entry);
      });

      Promise.all(result).then((result) => {
        this.presenter.present(result);
      })
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }
  }
}
