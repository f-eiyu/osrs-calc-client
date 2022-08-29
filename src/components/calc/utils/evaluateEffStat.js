const evaluateEffStat = (stat, baseAmount, boosts, prayers, rigourStrength = false) => {
  // floor at 1, cap at 9
  let effectiveStat = Math.max(Math.min(baseAmount, 99), 1)

  // fetch the stat's corresponding boost and prayer
  const currentBoost = boosts[stat];
  const currentPrayer = prayers[stat];
  
  // save a bit of computing power
  if (currentBoost === "None" && currentPrayer === "None") {
    return effectiveStat;
  }

  const boostPercentage = (percent) => {
    return Math.floor(effectiveStat * percent / 100);
  }

  // apply the appropriate boost
  let boostBonus = 0;
  switch (currentBoost) {
    // most boosts only affect one stat, or boosts all involved stats in the
    // same way, so we can skip checking the current stat and just apply the
    // boost as-is.
    case "Atk potion":
    case "Str potion":
      boostBonus = 3 + boostPercentage(10);
      break;
    case "Super atk potion":
    case "Super str potion":
      boostBonus = 5 + boostPercentage(15);
      break;
    case "Ranging potion":
      boostBonus = 4 + boostPercentage(10);
      break;
    case "Magic potion":
      boostBonus = 4;
      break;
    case "Ancient brew":
      boostBonus = 2 + boostPercentage(5);
      break;
    case "Imbued heart":
      boostBonus = 1 + boostPercentage(10);
      break;
    case "Overload (+)":
      boostBonus = 6 + boostPercentage(16);
      break;


    // zamorak brews, however, affect attack and strength differently and so
    // will need just a bit of special handling
    case "Zamorak brew":
      if (stat === "attack") { boostBonus = 2 + boostPercentage(20); }
      else if (stat === "strength") { boostBonus = 2 + boostPercentage(12); }
      break;

    default:
      break;
  }
  // boosts are applied first, then prayer is calculated
  effectiveStat += boostBonus;

  // apply the appropriate prayer -- this one's easy, since the percentages are
  // directly in the name!
  let prayerBonus = 0;
  if (currentPrayer !== "None") {
    const prayerBonusStr = currentPrayer.split(" ").slice(-1)[0];
    const prayerBonusPercent = parseInt(prayerBonusStr.slice(1, -1));
    const rigourStrBonus = (rigourStrength && currentPrayer === "Rigour (20%)" ? 3 : 0);

    prayerBonus = boostPercentage(prayerBonusPercent + rigourStrBonus);
  }
  effectiveStat += prayerBonus;
  
  return effectiveStat;
}

export default evaluateEffStat;