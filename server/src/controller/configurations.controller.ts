import {ConfigurationsRepository} from '@repository/configurations.repository';
import {FindOneConfigurationPresenter} from "@usecases/configurations/findOne/find-one.presenter";
import {FindOneConfigurationInteractor} from "@usecases/configurations/findOne/find-one.interactor";

export class ConfigurationsController {

    constructor(server: any) {
        server.get('/api/configurations/v1/read', this.findOneAction.bind(this));
    }

    async findOneAction(req: any, res: any) {
        const repository = new ConfigurationsRepository();
        const presenter = new FindOneConfigurationPresenter(req, res);
        const interactor = new FindOneConfigurationInteractor(repository, req.query, presenter);
        await interactor.execute();
    }
}
