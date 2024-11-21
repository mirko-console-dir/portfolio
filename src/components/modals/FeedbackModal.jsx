
import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";

const FeedbackModal = ({image,name}) => {
  const [openModal, setOpenModal] = useState(false);
  if(!openModal) {
    return (<Button onClick={() => setOpenModal(true)}>View Complete Reference</Button>)
  }
  return (
      <Modal 
        show={openModal} 
        dismissible
        onClose={() => setOpenModal(false)}
        className="bg-opacity-50 "
      >
      <Modal.Header className="bg-black-100 border-2 border-b-0 border-t-sky-500 border-x-sky-500 rounded-t-lg"></Modal.Header>
        <Modal.Body className="bg-black-100 border-2 border-sky-500 rounded-b-lg">
            <img
              src={image}
              alt={`feedback_by-${name}`}
              className='w-full object-cover self-center'
            />
        </Modal.Body>
      </Modal>
  );
}
export default FeedbackModal;