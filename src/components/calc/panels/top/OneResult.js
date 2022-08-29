import evaluateEffStat from "../../utils/evaluateEffStat";
import recalculateAtk from "../../utils/recalculateAtk";
import recalculateStr from "../../utils/recalculateStr";
import roundHundredth from "../../utils/roundHundredth";

const getAccuracy = (player, npc, loadout, loadoutAtk) => {
  const weaponStyle = loadout.style;
  const weaponStyleType = loadout.styleType;
  let offensiveStat = 0;
  let finalAccuracy = 0;

  // melee
  if (weaponStyle === "crush"
      || weaponStyle === "slash"
      || weaponStyle === "stab") {
    // calculate effective attack
    offensiveStat = evaluateEffStat("attack", player.attack, player.boosts, player.prayers);

    // account for attack type
    if (weaponStyleType === "accurate") { offensiveStat += 3; }
    else if (weaponStyleType === "controlled") { offensiveStat += 1; }
    
    // finish effective attack formula
    offensiveStat += 8;
    offensiveStat = Math.floor(offensiveStat);

    // calculate attack roll
    let attackRoll = offensiveStat * (loadoutAtk + 64);
    // special bonuses from gear
    let gearBonus = 1;
    if (loadout.weapon === "Dragon hunter lance") { gearBonus *= 1.2; }
    attackRoll = Math.floor(attackRoll * gearBonus);

    // calculate corresponding defense roll
    const defenceStat = npc.defence_level;
    const defenceBonusKey = "defence_" + weaponStyle;
    const defenceBonus = npc[defenceBonusKey];
    const defenceRoll = (defenceStat + 9) * (defenceBonus + 64);
    
    if (attackRoll > defenceRoll) {
      finalAccuracy = 1 - ((defenceRoll + 2)/(2 * attackRoll + 2));
    }
    else {
      finalAccuracy = attackRoll / (2 * defenceRoll + 2);
    }
  }
  // ranged
  else if (weaponStyle === "ranged") {
    offensiveStat = evaluateEffStat("ranged", player.ranged, player.boosts, player.prayers);
    
    // account for attack type
    if (weaponStyleType === "accurate") { offensiveStat += 3; }

    // finish effective attack formula
    offensiveStat += 8;
    offensiveStat = Math.floor(offensiveStat);

    // calculate attack roll
    let attackRoll = offensiveStat * (loadoutAtk + 64);
    // special bonuses from gear
    let gearBonus = 1;
    attackRoll = Math.floor(attackRoll * gearBonus);

    // calculate corresponding defense roll
    const defenceStat = npc.defence_level;
    const defenceBonusKey = "defence_" + weaponStyle;
    const defenceBonus = npc[defenceBonusKey];
    const defenceRoll = (defenceStat + 9) * (defenceBonus + 64);

    if (attackRoll > defenceRoll) {
      finalAccuracy = 1 - ((defenceRoll + 2)/(2 * attackRoll + 2));
    }
    else {
      finalAccuracy = attackRoll / (2 * defenceRoll + 2);
    }
  }
  // magic
  else if (weaponStyle === "magic") {
    offensiveStat = evaluateEffStat("magic", player.magic, player.boosts, player.prayers);

    // account for attack type
    if (weaponStyleType === "accurate") { offensiveStat += 2; }

    // finish effective attack formula
    offensiveStat += 9;
    offensiveStat = Math.floor(offensiveStat);

    // calculate attack roll
    let attackRoll = offensiveStat * (loadoutAtk + 64);
    // special bonuses from gear
    let gearBonus = 1;
    attackRoll = Math.floor(attackRoll * gearBonus);

    // calculate corresponding defense roll
    const defenceStat = npc.magic_level;
    const defenceBonusKey = "defence_" + weaponStyle;
    const defenceBonus = npc[defenceBonusKey];
    const defenceRoll = (defenceStat + 9) * (defenceBonus + 64);

    if (attackRoll > defenceRoll) {
      finalAccuracy = 1 - ((defenceRoll + 2)/(2 * attackRoll + 2));
    }
    else {
      finalAccuracy = attackRoll / (2 * defenceRoll + 2);
    }
  }
  // error
  else {
    return "Error"
  }

  return finalAccuracy;
}

const getMaxHit = (player, npc, loadout, loadoutStr) => {
  const weaponStyle = loadout.style;
  const weaponStyleType = loadout.styleType;
  let offensiveStat = 0;
  let finalMaxHit = 1;

  // melee
  if (weaponStyle === "crush"
  || weaponStyle === "slash"
  || weaponStyle === "stab") {
    // calculate effective strength
    offensiveStat = evaluateEffStat("strength", player.strength, player.boosts, player.prayers);

    // account for weapon style
    if (weaponStyleType === "aggressive") { offensiveStat += 3; }
    else if (weaponStyleType === "controlled") { offensiveStat += 1; }

    // finish effective strength formula
    offensiveStat += 8;
    offensiveStat = Math.floor(offensiveStat);

    // calculate max hit
    const rawMaxHit = Math.floor((offensiveStat * (loadoutStr + 64) + 320) / 640);
    // special bonuses from gear
    let gearBonus = 1;
    if (loadout.weapon === "Dragon hunter lance") { gearBonus *= 1.2; }
    finalMaxHit = Math.floor(rawMaxHit * gearBonus);
  }
  // ranged
  else if (weaponStyle === "ranged") {
    offensiveStat = evaluateEffStat("ranged", player.ranged, player.boosts, player.prayers, true);

    // account for weapon style
    if (weaponStyleType === "accurate") { offensiveStat += 3; }

    // finish effective strength formula
    offensiveStat += 8;
    offensiveStat = Math.floor(offensiveStat);
    
    // calculate max hit
    const rawMaxHit = 0.5 + offensiveStat * (loadoutStr + 64) / 640;
    // special bonuses from gear
    let gearBonus = 1;
    finalMaxHit = Math.floor(rawMaxHit * gearBonus);
  }
  // magic
  else if (weaponStyle === "magic") {
    // magic has SO MANY SPECIAL CASES so i'm going to do everything else first
    // and if i don't get around to the five million special cases, it's magic's
    // fault for being like this in the first place!!!!!
  }
  // error
  else {
    return "Error"
  }

  return finalMaxHit;
}

const OneResult = (props) => {
  const { itemList, loadout, npc, player } = props;
  const { results, setResults } = props;

  const style = loadout.style;
  const disableShield = (itemList.weapon[loadout.weapon].equipment.slot === "2h");

  let atkBonusFromGear = 0;
  let strBonusFromGear = 0;
  for (const slot of Object.keys(itemList)) {
    const item = itemList[slot][loadout[slot]];
    atkBonusFromGear += recalculateAtk(item, style, disableShield);
    strBonusFromGear += recalculateStr(item, style, disableShield);
  }

  const accuracy = getAccuracy(player, npc, loadout, atkBonusFromGear);
  const maxHit = getMaxHit(player, npc, loadout, strBonusFromGear);
  let speed = itemList.weapon[loadout.weapon].weapon.attack_speed;
  if (loadout.styleType === "rapid") { speed -= 1; }
  speed *= 0.6;
  
  const averageHit = maxHit / 2;
  const dps = accuracy * averageHit / speed;

  const killTime = npc.hitpoints / dps;
  const killTimeMin = Math.floor(killTime / 60);
  const killTimeSec = roundHundredth(killTime % 60);
  const killTimeString = `${killTimeMin ? killTimeMin + " min " : ""}${killTimeSec} sec`;

  const newResults = {
    accuracy,
    maxHit,
    speed,
    dps,
    killTime
  };

  // to prevent infinite render looping, only change the result state if the
  // new and old results are different
  let shouldUpdate = false;
  for (const resultKey of Object.keys(newResults)) {
    if (results[resultKey] !== newResults[resultKey]) {
      shouldUpdate = true;
      break;
    }
  }
  if (shouldUpdate) {
    setResults(newResults);
  }

  return (
    <div>
      <div>{roundHundredth(accuracy * 100)}%</div>
      <div>{maxHit}</div>
      <div>{roundHundredth(speed)} sec</div>
      <div>{roundHundredth(dps)}</div>
      <div>{killTimeString}</div>
    </div>
  )
}

export default OneResult;