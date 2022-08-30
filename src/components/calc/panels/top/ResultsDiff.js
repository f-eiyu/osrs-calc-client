import roundHundredth from "../../utils/roundHundredth";

const ResultsDiff = (props) => {
  const { resultsLeft, resultsRight } = props;

  const diffJsx = Object.keys(resultsLeft).map(result => {
    const resultLeft = resultsLeft[result];
    const resultRight = resultsRight[result];

    // compare using the left result as a baseline
    let percentChange = roundHundredth(100 * (resultRight - resultLeft) / resultLeft);
    // higher attack speed is worse
    if (result === "speed") percentChange *= -1;

    return (
      <div key={`result-${result}`}>
        {isNaN(percentChange) ? "N/A" : percentChange}%
      </div>
    )
  });

  return (
    <div>
      {diffJsx}
    </div>
  );
}

export default ResultsDiff;