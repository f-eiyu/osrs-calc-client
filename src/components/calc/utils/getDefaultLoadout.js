const getDefaultLoadout = (itemList) => {
  const slotNames = Object.keys(itemList);
  const defaultLoadout = {};
  defaultLoadout.style = "crush";
  defaultLoadout.styleType = "accurate";
  slotNames.forEach(slot => defaultLoadout[slot] = "None");

  return defaultLoadout;
}

export default getDefaultLoadout;