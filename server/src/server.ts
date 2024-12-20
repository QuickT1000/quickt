import '../register-aliases';
import { Request, Response, NextFunction } from 'express';
import express from "express";
import { join } from 'path';
import { initPostgresConnection as initPostgresConnectionReturn } from '@adapter/postgres';
import { IndexController } from '@controller/index.controller';
import {TranslationsController} from "@controller/translations.controller";
import {ConfigurationsController} from "@controller/configurations.controller";
import {ProjectsController} from "@controller/projects.controller";
import {ChartsController} from "@controller/charts.controller";
import {errorMiddleware} from "./middlewares/error.middleware";
import {L10nController} from "@controller/l10n.controller";

export class Server {
    server: any;
    port: any;
    distFolder: string;
    publicFolder: string;

    constructor(port: number = 3000) {
        this.server = express();
        this.port = process.env['PORT'] || port;
        this.distFolder = join(require('path').resolve('../'), '/client/build/');
        this.publicFolder = join(require('path').resolve('../'), '/client/public/');
    }

    async init() {
        initPostgresConnectionReturn();

        this.initServerConfigs(this.server);

        new IndexController(this.server);
        new ProjectsController(this.server);
        new TranslationsController(this.server);
        new L10nController(this.server);
        new ConfigurationsController(this.server);
        new ChartsController(this.server);

        this.server.use('/api/images', express.static('server/src/images'));

        this.server.get('/*', (req: Request, res: Response) => {
            res.sendFile(this.distFolder + '/index.html');
        });

        this.server.use(errorMiddleware);

        this.server.listen(this.port, () => {
           console.log(`Node Express server listening on http://localhost:${this.port}`);
        });

        return this.server;
    }

    initServerConfigs(server: any) {
        server.use(express.static(this.distFolder, { maxAge: '1y' }));
        server.get('/_alive', (req: express.Request, res: express.Response) => {
            res.append('Cache-Control', 'no-cache, private');
            res.send('ok');
        });

        server.use('/files', express.static('server/data'));
        server.use(express.json({ limit: '50mb' }));
    }
}

const server = new Server();
server.init();
