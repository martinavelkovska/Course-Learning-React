import { useState } from "react";
export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  //for players names and symbols
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  //when updated state based on the previous state i should pass a function
  function handleEditClick() {
    setIsEditing((editing) => !editing); //when i click on save to be edit ==> is editing ? true : false

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    //da se promeni imeto na igracot i zacuva because we managing as a state
    setPlayerName(event.target.value);
  }
  /*let btnCaption = 'Edit';
  DR NACIN! na zamenuvanje na edit so save
  if(isEditing){
    playerName = <input type="text" required />

    btnCaption="Save";
  }*/

  //dr nacin za player - edit and save kopceto:
  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    ); // two - way binding
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      {/*  we must replace hard corded value with dynamic*/}
    </li>
  );
}
