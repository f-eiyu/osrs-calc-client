import { useState } from "react";

import LoadoutMenu from "./LoadoutMenu";
import LoadoutMenuButton from "./LoadoutMenuButton";

const LoadoutOptions = (props) => {
  const { user, setLoadout, transferLoadout, boxNum } = props;

  const [loadoutSelection, setLoadoutSelection] = useState("");

  const userHasLoadouts = user ? (Object.keys(user.loadouts).length > 0) : false;

  const handleTransfer = (event) => {
    event.preventDefault();
    transferLoadout();
  }

  const handleLoadoutLoad = (event) => {
    event.preventDefault();
    setLoadout(user.loadouts[loadoutSelection]);
  }

  return (
    <div className="loadout-row">
      {
      boxNum === 2 ?
          (<form onSubmit={handleTransfer}>
            <input type="submit" value={boxNum === 1 ? ">>>" : "<<<"} />
          </form>) :
          <div></div>
      }

      <LoadoutMenu
        user={user}
        loadoutSelection={loadoutSelection}
        setLoadoutSelection={setLoadoutSelection}
        boxNum={boxNum}
        disabled={!userHasLoadouts}
      />

      <LoadoutMenuButton
        user={user}
        handleSubmit={handleLoadoutLoad}
        disabled={!userHasLoadouts}
      />

      {
        boxNum === 1 ?
          (<form onSubmit={handleTransfer}>
            <input type="submit" value={boxNum === 1 ? ">>>" : "<<<"} />
          </form>) :
          <div></div>
      }
    </div>  
  );
}

export default LoadoutOptions;