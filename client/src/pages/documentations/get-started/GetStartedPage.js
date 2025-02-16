import React from 'react';
import './GetStartedPage.scss';
import Markdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {darcula} from 'react-syntax-highlighter/dist/esm/styles/prism'
import {QuicktHeader} from "../../../base/header/QuicktHeader";
import {Card} from "primereact/card";

export const GetStartedPage = () => {


    const markdown = `##
- clone on [github](https://github.com/QuickT1000/quickt)
---

## Environments
You need to rename .env.dist to .env
~~~bash
mv ./.env.dist .env
~~~

## Install Project
        
Go to root folder of the cloned project and install the deplendencies:

~~~bash
./scripts/build.sh
~~~

## Docker
To start up the application run:  
~~~bash
docker-compose up
~~~
   
`;

    return (
        <>
            <QuicktHeader/>
            <Card title={'Get Started'} style={{margin: 10}}>
                <div className={'get-started-page'}>
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
            </Card>
        </>
    );
}