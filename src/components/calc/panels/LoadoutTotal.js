
const LoadoutTotal = (props) => {
  const { attackList, strengthList } = props;

  const totalAtk = Object.values(attackList).reduce((sum, n) => sum + n, 0);
  const totalStr = Object.values(strengthList).reduce((sum, n) => sum + n, 0);

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