

const LoadoutMenuButton = (props) => {
  const { user, handleSubmit, disabled } = props;

  // don't render button if not logged in
  if (!user) { return <div></div>; }

  return (
    <form onSubmit={handleSubmit}>
      <input type="submit" value="Load" disabled={disabled} />
    </form>
  );
}

export default LoadoutMenuButton;