'use client'
import { useState } from "react";

export default function LeftPane(props) {
  const [selectedClient, setSelectedClient] = useState('');
  function handleClientSelection(event) {
    setSelectedClient(event.target.value);
  }
  console.log(selectedClient);
  return (
        <div className='container'>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Select client</label>
            <select
              className="form-control form-control-lg"
              value={selectedClient}
              onChange={handleClientSelection}
            >
              <option value="">Please select a client</option>
              <option value="Blackrock">Blackrock</option>
              <option value="Schroeders">Schroeders</option>
            </select>
          </div>
        </div>
  );
}