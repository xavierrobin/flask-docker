'use client'
import { useState } from "react";
import AsyncSelect from 'react-select/async';
import { useRouter } from 'next/navigation';
import {entrypointClient} from '../config/entrypoint';

export default function LeftPane(props) {
  const entry = entrypointClient;
  const router = useRouter();
  console.log(entrypointClient)

  const [selectedClient, setSelectedClient] = useState('');

  function handleClientSelection(option) {
    setSelectedClient(option ? option : "");
    router.push(`/clients/${option.value}/overview`);
  }

  const fetchClients = async (inputValue) => {
    const res = await fetch(`${entrypointClient}/clients?name=${inputValue}`);
    const data = await res.json();
    return data.data.map((client) => ({ label: client.name, value: client.id }));
  };
  
  const filterOptions = (option, inputValue) => {
    return option.label.toLowerCase().includes(inputValue.toLowerCase());
  };

  return (
        <>
          <div className="form-group">
            <label className='fw-semibold pb-1 text-dark'>Select a client</label>
            <AsyncSelect 
              loadOptions={fetchClients} 
              filterOption={filterOptions}
              defaultOptions={true}
              onChange={handleClientSelection}
              placeholder="Look for a client"
            />
          </div>
          <div className="mb-3"></div>
          <div className="alert alert-info" role="alert">
            <div className="">
            <i class="icon">info_outline</i> <b>Information</b><br />
            Information to be displayed here to inform quickly all staff that something is happening or to convey information they need to be aware of.
            </div>
          </div>
        </>
  );
}