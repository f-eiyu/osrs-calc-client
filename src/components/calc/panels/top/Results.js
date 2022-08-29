import { useState } from "react";

import OneResult from "./OneResult";
import ResultsDiff from "./ResultsDiff";

const defaultResults = {
  accuracy: 0,
  maxHit: 0,
  speed: 0,
  dps: 0,
  killTime: 0
}

const Results = (props) => {
  const { itemList, loadoutLeft, loadoutRight } = props;
  const { npc, player } = props;

  const [resultsLeft, setResultsLeft] = useState({ ...defaultResults });
  const [resultsRight, setResultsRight] = useState({ ...defaultResults });

  return (
    <div id="results">
      <h2>Results</h2>
      <div id="results-area">
        <span className="table-label"></span>
        <span className="table-label">Loadout 1</span>
        <span className="table-label">Loadout 2</span>
        <span className="table-label">Diff</span>

        <div id="results-labels">
          <div className="table-label">Accuracy</div>
          <div className="table-label">Max Hit</div>
          <div
            className="table-label"
            title="The loadout's weapon must wait for this amount of time in between each attack. A higher number denotes a slower attack speed."
            style={{textDecorationStyle: "dotted", textDecorationLine: "underline"}}
          >Cooldown</div>
          <div className="table-label">DPS</div>
          <div className="table-label">Kill Time</div>
        </div>

        <OneResult
          itemList={itemList}
          loadout={loadoutLeft}
          npc={npc}
          player={player}
          results={resultsLeft}
          setResults={setResultsLeft}
        />

        <OneResult
          itemList={itemList}
          loadout={loadoutRight}
          npc={npc}
          player={player}
          results={resultsRight}
          setResults={setResultsRight}
        />

        <ResultsDiff
          resultsLeft={resultsLeft}
          resultsRight={resultsRight}
        />
      </div>
    </div>
  );
}

export default Results;