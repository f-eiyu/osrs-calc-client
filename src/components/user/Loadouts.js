import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadoutEntry from "./LoadoutEntry";

import { getLoadouts, deleteLoadout } from "../../api/user";

import "../shared/user-stuff.css";

const Loadouts = (props) => {
  const { user, setUser } = props;

  const navigate = useNavigate();

  // update loadouts using index route on page load
  useEffect(() => {
    getLoadouts(user)
      .then(res => res.data.loadouts)
      .then(newLoadouts => {
        const newUser = { ...user };
        newUser.loadouts = newLoadouts;
        setUser(newUser);
      })
      .catch(() => alert("Server error while fetching loadouts."));
  });

  const handleDelete = (event, loadoutName) => {
    event.preventDefault();

    deleteLoadout(user, loadoutName)
      .then(() => navigate("/loadouts"))
      .catch(() => alert(`Server error while deleting loadout "${loadoutName}.`));
  }

  const loadouts = user.loadouts;
  let loadoutEntries = Object.keys(loadouts);
  if (!loadoutEntries.length) {
    loadoutEntries = (<div>You have no gear loadouts :(</div>);
  } else {
    loadoutEntries = loadoutEntries.map((loadout, i) => (
      <LoadoutEntry
        user={user}
        loadoutName={loadout}
        loadout={loadouts[loadout]}
        handleDelete={handleDelete}
        key={`loadout-${i}`}
      />
    ));
  }

  return (
    <div id="loadouts-main" className="main-container">
      <h1>Loadouts</h1>
      {loadoutEntries}
    </div>
  )
}

export default Loadouts;