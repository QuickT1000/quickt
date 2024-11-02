export class IndexController {

  constructor(server: any) {
    server.get('/_alive', this.aliveAction.bind(this));
  }

  async aliveAction(req: any, res: any) {
    res.append('Cache-Control', 'no-cache, private');
    res.send('ok');
  }
}
