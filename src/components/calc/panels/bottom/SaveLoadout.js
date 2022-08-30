

const SaveLoadout = (props) => {
  const { user, handleSubmit } = props;

  if (!user) { return; }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="submit"
        value="Save"
      />
    </form>
  );
}

export default SaveLoadout;