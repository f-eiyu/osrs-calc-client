const recalculateStr = (item, style, disableShield) => {
  if (item.equipment.slot === "shield" && disableShield) { return 0; }

  switch (style) {
    case "stab":
    case "slash":
    case "crush":
      return item.equipment.melee_strength;
    case "ranged":
      return item.equipment.ranged_strength;
    case "magic":
      return item.equipment.magic_damage;
    default:
      return 0;
  }
}

export default recalculateStr;