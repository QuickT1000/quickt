import {ReadProjectsPresenter} from './read.presenter';
import {ProjectsRepository} from '@repository/projects.repository';
import {ConfigurationsRepository} from "@repository/configurations.repository";

export class ReadProjectsInteractor {

    constructor(
        private repository: ProjectsRepository,
        private configurationsRepository: ConfigurationsRepository,
        private presenter: ReadProjectsPresenter,
        private query
    ) {
    }

    async execute() {
        try {
            const schemas = await this.repository.read(this.query);

            const projects = schemas.entries.map(async (schema) => {
                const configuration = await this.configurationsRepository.read(schema.nspname);

                return {
                    projectName: configuration.projectName || '',
                    projectId: schema.nspname,
                    defaultLocale: configuration.defaultLocale || '',
                    locales: configuration.locales
                }
            });

            this.presenter.present({
                entries: await Promise.all(projects),
                pagination: schemas.pagination
            });

        } catch (e) {
            return this.presenter.presentError(e.toString());
        }

    }
}
