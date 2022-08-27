const Footer = () => {
  const currentYear = (new Date()).getFullYear();

  return (
    <div id="footer">
      Data and formulas are sourced from the <a href="https://oldschool.runescape.wiki/">OSRS Wiki</a> and <a href="https://pypi.org/project/osrsreboxed/">OSRS Reboxed</a>. Old School RuneScape is © 1999 - { currentYear } <a href="https://oldschool.runescape.com/">Jagex Games Ltd</a>.
    </div>
  )
}

export default Footer;