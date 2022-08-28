const recalculateAtk = (item, style, disableShield) => {
  if (item.equipment.slot === "shield" && disableShield) { return 0; }
  
  return item.equipment["attack_" + style];
}

export default recalculateAtk;