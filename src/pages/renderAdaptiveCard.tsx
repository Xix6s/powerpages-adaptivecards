import * as AdaptiveCards from "adaptivecards";
import { useState } from "react";
import { Style } from "../design/styles";
import { JsonEditor } from 'json-edit-react'


export const XixCard = (cardData) => {
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
    <div style={Style()["EditorCard"]} >
                <JsonEditor
             data={cardData}
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
            {/* <div style={Style()["card"]} ref={(n) => {
                n && n.firstChild && n.removeChild(n.firstChild);
                n && n.appendChild(result);
            }} /> */}

    </>
    );
}