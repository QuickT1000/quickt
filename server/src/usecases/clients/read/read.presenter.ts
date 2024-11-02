export class ReadClientsPresenter {

  constructor(private req, private res) {}

  present(schemas) {

    const result = schemas.map((schema) => {
        return {
          label: schema.nspname,
          value: schema.nspname,
          color: 'blue'
        }
    })

    this.res.status(200).json(result);
  }

  presentError(error) {
    this.res.status(500).send(error);
  }
}
