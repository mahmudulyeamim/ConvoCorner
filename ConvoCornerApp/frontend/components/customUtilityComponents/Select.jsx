import React, { useState } from 'react'

export default function Select() {
    const [character, setCharacter] = useState("");
    console.log(character);

    const handleCharacterChange = (e) => {
        setCharacter(e.target.value);
    };
  return (
    <div>
      <select className="select select-bordered w-full max-w-xs bg-white" defaultValue="default" onChange={handleCharacterChange}>
        <option value="default" disabled>Who shot first?</option>
        <option value={1}>Han Solo</option>
        <option value={2}>Greedo</option>
      </select>
    </div>
  )
}
