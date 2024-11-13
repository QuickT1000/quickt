import React from 'react';
import './LandingPage.scss';
import {QuicktHeader} from "../../base/header/QuicktHeader";
import {getMainNavigation} from "../../services/NavigartionService";
import BaseButtons from "../../base/buttons/BaseButtons";
import {useNavigate} from "react-router-dom";

export const LandingPage = () => {
    const navigate = useNavigate();

    const onButtonClick = (pathname) => {
        navigate({pathname});
    }


    return (
        <div className={'landingpage'}>

            <QuicktHeader navigation={getMainNavigation()}>
                <div id="logo"><img src="/logo.png" alt="quickt"/>quickt</div>
                <div id="extras" className="dw-settings d-flex">
                    <a target="_blank" href="https://www.paypal.com/donate/?hosted_button_id=CTVTA7GG8AVQU">
                        <img height="40" src="/coffee.png" alt="coffee"/>
                    </a>
                </div>
            </QuicktHeader>

            <section className="main-box">
                <div className="row">
                    <div className="box">
                        <span className="text">
                        <div>
                            it´s free, it´s open source, it´s easy to use <strong
                            className={'color2'}>it´s AI supported</strong>,
                        </div>
                            <h4>
                                <strong>it´s quickt!</strong>
                            </h4>

                        <div className={'inline'}>
                            <BaseButtons button={'custom'} text={'Get Started'}
                                         onClick={onButtonClick.bind(null, 'get-started')}/>
                            <BaseButtons button={'custom'} text={'Demo'} onClick={onButtonClick.bind(null, 'demo')}/>
                        </div>

                        </span>
                    </div>
                </div>
            </section>


        </div>
    )
}