import * as AdaptiveCards from "adaptivecards";
import { useNavigate } from "react-router-dom";
import type { JSXElement } from "@fluentui/react-components";
import { Button } from "@fluentui/react-components";
import { ArrowStepBackFilled } from "@fluentui/react-icons";
import { JsonEditor } from 'json-edit-react'
import { Image } from "@fluentui/react-components";
import {
  makeStyles,
  shorthands,
  tokens,
  Divider,
} from "@fluentui/react-components";

import { Style } from "../design/styles";
import { useState } from "react";
import sampledata1 from "../resources/samplepayload.json"
import { XixCards, ICardFactoryProps} from "./adaptiveCardFactory";
import sampledata2 from "../resources/samplepayloadtwo.json"
//import { Data, Sample } from "../resources/DemoData";


const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    rowGap: "5px",
  },
  example: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    minHeight: "96px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  customHeightExample: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "192px",
  },
  customWidth: {
    width: "200px",
  },
  customHeight: {
    maxHeight: "50px",
  },
  customFont: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  customLineColor: {
    "::before": {
      ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
    },
    "::after": {
      ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
    },
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
  },
});
const resolveAsset = (asset: string) => {
  const ASSET_URL =
    "https://raw.githubusercontent.com/Xix6s/powerpages-adaptivecards/a108ede97a8891dcf5e2f5c1be4b118c1625f4c5/src/resources/"
  return `${ASSET_URL}${asset}`;
};
export const DesignCard = () => {
  const styles = useStyles();
const navigate = useNavigate();
const [jsonData, setJsonData] = useState(sampledata1);

const cardList: ICardFactoryProps = {} as ICardFactoryProps;
cardList.Data = [];
//cardList.Data = sampledata2;
sampledata2.map((currentCard) => {
  console.log(currentCard);
if(currentCard){
  cardList.Data.push(currentCard)
} 
});

 const adaptiveCard = new AdaptiveCards.AdaptiveCard();
 adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
    fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
 });
//console.log(jsonData);
 adaptiveCard.onExecuteAction = () => alert("ACTION!");
 adaptiveCard.parse(jsonData ?? sampledata1);
const result = adaptiveCard.render();
    return (
        <div style={Style()["paper"]}>
             <Image
                alt="Xix6s"
                src={resolveAsset("6it-logo.svg")}
                height={50}
                width={50}
                style={{marginBlockEnd:"auto"}}
            />
             <Button size="large" style={{color:'red', fontFamily:'cursive',marginLeft:'80%'}} icon={<ArrowStepBackFilled />} onClick={() => navigate("/")}>BCK</Button>
            <div style={{display:"flex", flexDirection: "row",alignItems:"flex-start",justifyContent: "space-evenly", padding: '20px',borderTopColor:'red',borderTopStyle:'dashed'}}>
              {/* Start Card Component */}
              <div style={Style()["EditorCard"]} >
                <JsonEditor
             data={jsonData}
             defaultValue={sampledata1}
             setData={setJsonData}
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

             <div className={styles.example}>
          <Divider className={styles.customLineStyle}>
          
          </Divider>
          </div>
             {/* End Card Component */}
          {/* {cardsToDisplay.length > 0 && cardsToDisplay.map((card) => (
            xixCards(card)
          ))} */}
          {XixCards(cardList)}
         </div>
            
    );
};