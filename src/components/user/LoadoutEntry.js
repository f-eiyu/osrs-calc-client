import slotNames from "../calc/utils/slotNames";

const LoadoutEntry = (props) => {
  const { loadout, loadoutName, handleDelete } = props;

  const loadoutList = slotNames.map(slotName => {
    return (
      <div className="loadout-content-row">
        <div className="loadout-slot-name">{slotName}</div>
        <div>{loadout[slotName]}</div>
      </div>
    );
  });

  return (
    <div>
      <div className="loadout-title-bar">
        <h2 className="loadout-name">{loadoutName}</h2>
        <form onSubmit={event => handleDelete(event, loadoutName)}>
          <input type="submit" value="Delete" />
        </form>
      </div>
      <div className="loadout-contents">
        {loadoutList}
      </div>
    </div>
  );
}

export default LoadoutEntry;