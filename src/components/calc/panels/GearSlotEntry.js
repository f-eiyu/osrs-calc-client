import TextField from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

const GearSlotEntry = (props) => {
  const { slot, items } = props;
  const itemNames = Object.keys(items);

  return (
      <div className="loadout-row">
        <label className="loadout-name">{slot}</label>
        <TextField
          Component="input"
          type="text"
          matchAny={true}
          trigger=""
          regex="^[a-zA-Z0-9_\-' ]+$"
          spacer=""
          maxOptions={10}
          options={itemNames}
        />
        <input className="atk-bonus-field" type="number" value="2"/>
        <input className="str-bonus-field" type="number" value="1"/>
      </div>
  );
}

export default GearSlotEntry;