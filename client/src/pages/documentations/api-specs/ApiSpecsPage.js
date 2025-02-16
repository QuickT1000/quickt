import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import './ApiSpecsPage.scss';
import React from "react";
import {QuicktHeader} from "../../../base/header/QuicktHeader";
import {Card} from "primereact/card";

export const ApiSpecsPage = () => {

    return (
        <>
            <QuicktHeader/>
            <Card title={'Api Specs'} style={{margin: 10}}>
                <div className={'api-documentation'}>
                    <div className={'container'}>
                        <SwaggerUI
                            url="/translations.swagger.json"
                            swaggerOptions={{
                                layout: "BaseLayout",
                                customCss: `
                              .swagger-ui { 
                                .wrapper {
                                    max-width: 100%;  /* Setze die maximale Breite */
                                    margin: 0 !important;
                                    padding: 0 !important;
                                }
                              }
                            `
                            }}
                        />
                    </div>
                </div>
            </Card>
        </>
    )
}