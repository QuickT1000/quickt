export class ReadChartsPresenter {

  constructor(private req, private res) {}

  present(data) {
    console.log(data, ' <------ data ------ ');

    this.res.status(200).json(data);
  }

  presentError(error) {
    this.res.status(500).send(error);
  }
}
