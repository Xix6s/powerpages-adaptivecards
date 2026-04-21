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
    border: "none"
  },
});

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    "https://cdn.jsdelivr.net/gh/microsoft/AdaptiveCards@master/assets/"
  return `${ASSET_URL}${asset}`;
};

export const LoginCard = () => {
const navigate = useNavigate();
// const styles = useStyles();
    
  return (
    <div>
      <img src={resolveAsset("adaptive-card-200.png")} alt="Adaptive Cards" style={{paddingLeft:"150px"}} height={100} width={100}/>
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
