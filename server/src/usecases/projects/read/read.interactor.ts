import {ReadProjectsPresenter} from './read.presenter';
import {ProjectsRepository} from '@repository/projects.repository';
import {ConfigurationsRepository} from "@repository/configurations.repository";

export class ReadProjectsInteractor {

    constructor(
        private repository: ProjectsRepository,
        private configurationsRepository: ConfigurationsRepository,
        private presenter: ReadProjectsPresenter,
        private query: any
    ) {
    }

    async execute() {
        try {

            const schemas = await this.repository.read(this.query);

            let filtered = [];

           const filteredEntries = await schemas.entries.map(async (schema) => {
                const configuration = await this.configurationsRepository.read(schema.nspname, this.query);

                if ((configuration.projectName.indexOf(this.query.projectName) !== -1) &&
                    (configuration.projectName.indexOf(this.query.defaultLocale) !== -1)) {
                    filtered.push({
                        projectName: configuration.projectName || '',
                        projectId: schema.nspname,
                        defaultLocale: configuration.defaultLocale || '',
                        locales: configuration.locales
                    });
                }

                return filtered;
            });

           const response = await Promise.all(filteredEntries);

            this.presenter.present({
                entries: response[0],
                pagination: schemas.pagination
            });

        } catch (e) {
            return this.presenter.presentError(e.toString());
        }

    }
}
