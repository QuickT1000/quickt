import React from 'react';
import './LandingPage.scss';
import {DwHeader} from "../../components/header/DwHeader";
import {getMainNavigation} from "../../services/NavigartionService";
import DwButtons from "../../components/buttons/DwButtons";
import {useNavigate} from "react-router-dom";

export const LandingPage = () => {
    const navigate = useNavigate();

    const onButtonClick = (pathname) => {
        navigate({pathname});
    }


    return (
        <div className={'landingpage'}>

            <DwHeader navigation={getMainNavigation()}>
                <div id="logo"><img src="/logo.png" alt="quickt"/>quickt</div>
                <div id="extras" className="dw-settings d-flex"><a target="_blank" href="https://www.paypal.com/donate/?hosted_button_id=CTVTA7GG8AVQU"><img height="40" src="/coffee.png"
                                                                                alt="coffee"/></a></div>
            </DwHeader>

            <section className="main-box">
            <div className="row">
                    <div className="box">
                        <span className="text">
                        <h1>
                            <strong>it´s quickt!</strong>
                        </h1>
                        <p>
                            Free, Open Source, Easy to Use, Fully Customizable, <strong className={'color2'}>AI Support</strong>, Quick and Easy Deployment.
                        </p>

                        <div className={'inline'}>
                            <DwButtons button={'custom'} text={'Get Started'} onClick={onButtonClick.bind(null, 'get-started')}/>
                            <DwButtons button={'custom'} text={'Demo'} onClick={onButtonClick.bind(null, 'demo')}/>
                        </div>

                        </span>
                    </div>
                </div>
            </section>


        </div>
    )
}