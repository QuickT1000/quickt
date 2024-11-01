import {UpdateTranslationsInteractor} from '@usecases/translations/update/update.interactor';
import {UpdateTranslationsPresenter} from '@usecases/translations/update/update.presenter';
import {DeleteTranslationsInteractor} from '@usecases/translations/delete/delete.interactor';
import {DeleteTranslationsPresenter} from '@usecases/translations/delete/delete.presenter';
import {CreateTranslationsPresenter} from '@usecases/translations/create/create.presenter';
import {CreateTranslationsInteractor} from '@usecases/translations/create/create.interactor';
import {TranslationsRepository} from '@repository/translations.repository';
import {FindOneTranslationsPresenter} from '@usecases/translations/findOne/find-one.presenter';
import {FindOneTranslationInteractor} from '@usecases/translations/findOne/find-one.interactor';
import {FindTranslationsPresenter} from "@usecases/translations/find/find.presenter";
import {FindTranslationInteractor} from "@usecases/translations/find/find.interactor";
import {SearchTranslationsInteractor} from "@usecases/translations/search/search.interactor";
import {SearchTranslationsPresenter} from "@usecases/translations/search/search.presenter";

export class TranslationsController {

    // test xx
    constructor(server: any) {
        server.get('/api/translations/v1/read', this.readAction.bind(this));
        server.get('/api/translations/v1/findOne', this.findOneAction.bind(this));
        server.get('/api/translations/v1/find', this.findAction.bind(this));
        server.post('/api/translations/v1/create', this.createAction.bind(this));
        server.post('/api/translations/v1/update', this.updateAction.bind(this));
        server.post('/api/translations/v1/destroy', this.deleteAction.bind(this));
        server.post('/api/translations/v1/import', this.importAction.bind(this));
    }

    async readAction(req: any, res: any) {
        const repository = new TranslationsRepository(req.query.client);
        const presenter = new SearchTranslationsPresenter(req, res);
        const interactor = new SearchTranslationsInteractor(repository, req.query, presenter);
        await interactor.execute();
    }

    async findAction(req: any, res: any) {
        const repository = new TranslationsRepository(req.query.client);
        const presenter = new FindTranslationsPresenter(req, res);
        const interactor = new FindTranslationInteractor(repository, req.query.key, presenter);
        await interactor.execute();
    }

    async findOneAction(req: any, res: any) {
        const repository = new TranslationsRepository(req.query.client);
        const presenter = new FindOneTranslationsPresenter(req, res);
        const interactor = new FindOneTranslationInteractor(repository, parseInt(req.query.id), presenter);
        await interactor.execute();
    }

    async createAction(req: any, res: any) {
        const repository = new TranslationsRepository(req.body.client);
        const presenter = new CreateTranslationsPresenter(req, res);
        const interactor = new CreateTranslationsInteractor(repository, req.body, presenter);
        await interactor.execute();
    }

    async updateAction(req: any, res: any) {
        const repository = new TranslationsRepository(req.body.client);
        const presenter = new UpdateTranslationsPresenter(req, res);
        const interactor = new UpdateTranslationsInteractor(repository, req.body, presenter);
        await interactor.execute();
    }

    async deleteAction(req: any, res: any) {
        const repository = new TranslationsRepository(req.body.client);
        const presenter = new DeleteTranslationsPresenter(req, res);
        const interactor = new DeleteTranslationsInteractor(repository, req.body, presenter);
        await interactor.execute();
    }

    async importAction(req: any, res: any) {
        const repository = new TranslationsRepository(req.body.client);
        const translations = req.body.data;
        const results = await repository.bulkInsert(translations);
        res.json({ success: true, data: results });
    }
}
