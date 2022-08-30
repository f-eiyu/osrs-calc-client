import LoadoutEntry from "./LoadoutEntry";


const Loadouts = (props) => {
  const { user } = props;
  const loadouts = user.loadouts;
  
  console.log(loadouts);

  let loadoutEntries;
  if (!Object.keys(loadouts).length) {
    loadoutEntries = (<div>You have no gear loadouts :(</div>);
  } else {
    loadoutEntries = loadouts.map((loadout, i) => (
      <LoadoutEntry
        loadout={loadout}
        key={`loadout-${i}`}
      />
    ));
  }

  return (
    <div id="loadouts-main">
      <h1>Loadouts</h1>
      {loadoutEntries}
    </div>
  )
}

export default Loadouts;