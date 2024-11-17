import {UpdateTranslationsInteractor} from '@usecases/translations/update/update.interactor';
import {UpdateTranslationsPresenter} from '@usecases/translations/update/update.presenter';
import {DeleteTranslationsInteractor} from '@usecases/translations/delete/delete.interactor';
import {DeleteTranslationsPresenter} from '@usecases/translations/delete/delete.presenter';
import {CreateTranslationsPresenter} from '@usecases/translations/create/create.presenter';
import {CreateTranslationsInteractor} from '@usecases/translations/create/create.interactor';
import {TranslationsRepository} from '@repository/translations.repository';
import {ValidationService} from "@services/ValidationService";
import {ReadTranslationsValidation} from "@usecases/translations/read/read.validation";
import {CreateTranslationsValidation} from "@usecases/translations/create/create.validation";
import {ValidationException} from "../exceptions/validation.exception";
import {UpdateTranslationsValidation} from "@usecases/translations/update/update.validation";
import {DeleteTranslationsValidation} from "@usecases/translations/delete/delete.validation";
import {ImportTranslationsPresenter} from "@usecases/translations/import/import.presenter";
import {ImportTranslationsInteractor} from "@usecases/translations/import/import.interactor";
import {ImportTranslationsValidation} from "@usecases/translations/import/import.validation";
import {ReadTranslationsPresenter} from "@usecases/translations/read/read.presenter";
import {ReadTranslationsInteractor} from "@usecases/translations/read/read.interactor";

export class TranslationsController {

    // test xx
    constructor(server: any) {
        server.get('/api/translations/v1/read', this.readAction.bind(this));
        server.post('/api/translations/v1/create', this.createAction.bind(this));
        server.post('/api/translations/v1/update', this.updateAction.bind(this));
        server.post('/api/translations/v1/destroy', this.deleteAction.bind(this));
        server.post('/api/translations/v1/import', this.importAction.bind(this));
    }

    async readAction(req: any, res: any, next) {
        const validationError = this.validateRequest(req.query, ReadTranslationsValidation);
        if (validationError) return next(validationError);

        const repository = new TranslationsRepository(req.query.projectName);
        const presenter = new ReadTranslationsPresenter(req, res);
        const interactor = new ReadTranslationsInteractor(repository, req.query, presenter);
        await interactor.execute();
    }

    async createAction(req: any, res: any, next: any) {
        const validationError = this.validateRequest(req.body, CreateTranslationsValidation);
        if (validationError) return next(validationError);

        const repository = new TranslationsRepository(req.body.projectName);
        const presenter = new CreateTranslationsPresenter(req, res);
        const interactor = new CreateTranslationsInteractor(repository, req.body, presenter);
        await interactor.execute();
    }

    async updateAction(req: any, res: any, next) {
        const validationError = this.validateRequest(req.body, UpdateTranslationsValidation);
        if (validationError) return next(validationError);

        const repository = new TranslationsRepository(req.body.projectName);
        const presenter = new UpdateTranslationsPresenter(req, res);
        const interactor = new UpdateTranslationsInteractor(repository, req.body, presenter);
        await interactor.execute();
    }

    async deleteAction(req: any, res: any, next) {
        const validationError = this.validateRequest(req.body, DeleteTranslationsValidation);
        if (validationError) return next(validationError);

        const repository = new TranslationsRepository(req.body.projectName);
        const presenter = new DeleteTranslationsPresenter(req, res);
        const interactor = new DeleteTranslationsInteractor(repository, req.body, presenter);
        await interactor.execute();
    }

    async importAction(req: any, res: any, next: any) {
        const validationError = this.validateRequest(req.body, ImportTranslationsValidation);
        if (validationError) return next(validationError);

        const repository = new TranslationsRepository(req.body.projectName);
        const presenter = new ImportTranslationsPresenter(req, res);
        const interactor = new ImportTranslationsInteractor(repository, req.body.data, presenter);
        await interactor.execute();
    }

    private validateRequest(req: any, schema: any) {
        const error = ValidationService.validate(req, schema);
        if (error) {
            return new ValidationException('Request validation failed');
        }
        return null;
    }
}
