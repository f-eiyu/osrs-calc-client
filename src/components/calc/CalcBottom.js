import GearLoadout from "./panels/GearLoadout";

const CalcBottom = (props) => {


  return (
    <div id="calc-bottom">
      <GearLoadout
        itemList={props.itemList}
        boxNum="1"
      />

      <GearLoadout
        itemList={props.itemList}
        boxNum="2"
      />
    </div>
  )
}

export default CalcBottom;