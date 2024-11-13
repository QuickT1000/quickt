import SwaggerUI from "swagger-ui-react"
import './ApiSpecsPage.scss';
import "swagger-ui-react/swagger-ui.css"
import {QuicktHeader} from "../../../base/header/QuicktHeader";
import {getMainNavigation} from "../../../services/NavigartionService";
import React from "react";

export const ApiSpecsPage = () => {

return (
    <div className={'api-documentation'}>

        <QuicktHeader navigation={getMainNavigation()}>
            <div id="logo"><img src="/logo.png" alt="quickt"/>quickt</div>
            <div id="extras" className="dw-settings d-flex">
                <a target="_blank" href="https://www.paypal.com/donate/?hosted_button_id=CTVTA7GG8AVQU">
                    <img height="40" src="/coffee.png" alt="coffee"/>
                </a>
            </div>
        </QuicktHeader>
        <div className={'container'}>
            <SwaggerUI url="/translations.swagger.json" />
        </div>
    </div>
)
}