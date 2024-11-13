import {ConfigurationsRepository} from '@repository/configurations.repository';
import {ReadConfigurationPresenter} from "@usecases/configurations/read/read.presenter";
import {ReadConfigurationInteractor} from "@usecases/configurations/read/read.interactor";

export class ConfigurationsController {

    constructor(server: any) {
        server.get('/api/configurations/v1/read', this.readAction.bind(this));
    }

    async readAction(req: any, res: any) {
        const repository = new ConfigurationsRepository();
        const presenter = new ReadConfigurationPresenter(req, res);
        const interactor = new ReadConfigurationInteractor(repository, req.query, presenter);
        await interactor.execute();
    }
}
