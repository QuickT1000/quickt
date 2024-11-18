import { UpdateProjectsPresenter } from './update.presenter';
import { ProjectsRepository } from '@repository/projects.repository';
import {ConfigurationsRepository} from "@repository/configurations.repository";
import {TranslationsRepository} from "@repository/translations.repository";

export class UpdateProjectsInteractor {

  constructor(
    private repository: ProjectsRepository,
    private translationsRepository: TranslationsRepository,
    private configurationsRepository: ConfigurationsRepository,
    private body: any,
    private presenter: UpdateProjectsPresenter
  ) {

  }

  async execute() {
    try {
      const configurations = await this.configurationsRepository.read(this.body.projectId);
      const configLocales = configurations.locales;
      const bodyLocales = this.body.locales;

      let deletedLocales = configLocales.filter(x => !bodyLocales.includes(x));

      deletedLocales.forEach((locale) => {
        this.translationsRepository.deleteByLocale(locale);
      });

      await this.repository.update(this.body);
      await this.configurationsRepository.update(this.body);
      this.presenter.present({updated: true});
    } catch (e) {
      return this.presenter.presentError(e.toString());
    }

  }
}
