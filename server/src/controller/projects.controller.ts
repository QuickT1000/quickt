import {ProjectsRepository} from '@repository/projects.repository';
import {ReadProjectsInteractor} from "@usecases/projects/read/read.interactor";
import {ReadProjectsPresenter} from "@usecases/projects/read/read.presenter";

import {CreateProjectsInteractor} from "@usecases/projects/create/create.interactor";
import {CreateProjectsPresenter} from "@usecases/projects/create/create.presenter";

import {DeleteProjectsInteractor} from "@usecases/projects/delete/delete.interactor";
import {DeleteProjectsPresenter} from "@usecases/projects/delete/delete.presenter";
import {ConfigurationsRepository} from "@repository/configurations.repository";
import {UpdateProjectsInteractor} from "@usecases/projects/update/update.interactor";
import {UpdateProjectsPresenter} from "@usecases/projects/update/update.presenter";
import {TranslationsRepository} from "@repository/translations.repository";

export class ProjectsController {

    constructor(server: any) {
        server.get('/api/projects/v1/read', this.readAction.bind(this));
        server.post('/api/projects/v1/create', this.createAction.bind(this));
        server.post('/api/projects/v1/update', this.updateAction.bind(this));
        server.post('/api/projects/v1/delete', this.deleteAction.bind(this));
    }


    async readAction(req: any, res: any) {
        const repository = new ProjectsRepository();
        const configurationsRepository = new ConfigurationsRepository();
        const presenter = new ReadProjectsPresenter(req, res);
        const interactor = new ReadProjectsInteractor(repository, configurationsRepository, presenter, req.query);
        await interactor.execute();
    }

    async createAction(req: any, res: any) {
        const repository = new ProjectsRepository();
        const configurationsRepository = new ConfigurationsRepository();
        const presenter = new CreateProjectsPresenter(req, res);
        const interactor = new CreateProjectsInteractor(repository, configurationsRepository, req.body, presenter);
        await interactor.execute();
    }

    async updateAction(req: any, res: any) {
        const repository = new ProjectsRepository();
        const translationsRepository = new TranslationsRepository(req.body.projectId);
        const configurationsRepository = new ConfigurationsRepository();
        const presenter = new UpdateProjectsPresenter(req, res);
        const interactor = new UpdateProjectsInteractor(
            repository,
            translationsRepository,
            configurationsRepository,
            req.body,
            presenter
        );
        await interactor.execute();
    }

    async deleteAction(req: any, res: any) {
        const repository = new ProjectsRepository();
        const presenter = new DeleteProjectsPresenter(req, res);
        const interactor = new DeleteProjectsInteractor(repository, req.body, presenter);
        await interactor.execute();
    }

}
