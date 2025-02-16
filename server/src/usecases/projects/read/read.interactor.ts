import { ReadProjectsPresenter } from './read.presenter';
import { ProjectsRepository } from '@repository/projects.repository';
import { ConfigurationsRepository } from "@repository/configurations.repository";

export class ReadProjectsInteractor {
    constructor(
        private repository: ProjectsRepository,
        private configurationsRepository: ConfigurationsRepository,
        private presenter: ReadProjectsPresenter,
        private body: any
    ) {}

    async execute() {
        try {
            const schemas = await this.repository.read(this.body);

            // Warte auf alle Promises und erstelle das Array
            const filtered = await Promise.all(
                schemas.entries.map(async (schema) => {
                    // Hier wird der Fehler gefixt, indem wir `as any` verwenden, um TypeScript zu sagen, dass `configuration` ein beliebiges Objekt ist.
                    const configuration = await this.configurationsRepository.read(schema.nspname, this.body) as any;

                    return {
                        projectName: configuration.projectName || '',
                        projectId: schema.nspname,
                        defaultLocale: configuration.defaultLocale || '',
                        locales: configuration.locales || []
                    };
                })
            );

            // Sortiere nach projectName (Case-Insensitive)
            filtered.sort((a: any, b: any) => a.projectName.localeCompare(b.projectName, 'de', { sensitivity: 'base' }));

            // Rückgabe der Daten
            this.presenter.present({
                entries: filtered,
                filter: schemas.filter
            });

        } catch (e) {
            // Fehlerbehandlung
            return this.presenter.presentError(e.toString());
        }
    }
}
