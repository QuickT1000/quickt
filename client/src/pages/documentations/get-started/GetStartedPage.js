import React from 'react';
import './GetStartedPage.scss';
import Markdown from 'react-markdown'
import {QuicktHeader} from "../../../base/header/QuicktHeader";
import {getMainNavigation} from "../../../services/NavigartionService";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {darcula} from 'react-syntax-highlighter/dist/esm/styles/prism'

export const GetStartedPage = () => {


    const markdown = `## Get Started

- clone on [github](https://github.com/QuickT1000/quickt)


---

## Install Project
        
go to root folder of the cloned project and install the deplendencies:

~~~bash
Desktop:~/projects/quickt$ ./build/build.sh
~~~

## Docker
to start up the application run:  
~~~bash
Desktop:~/projects/quickt$ docker-compose up
~~~
   
`;

    return (
        <div className={'get-started-page'}>

            <QuicktHeader navigation={getMainNavigation()}>
                <div id="logo"><img src="/logo.png" alt="quickt"/>quickt</div>
                <div id="extras" className="dw-settings d-flex"><a target="_blank"
                                                                   href="https://www.paypal.com/donate/?hosted_button_id=CTVTA7GG8AVQU"><img
                    height="40" src="/coffee.png"
                    alt="coffee"/></a></div>
            </QuicktHeader>

            <div className={'container my-3'}>
                <section>
                    <Markdown
                        children={markdown}
                        components={{
                            code(props) {
                                const {children, className, node, ...rest} = props
                                const match = /language-(\w+)/.exec(className || '')
                                return match ? (
                                    <SyntaxHighlighter
                                        {...rest}
                                        PreTag="div"
                                        children={String(children).replace(/\n$/, '')}
                                        language={match[1]}
                                        style={darcula}
                                    />
                                ) : (
                                    <code {...rest} className={className}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    />
                </section>

            </div>
        </div>
    );
}