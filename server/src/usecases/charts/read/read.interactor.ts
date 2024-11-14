import {TranslationsRepository} from "@repository/translations.repository";
import {ReadChartsPresenter} from "@usecases/charts/read/read.presenter";


const getCountryByLocale = (locale) => {
  return locale.split('-')[1] || '';
}

const getLanguageByLocale = (locale) => {
  return locale.split('-')[0] || '';
}

export class ReadChartsInteractor {

  constructor(
    private translationsRepository: TranslationsRepository,
    private presenter: ReadChartsPresenter,
    private body: any
  ) {

  }

  async execute() {
    try {
      const response = this.body.locales.map(async (locale) => {
        return await this.translationsRepository.findByProjectNameAndCountryAndLanguage(
            this.body.projectName,
            getCountryByLocale(locale),
            getLanguageByLocale(locale)
        );
      });

      this.presenter.present(await Promise.all(response));
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }

  }
}
