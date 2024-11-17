import {unflattenFromArray} from "../../../utils/utils";

export class ReadL10nPresenter {

  constructor(private req, private res) {}

  present(data) {
    const unflattenData = unflattenFromArray(data)
    this.res.status(200).json(unflattenData);
  }

  presentError(error) {
    this.res.status(500).send(error);
  }
}
