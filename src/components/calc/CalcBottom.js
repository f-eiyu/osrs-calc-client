import GearLoadout from "./panels/bottom/GearLoadout";

const CalcBottom = (props) => {
  const { itemList, loadoutLeft, loadoutRight } = props;
  const { setLoadoutLeft, setLoadoutRight } = props;
  const { user, setUser } = props;

  const transferLoadout = (targetPanel) => {
    let sourceLoadout;
    let setLoadout;
    if (targetPanel === "right") {
      sourceLoadout = loadoutLeft;
      setLoadout = setLoadoutRight;
    }
    else if (targetPanel === "left") {
      sourceLoadout = loadoutRight;
      setLoadout = setLoadoutLeft;
    }
    else { return; }

    setLoadout(sourceLoadout);
  }

  const transferLoadoutToRight = () => transferLoadout("right");
  const transferLoadoutToLeft = () => transferLoadout("left");

  return (
    <div id="calc-bottom">
      <GearLoadout
        itemList={itemList}
        loadout={loadoutLeft}
        setLoadout={setLoadoutLeft}
        transferLoadout={transferLoadoutToRight}
        user={user}
        setUser={setUser}
        boxNum={1}
      />

      <GearLoadout
        itemList={itemList}
        loadout={loadoutRight}
        setLoadout={setLoadoutRight}
        transferLoadout={transferLoadoutToLeft}
        user={user}
        setUser={setUser}
        boxNum={2}
      />
    </div>
  )
}

export default CalcBottom;