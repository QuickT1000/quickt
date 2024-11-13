export class CreateProjectsPresenter {

  constructor(private req, private res) {}

  present(res) {
    this.res.status(200).json(res);
  }

  presentError(error) {
    this.res.status(500).send(error);
  }
}
