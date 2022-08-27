
const LoadoutTotal = (props) => {
  const { itemList, loadout } = props;

  const totalAtk = "test atk";
  const totalStr = "test str";

  return (
    <div className="loadout-row">
      <span className="loadout-name">Total</span>
      <span />
      <span className="loadout-name">{totalAtk}</span>
      <span className="loadout-name">{totalStr}</span>
    </div>
  )
}

export default LoadoutTotal;