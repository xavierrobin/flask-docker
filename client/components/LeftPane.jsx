'use client'
import { useState } from "react";
import AsyncSelect from 'react-select/async';
import { useRouter } from 'next/navigation';

export default function LeftPane(props) {
  const router = useRouter();

  const [selectedClient, setSelectedClient] = useState('');
  
  function handleClientSelection(option) {
    console.log(option);
    setSelectedClient(option ? option : "");
    console.log(selectedClient);
    router.push(`/clients/${option.value}`);
  }


  const fetchClients = async (inputValue) => {
    const res = await fetch(`http://localhost:8000/clients?name=${inputValue}`);
    const data = await res.json();
    return data.data.map((client) => ({ label: client.name, value: client.id }));
  };
  
  const filterOptions = (option, inputValue) => {
    return option.label.toLowerCase().includes(inputValue.toLowerCase());
  };

  return (
        <div className='container'>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Select client</label>
            <AsyncSelect 
              loadOptions={fetchClients} 
              filterOption={filterOptions}
              defaultOptions={true}
              onChange={handleClientSelection}
            />
          </div>
        </div>
  );
}