import { useState } from "react";

import { getPlayerFromHiscores } from "../../../../api/calc";

import PlayerStats from "./PlayerStats";

const PlayerSelect = (props) => {
  const [currentName, setCurrentName] = useState("");
  const [disableForm, setDisableForm] = useState(false);
  // eslint-disable-next-line
  const { currentPlayer, setCurrentPlayer } = props;
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!currentName) { return; }

    setDisableForm(true);

    getPlayerFromHiscores(currentName)
      .then(res => {
        const playerInfo = res.data;
        if (playerInfo.failed) {
          alert(`No player named ${currentName} was found!`);
        } else {
          const newPlayerInfo = {
            name: playerInfo.name,
            attack: playerInfo.attack.level,
            strength: playerInfo.strength.level,
            defence: playerInfo.defence.level,
            ranged: playerInfo.ranged.level,
            magic: playerInfo.magic.level,
            hitpoints: playerInfo.hitpoints.level,
            prayer: playerInfo.prayer.level,
            mining: playerInfo.mining.level,
            boosts: {
              attack: "None",
              strength: "None",
              ranged: "None",
              magic: "None"
            },
            prayers: {
              attack: "None",
              strength: "None",
              ranged: "None",
              magic: "None"
            }
          };

          setCurrentPlayer(newPlayerInfo);
        }
      })
      .catch(() => alert("Server request failed!"))
      .finally(() => setDisableForm(false));
  }

  const handleChange = (event) => {
    setCurrentName(event.target.value);
  }

  return (
    <div>
      <h2>Player</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentName}
          onChange={handleChange}
          disabled={disableForm}
        />
        <input
          type="submit"
          value="Find Player"
          disabled={disableForm}
        />
      </form>

      <PlayerStats
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
      />
    </div>
  )
}

export default PlayerSelect;