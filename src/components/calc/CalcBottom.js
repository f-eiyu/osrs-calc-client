import GearLoadout from "./panels/GearLoadout";

const CalcBottom = (props) => {


  return (
    <div id="calc-bottom">
      <GearLoadout
        itemList={props.itemList}
        npcList={props.npcList}
      />
      <GearLoadout
        itemList={props.itemList}
        npcList={props.npcList}
      />
    </div>
  )
}

export default CalcBottom;