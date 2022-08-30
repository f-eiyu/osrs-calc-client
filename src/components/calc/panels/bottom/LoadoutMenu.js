import { useEffect } from "react";

const LoadoutMenu = (props) => {
  const { user, boxNum } = props;
  const { loadoutSelection, setLoadoutSelection, disabled } = props;

  const loadouts = user?.loadouts;

  let menuOptionNames = [];
  const loadoutNames = user ? Object.keys(loadouts) : [];
  if (loadoutNames.length) {
    menuOptionNames = loadoutNames.sort();
  } else {
    menuOptionNames = ["(no loadouts saved)"];
  }

  useEffect(() => {
    setLoadoutSelection(menuOptionNames[0]);
  // eslint-disable-next-line
  }, []);
  
  const menuOptions = menuOptionNames.map((name, i) => {
    return (
      <option
        key={`loadout-${boxNum}-${i}`}
        value={name}
      >
        {name}
      </option>
    )
  });
  
  const handleChange = (event) => {
    setLoadoutSelection(event.target.value);
  }

  // don't render menu if not logged in
  if (!user) { return <div></div>; }

  return (
    <select
      value={loadoutSelection}
      onChange={handleChange}
      disabled={disabled}
    >
      {menuOptions}
    </select>
  );
}

export default LoadoutMenu;