import * as AdaptiveCards from "adaptivecards";
import { useState } from "react";
import { Style } from "../design/styles";
import { JsonEditor } from 'json-edit-react'

import {
  makeStyles,
  shorthands,
  tokens,
  Divider,
} from "@fluentui/react-components";
import { Button } from "@fluentui/react-components";
import {  AddStarburstColor } from "@fluentui/react-icons";

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

export const XixCard = (cardData): React.JSX.Element => {
    const styles = useStyles();
const [jsonData, setData] = useState(cardData);
    const adaptiveCard = new AdaptiveCards.AdaptiveCard();
     adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
        fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
     });
    console.log(jsonData);
     adaptiveCard.onExecuteAction = () => alert("ACTION!");
     adaptiveCard.parse(cardData);
    const result = adaptiveCard.render();

    return(<>
     <div style={{display:"flex", flexDirection: "row",alignItems:"flex-start",justifyContent: "space-evenly", padding: '20px'}}>
                 <div style={Style()["EditorCard"]} >
                    <JsonEditor
                 data={jsonData}
                 defaultValue={cardData}
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
}