'use client'

import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import WidgetDataForm from './WidgetDataForm.tsx';

function ModalBs(props, args) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <i className="icon text-muted" onClick={toggle}>edit</i>
      <Modal isOpen={modal} toggle={toggle} size='lg' {...args}>
        <ModalHeader toggle={toggle}>Update status</ModalHeader>
        <ModalBody>
          <WidgetDataForm
              widget_id={props.widget_id}
              modalToggle={setModal}
            />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalBs;