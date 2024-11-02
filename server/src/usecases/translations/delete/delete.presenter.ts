export class DeleteTranslationsPresenter {

  constructor(private req, private res) {}

  present(data: any) {
    this.res.status(200).json(data);
  }

  presentError(error) {
    this.res.status(500).send(error);
  }
}
