import {ClientsRepository} from '@repository/clients.repository';
import {ReadClientsInteractor} from "@usecases/clients/read/read.interactor";
import {ReadClientsPresenter} from "@usecases/clients/read/read.presenter";

import {CreateClientsInteractor} from "@usecases/clients/create/create.interactor";
import {CreateClientsPresenter} from "@usecases/clients/create/create.presenter";

import {DeleteClientsInteractor} from "@usecases/clients/delete/delete.interactor";
import {DeleteClientsPresenter} from "@usecases/clients/delete/delete.presenter";
import {ConfigurationsRepository} from "@repository/configurations.repository";
import {UpdateClientsInteractor} from "@usecases/clients/update/update.interactor";
import {UpdateClientsPresenter} from "@usecases/clients/update/update.presenter";
import {TranslationsRepository} from "@repository/translations.repository";

export class ClientsController {

    constructor(server: any) {
        server.get('/api/clients/v1/read', this.readAction.bind(this));
        server.post('/api/clients/v1/create', this.createAction.bind(this));
        server.post('/api/clients/v1/update', this.updateAction.bind(this));
        server.get('/api/clients/v1/delete', this.deleteAction.bind(this));
    }

    async readAction(req: any, res: any) {
        const repository = new ClientsRepository();
        const presenter = new ReadClientsPresenter(req, res);
        const interactor = new ReadClientsInteractor(repository, presenter);
        await interactor.execute();
    }

    async createAction(req: any, res: any) {
        const repository = new ClientsRepository();
        const configurationsRepository = new ConfigurationsRepository();
        const presenter = new CreateClientsPresenter(req, res);
        const interactor = new CreateClientsInteractor(repository, configurationsRepository, req.body, presenter);
        await interactor.execute();
    }

    async updateAction(req: any, res: any) {
        const repository = new ClientsRepository();
        const translationsRepository = new TranslationsRepository(req.body.projectName);
        const configurationsRepository = new ConfigurationsRepository();
        const presenter = new UpdateClientsPresenter(req, res);
        const interactor = new UpdateClientsInteractor(
            repository,
            translationsRepository,
            configurationsRepository,
            req.body,
            presenter
        );
        await interactor.execute();
    }

    async deleteAction(req: any, res: any) {
        const repository = new ClientsRepository();
        const presenter = new DeleteClientsPresenter(req, res);
        const interactor = new DeleteClientsInteractor(repository, req.query, presenter);
        await interactor.execute();
    }

}
