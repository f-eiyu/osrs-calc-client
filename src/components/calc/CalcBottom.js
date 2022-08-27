import GearLoadout from "./panels/GearLoadout";

const CalcBottom = (props) => {


  return (
    <div id="calc-bottom">
      <GearLoadout
        itemList={props.itemList}
        loadout={props.loadoutLeft}
        setLoadout={props.setLoadout}
        boxNum={1}
      />

      <GearLoadout
        itemList={props.itemList}
        loadout={props.loadoutRight}
        setLoadout={props.setLoadout}
        boxNum={2}
      />
    </div>
  )
}

export default CalcBottom;