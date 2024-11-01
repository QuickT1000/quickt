import React from 'react';
import './GetStartedPage.scss';
import ReactMarkdown from "react-markdown";
import {DwHeader} from "../../components/header/DwHeader";
import {getMainNavigation} from "../../services/NavigartionService";

export const GetStartedPage = () => {


    const markdownText = `
## Get Started

- clone on [github](https://github.com/remarkjs/react-markdown)
- pull from [dockerhub](https://github.com/remarkjs/react-markdown)

---

## Docker

run command:



\`docker run quickt setEnv \`


---

`;

    return (
        <div className={'get-started-page'}>


            <DwHeader navigation={getMainNavigation()}>
                <div id="logo"><img src="/api/images/logo.png" alt="quickT"/>quickT</div>
            </DwHeader>

            <div className={'container'}>
                <section>
                    <ReactMarkdown>{markdownText}</ReactMarkdown>
                </section>

            </div>
        </div>
    );
}