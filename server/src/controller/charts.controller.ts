import {TranslationsRepository} from "@repository/translations.repository";
import {ReadChartsInteractor} from "@usecases/charts/read/read.interactor";
import {ReadChartsPresenter} from "@usecases/charts/read/read.presenter";

export class ChartsController {

    constructor(server: any) {
        server.post('/api/charts/v1/read', this.readAction.bind(this));
    }

    async readAction(req: any, res: any) {
        const translationsRepository = new TranslationsRepository('');
        const presenter = new ReadChartsPresenter(req, res);
        const interactor = new ReadChartsInteractor(
            translationsRepository,
            presenter,
            req.body,
        );
        await interactor.execute();
    }
}
