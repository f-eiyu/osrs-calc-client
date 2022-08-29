import roundHundredth from "../../utils/roundHundredth";

const ResultsDiff = (props) => {
  const { resultsLeft, resultsRight } = props;

  console.log(resultsLeft, resultsRight);

  const diffJsx = Object.keys(resultsLeft).map(result => {
    const resultLeft = resultsLeft[result];
    const resultRight = resultsRight[result];

    // compare using the left result as a baseline
    const percentChange = roundHundredth(100 * (resultRight - resultLeft) / resultLeft);

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