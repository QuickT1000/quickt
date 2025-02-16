import React from 'react';
import './UserGuidePage.scss';
import Markdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {darcula} from 'react-syntax-highlighter/dist/esm/styles/prism'
import {QuicktHeader} from "../../../base/header/QuicktHeader";
import {Card} from "primereact/card";

export const UserGuidePage = () => {


    const markdown = `
- First Steps
- Import
- Export
---

## First Steps

First of all go to the Projects page and hit the Add Button. Fill in the form. Hint: A Project could be a client for example. 
![image info](/projects.png)

Now you can go to the translation page and hit the Add button.
Fill in the form and save. Here you are! Your first translation is ready!
![image info](/details.png)

## Import

You can import JSON and CSV files. The files need to have following structures.
Make sure that you have created a project first with the needed locales.

Here is an example JSON file: 
~~~json
 {
  "sk-SK": {
    "dummy": {
      "feature": {
        "login": "Prihlásenie používateľa",
        "logout": "Odhlásiť sa",
      },
      "feature2": {
        "import": "Importovať",
        "export": "Exportovať",
      }
    },
    "dummy2": {
      "featureX1": {
        "title": "Ahoj, ako sa máš?",
        "welcome": "Vitajte v aplikácii",
      }
    }
  }
}
~~~

Here an example of a CSV file:

~~~csv
dummy.feature.logout,Abmelden,DE,de
dummy.feature.register,Registrieren,DE,de
dummy.feature.forgot_password,Passwort vergessen,DE,de
dummy.feature.profile,Profil,DE,de
dummy.feature.login,Benutzeranmeldung,DE,de
~~~


## Export 

For exporting translations you need to select the entries you want to export in the translations table. Then click on export and choose your file format. 
        
`;

    return (
        <>
            <QuicktHeader/>
            <Card title={'User Guide'} style={{margin: 10}}>
                <div className={'user-guide-page'}>
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