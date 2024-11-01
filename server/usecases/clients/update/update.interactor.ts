import { UpdateClientsPresenter } from './update.presenter';
import { ClientsRepository } from '@server/repository/clients.repository';
import {ConfigurationsRepository} from "@server/repository/configurations.repository";
import {TranslationsRepository} from "@server/repository/translations.repository";

export class UpdateClientsInteractor {

  constructor(
    private repository: ClientsRepository,
    private translationsRepository: TranslationsRepository,
    private configurationsRepository: ConfigurationsRepository,
    private body: any,
    private presenter: UpdateClientsPresenter
  ) {
  }

  async execute() {
    try {

      const configurations = await this.configurationsRepository.findOne({type: 'client_config', client: this.body.projectName});
      const configLocales = configurations.client_config.locales;
      const bodyLocales = this.body.locales;


      let deletedLocales = configLocales.filter(x => !bodyLocales.includes(x));


      deletedLocales.forEach((locale) => {
        this.translationsRepository.deleteByLocale(locale);
      });




      //await this.repository.update(this.body);
      //await this.configurationsRepository.update(this.body);
      this.presenter.present({updated: true});
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }

  }
}
