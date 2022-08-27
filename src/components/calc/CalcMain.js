import CalcTop from "./CalcTop";
import CalcBottom from "./CalcBottom";

import "./calc.css";

const CalcMain = (props) => {
  

  return (
    <div id="calc-body">
      <CalcTop
        itemList={props.itemList}
        npcList={props.npcList}
      />
      <CalcBottom
        itemList={props.itemList}
        npcList={props.npcList}
      />
    </div>
  )
}

export default CalcMain;