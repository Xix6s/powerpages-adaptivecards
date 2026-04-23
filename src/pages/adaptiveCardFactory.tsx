
import {
  makeStyles,
  shorthands,
  tokens,
  Divider,
} from "@fluentui/react-components";
import { Button } from "@fluentui/react-components";
import {  AddStarburstColor } from "@fluentui/react-icons";
import { XixCard } from "../pages/renderAdaptiveCard"

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

return(
    <> 
    {data.Data.length && data.Data.map((currentCard) => {
        <>
        <div style={{display:"flex", flexDirection: "row",alignItems:"flex-start",justifyContent: "space-evenly", padding: '20px'}}>
             {XixCard(currentCard)}
            </div>
             <div className={styles.example}>
          <Divider className={styles.customLineStyle}>
             <Button icon={<AddStarburstColor/>}></Button> (<code>ADD NEW CARD</code>)
          </Divider>
          </div>
          </>

    })}
     

    </>
);

};