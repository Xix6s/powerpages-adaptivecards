import * as AdaptiveCards from "adaptivecards";
import { useNavigate } from "react-router-dom";
import type { JSXElement } from "@fluentui/react-components";
import { makeStyles, Button, Tooltip } from "@fluentui/react-components";
import { ArrowStepBackFilled } from "@fluentui/react-icons";
import { JsonEditor } from 'json-edit-react'

import { Style } from "../design/styles";
import { useState } from "react";
import data from "../resources/samplepayload.json"
import { Data } from "../resources/DemoData";

const useStyles = makeStyles({
  innerWrapper: {
    alignItems: "start",
    columnGap: "15px",
    display: "flex",
  },
  outerWrapper: {
    display: "flex",
    flexDirection: "column",
    rowGap: "15px",
    minWidth: "min-content",
  },
});

export const DesignCard = () => {
const styleseditor = useStyles();
const navigate = useNavigate();
const [jsonData, setJsonData] = useState(data);
 const adaptiveCard = new AdaptiveCards.AdaptiveCard();
 adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
    fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
 });

 adaptiveCard.onExecuteAction = () => alert("ACTION!");
 adaptiveCard.parse(jsonData ?? Data);
const result = adaptiveCard.render();
    return (
        <div style={Style()["designercontainer"]}>
             <JsonEditor
             data={jsonData}
             defaultValue={Data}
             setData={setJsonData}
             maxWidth="min(700px,vw)"
             minWidth={'min(670px,90vw)'}
             rootFontSize={12}
             showCollectionCount={true}
             enableClipboard={true}
             />
            <div style={Style()["card"]} ref={(n) => {
                n && n.firstChild && n.removeChild(n.firstChild);
                n && n.appendChild(result);
            }} />
           
            <Tooltip content="back" relationship="label">
          <Button size="large" icon={<ArrowStepBackFilled />} onClick={() => navigate("/")} />
          </Tooltip>
            </div>
            
    );
};