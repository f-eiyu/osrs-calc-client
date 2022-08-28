const capitalize = (str) => {
  const firstChUpper = str[0].toUpperCase();
  return firstChUpper + str.slice(1);
}

export default capitalize;