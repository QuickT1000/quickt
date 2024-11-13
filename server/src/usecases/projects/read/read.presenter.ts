export class ReadProjectsPresenter {

  constructor(private req, private res) {}

  present(result) {
    this.res.status(200).json(result);
  }

  presentError(error) {
    this.res.status(500).send(error);
  }
}
