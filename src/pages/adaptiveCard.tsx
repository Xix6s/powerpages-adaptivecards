import * as AdaptiveCards from "adaptivecards";
import { useNavigate } from "react-router-dom";
import type { JSXElement } from "@fluentui/react-components";
import { Button } from "@fluentui/react-components";
import { ArrowStepBackFilled } from "@fluentui/react-icons";
import { JsonEditor } from 'json-edit-react'
import { Image } from "@fluentui/react-components";

import { Style } from "../design/styles";
import { useState } from "react";
import data from "../resources/samplepayload.json"
import { Data } from "../resources/DemoData";



export const DesignCard = () => {
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
        <div >
             <Image
                alt="Xix6s"
                src="/src/resources/xix-logo.svg"
                height={50}
                width={50}
                style={{marginBlockEnd:"auto"}}
            />
            <div style={{display:"flex", flexDirection: "row",alignItems:"flex-start",justifyContent: "space-around", padding: '20px', columnGap:'20px',overflow: 'auto !important',borderTopColor:'red',borderTopStyle:'dashed'}}>
                <JsonEditor
             data={jsonData}
             defaultValue={Data}
             setData={setJsonData}
             maxWidth="min(700px,50vw)"
             minWidth={'min(670px,50vw)'}
             rootFontSize={12}
             showCollectionCount={true}
             enableClipboard={true}
             indent={1}
             />
            <div style={Style()["card"]} ref={(n) => {
                n && n.firstChild && n.removeChild(n.firstChild);
                n && n.appendChild(result);
            }} />
           

          <Button size="large" style={{color:'red', fontFamily:'cursive'}} icon={<ArrowStepBackFilled />} onClick={() => navigate("/")}>BCK</Button>
            </div>
             
            </div>
            
    );
};