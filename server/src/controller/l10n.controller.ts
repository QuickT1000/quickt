import {L10nRepository} from '@repository/l10n.repository';
import {ValidationService} from "@services/ValidationService";
import {ReadL10nValidation} from "@usecases/l10n/read/read.validation";
import {ValidationException} from "../exceptions/validation.exception";
import {ReadL10nPresenter} from "@usecases/l10n/read/read.presenter";
import {ReadL10nInteractor} from "@usecases/l10n/read/read.interactor";

export class L10nController {

    constructor(server: any) {
        server.get('/api/l10n/v1/read', this.readAction.bind(this));
    }

    async readAction(req: any, res: any, next: any) {
        const repository = new L10nRepository(req.query.projectName);
        const presenter = new ReadL10nPresenter(req, res);
        const interactor = new ReadL10nInteractor(repository, req.query, presenter);
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
