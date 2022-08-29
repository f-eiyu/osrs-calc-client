import evaluateEffStat from "../../utils/evaluateEffStat";

const PlayerStatEntry = (props) => {
  const { stat, currentPlayer, setCurrentPlayer } = props;
  const boostOptions = ["None", ...props.boostOptions];
  const prayerOptions = ["None", ...props.prayerOptions];

  const boosts = currentPlayer.boosts;
  const prayers = currentPlayer.prayers;

  const handleStatFocus = (event) => {
    event.target.select();
  }

  const handleStatChange = (event) => {
    const newStatAmount = event.target.value;
    const newPlayer = { ...currentPlayer };

    newPlayer[stat] = newStatAmount;
    setCurrentPlayer(newPlayer);
  }

  const handleBoostChange = (event) => {
    const newPlayer = { ...currentPlayer };
    newPlayer.boosts[stat] = event.target.value;
    setCurrentPlayer(newPlayer);
  }

  const handlePrayerChange = (event) => {
    const newPlayer = { ...currentPlayer };
    newPlayer.prayers[stat] = event.target.value;
    setCurrentPlayer(newPlayer);
  }

  const boostOptionElements = boostOptions.map((opt, i) => {
    return (
      <option
        key={`boost-${i}`}
      >
        {opt}
      </option>
    );
  });

  const prayerOptionElements = prayerOptions.map((opt, i) => {
    return (
      <option
        key={`prayer-${i}`}
      >
        {opt}
      </option>
    )
  });

  return (
    <div className="player-stat-row">
      <span className="table-label" style={{textTransform: "capitalize"}}>
        {stat}
      </span>

      <input
        style={
          {width: "2em",
          appearance: "none",
          textAlign: "center",
          margin: "0 auto"
        }}
        type="number"
        onFocus={handleStatFocus}
        onChange={handleStatChange}
        value={currentPlayer[stat]}
      />

      <select
        className="select-boost"
        value={currentPlayer.boosts[stat]}
        onChange={handleBoostChange}
      >
        {boostOptionElements}
      </select>

      <select
        className="select-prayer"
        value={currentPlayer.prayers[stat]}
        onChange={handlePrayerChange}
      >
        {prayerOptionElements}
      </select>

      <span>
        {evaluateEffStat(stat, currentPlayer[stat], boosts, prayers)}
      </span>
    </div>
  );
}

export default PlayerStatEntry;