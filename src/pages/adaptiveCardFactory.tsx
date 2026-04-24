
import {
  makeStyles,
  shorthands,
  tokens,
  Divider,
} from "@fluentui/react-components";
import { Button } from "@fluentui/react-components";
import {  AddStarburstColor } from "@fluentui/react-icons";
//import { XixCard } from "../pages/renderAdaptiveCard"
import React from "react";

import * as AdaptiveCards from "adaptivecards";
import { useState } from "react";
import { Style } from "../design/styles";
import { JsonEditor } from 'json-edit-react';


const useStyles = makeStyles({

  lineContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    minHeight: "96px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  customLineStyle: {
    ...shorthands.borderWidth("2px"),
    "::before": {
      borderTopStyle: "dashed",
      borderTopWidth: "2px",
    },
    "::after": {
      borderTopStyle: "dashed",
      borderTopWidth: "2px",
    },
    color: '#f31919',
    width: '71%'
  },
});

export interface ICardFactoryProps {
    Data: ICardSchema[],
};

export interface ICardSchema {
type: string; 
$schema: string; 
version: string; 
body: any;
};
export const XixCards = (data: ICardFactoryProps) => {
const styles = useStyles();
const [jsonData, setData] = useState(data.Data[0]);
    const adaptiveCard = new AdaptiveCards.AdaptiveCard();
     adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
        fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
     });
    console.log(jsonData);
     adaptiveCard.onExecuteAction = () => alert("ACTION!");
     adaptiveCard.parse(jsonData);
    const result = adaptiveCard.render();
return(
    <> 
     <div style={{display:"flex", flexDirection: "row",alignItems:"flex-start",justifyContent: "space-evenly", padding: '20px'}}>
             <div style={Style()["EditorCard"]} >
            <Button title="Hello" />
                <JsonEditor
             data={jsonData}
             defaultValue={jsonData}
             setData={setData}
             maxWidth="min(700px,50vw)"
             minWidth={'min(670px,50vw)'}
             rootFontSize={12}
             showCollectionCount={true}
             enableClipboard={true}
             indent={1}
             collapse={true}
             />
             </div>
            <div style={Style()["card"]} ref={(n) => {
                n && n.firstChild && n.removeChild(n.firstChild);
                n && n.appendChild(result);
            }} />
            </div>
             <div className={styles.lineContainer}>
          <Divider className={styles.customLineStyle}>
             <Button icon={<AddStarburstColor/>} ></Button> (<code>ADD NEW CARD</code>)
          </Divider>
          </div>
    </>
);

};

// const IxCard = (data): React.JSX.Element =>{
// const [jsonData, setData] = useState(data);
//     const adaptiveCard = new AdaptiveCards.AdaptiveCard();
//      adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
//         fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
//      });
//     console.log(jsonData);
//      adaptiveCard.onExecuteAction = () => alert("ACTION!");
//      adaptiveCard.parse(data);
//     const result = adaptiveCard.render();
//     return(
//         <>
//         <div style={Style()["EditorCard"]} >
//             <Button title="Hello" />
//                 <JsonEditor
//              data={data}
//              defaultValue={data}
//              setData={setData}
//              maxWidth="min(700px,50vw)"
//              minWidth={'min(670px,50vw)'}
//              rootFontSize={12}
//              showCollectionCount={true}
//              enableClipboard={true}
//              indent={1}
//              collapse={true}
//              />
//              </div>
//             <div style={Style()["card"]} ref={(n) => {
//                 n && n.firstChild && n.removeChild(n.firstChild);
//                 n && n.appendChild(result);
//             }} />

//     </>

//     );
// };