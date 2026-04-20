import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
import { Style } from "../design/styles";

import type { JSXElement } from "@fluentui/react-components";
import {
  makeStyles,
  Body1,
  Caption1,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
} from "@fluentui/react-components";
//import { ArrowClockwiseDashesSettingsColor,  AppsColor} from "@fluentui/react-icons";

const useStyles = makeStyles({
  card: {
    margin: "auto",
    width: "720px",
    maxWidth: "100%",
    height: "300px",
    maxHeight: "30%",

  },
});

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    "https://cdn.jsdelivr.net/gh/microsoft/AdaptiveCards@master/assets/"
  return `${ASSET_URL}${asset}`;
};

export const LoginCard = () => {
const navigate = useNavigate();
const styles = useStyles();
    
  return (
    <div>
       <Card className={styles.card} style={{display:"flex", flexDirection: "row",alignItems:"center",justifyContent: "center", padding: '20px', columnGap:'20px',overflow: 'auto !important',borderStyle:'none !important'}}>
      <CardHeader

        header={
          <Body1>
            
          </Body1>
        }
        description={<Caption1></Caption1>}
      />

      <CardPreview
        logo={
          <img src={resolveAsset("adaptive-card-200.png")} alt="Adaptive Cards"/>
        }
      >

      </CardPreview>

      <CardFooter>
        {/* <Button onClick={() => navigate("/login")} icon={<ArrowClockwiseDashesSettingsColor fontSize={16} />}>Login</Button>
        <Button icon={<AppsColor fontSize={16} />}>Design</Button> */}
      </CardFooter>
    </Card>
      <p style={Style()["subtitle"]}>Please login or choose Design to continue</p>
      <div style={Style()["buttonGroup"]}>
        <button
          style={{ ...Style()["button"], flex: 1 }}
          onClick={() => navigate("/login")}
          onMouseOver={(e: MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 6px 20px rgba(102, 126, 234, 0.4)";
          }}
          onMouseOut={(e: MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          🔐 Login
        </button>
        <button
          style={{ ...Style()["buttonGroup"], ...Style()["buttonSecondary"], flex: 1 }}
          onClick={() => navigate("/design")}
          onMouseOver={(e: MouseEvent<HTMLButtonElement>) =>
            (e.currentTarget.style.transform = "translateY(-2px)")
          }
          onMouseOut={(e: MouseEvent<HTMLButtonElement>) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          ✨ Design
        </button>
      </div>
    </div>
  );
};
