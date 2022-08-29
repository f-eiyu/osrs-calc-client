import PlayerStatEntry from "./PlayerStatEntry";

const PlayerStats = (props) => {
  const { currentPlayer, setCurrentPlayer } = props;

  return (
    <div id="player-stat-table">
      <div className="player-stat-row">
        <span className="table-label">Stat</span>
        <span className="table-label">Base</span>
        <span className="table-label">Boost</span>
        <span className="table-label">Prayer</span>
        <span className="table-label">Effective</span>
      </div>

      <PlayerStatEntry
        stat="attack"
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        boostOptions={[
          "Atk potion",
          "Super atk potion",
          "Zamorak brew",
          "Overload (+)"
        ]}
        prayerOptions={[
          "Clarity (5%)",
          "Improved Reflexes (10%)",
          "Incredible Reflexes (15%)",
          "Chivalry (15%)",
          "Piety (20%)"
        ]}
      />

      <PlayerStatEntry
        stat="strength"
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        boostOptions={[
          "Str potion",
          "Super str potion",
          "Zamorak brew",
          "Overload (+)"
        ]}
        prayerOptions={[
          "Burst of Strength (5%)",
          "Superhuman Strength (10%)",
          "Ultimate Strength (15%)",
          "Chivalry (18%)",
          "Piety (23%)"
        ]}
      />

      <PlayerStatEntry
        stat="ranged"
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        boostOptions={[
          "Ranging potion",
          "Overload (+)"
        ]}
        prayerOptions={[
          "Sharp Eye (5%)",
          "Hawk Eye (10%)",
          "Eagle Eye (15%)",
          "Rigour (20%)"
        ]}
      />

      <PlayerStatEntry
        stat="magic"
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        boostOptions={[
          "Magic potion",
          "Ancient brew",
          "Imbued heart",
          "Overload (+)"
        ]}
        prayerOptions={[
          "Mystic Will (5%)",
          "Mystic Lore (10%)",
          "Mystic Might (15%)",
          "Augury (25%)"
        ]}
      />
    </div>
  )
}

export default PlayerStats;