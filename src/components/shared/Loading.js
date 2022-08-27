import Spinner from "react-bootstrap/Spinner";

const loadingPageStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh"
};

const spinnerStyle = {
  height: "6rem",
  width: "6rem"
}

const Loading = () => (
    <div style={ loadingPageStyle }>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
        integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
        crossOrigin="anonymous"
      />
      <Spinner role="status" animation="border" style={ spinnerStyle }>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
)

export default Loading