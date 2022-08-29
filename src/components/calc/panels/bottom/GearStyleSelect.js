import { useState, useEffect } from "react";

import capitalize from "../../utils/capitalize";
import recalculateAtk from "../../utils/recalculateAtk";
import recalculateStr from "../../utils/recalculateStr";

const GearStyleSelect = (props) => {
  const { boxNum, itemList, loadout, setLoadout } = props;
  const { attackList, setAttackList, strengthList, setStrengthList } = props;
  const { resetSelection, setResetSelection } = props;
  const { disableShield } = props;

  const [ styleSelection, setStyleSelection ] = useState("crush-accurate-0");

  const currentWeapon = itemList.weapon[loadout.weapon];
  const styleList = currentWeapon.weapon.stances;

  const styleListOptions = styleList.map((style, i) => {
    let styleString;
    if (style.attack_style && style.attack_type) {
      styleString = `${capitalize(style.combat_style)} (${style.attack_style} ${style.attack_type})`;
    } else {
      styleString = capitalize(style.combat_style);
    }

    let attackType = "crush";
    if (style.experience.includes("ranged")) { attackType = "ranged"; }
    else if (style.experience.includes("magic")) { attackType = "magic"; }
    else if (style.attack_type) { attackType = style.attack_type; }

    return (
      <option
        key={`style-select-${boxNum}-${i}`}
        value={`${attackType}-${style.attack_style || style.combat_style}-${i}`}
      >
        {styleString}
      </option>
    );
  });

  // reset the selected menu entry to the first one if a new weapon was selected
  useEffect(() => {
    if (resetSelection) {
      const style = styleList[0];
      let attackType = "crush";
      const attackStyleType = style.attack_style;
      
      if (style.experience.includes("ranged")) { attackType = "ranged"; }
      else if (style.experience.includes("magic")) { attackType = "magic"; }
      else if (style.attack_type) { attackType = style.attack_type; }

      setStyleSelection(`${attackType}-${attackStyleType}-${0}`)
      setResetSelection(false);
    }
  // eslint-disable-next-line
  }, [loadout]);

  const handleChange = (event) => {
    const newStyleValue = event.target.value.split("-");
    const newStyle = newStyleValue[0];
    const newStyleType = newStyleValue[1];

    // set the menu entry to the selected style
    setStyleSelection(event.target.value);

    // change the selected style
    const newLoadout = { ...loadout };
    newLoadout.style = newStyle;
    newLoadout.styleType = newStyleType;
    setLoadout(boxNum, newLoadout);

    // recalculate attack bonuses for the specified style
    const newAtk = { ...attackList };
    for (const atkSlot of Object.keys(attackList)) {
      const atkItem = itemList[atkSlot][newLoadout[atkSlot]];
      newAtk[atkSlot] = recalculateAtk(atkItem, newStyle, disableShield);
    }
    setAttackList(newAtk);

    // recalculate strength bonuses for the specified style
    const newStr = { ...strengthList };
    for (const strSlot of Object.keys(strengthList)) {
      const strItem = itemList[strSlot][newLoadout[strSlot]];
      newStr[strSlot] = recalculateStr(strItem, newStyle, disableShield);
    }
    setStrengthList(newStr);
  }

  return (
    <div className="loadout-row">
      <span className="loadout-name">Style</span>
      <select
        value={styleSelection}
        style={{width: "14.6em", margin: "0 auto"}}
        onChange={handleChange}
      >
        {styleListOptions}
      </select>
    </div>
  );
}

export default GearStyleSelect;