const GearStyleSelect = (props) => {
  const { boxNum, items, loadout } = props;
  const currentWeapon = items[loadout.weapon];
  const styleList = currentWeapon.weapon.stances;

  const styleListOptions = styleList.map((style, i) => {
    const styleString = `${style.combat_style} (${style.attack_style} ${style.attack_type})`;

    return (
      <option
        key={`style-selelct-${boxNum}-${i}`}
        value={style.attack_type}
      >
        {styleString}
      </option>
    );
  })

  return (
    <div className="loadout-row">
      <span className="loadout-name">Style</span>
      <select
        style={{width: "14.6em", margin: "0 auto"}}
        disabled={!styleListOptions.length}
      >
        {styleListOptions}
      </select>
    </div>
  );
}

export default GearStyleSelect;