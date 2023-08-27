import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    marginRight: '0',
    background: "transparent",
    display:"flex",
    alignItems:"center",
   
    
  },
};

Modal.setAppElement('#__next');

const ModalWindow = ({ isOpen, closeModal, children }:any) => {


  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal Window"
    >
      {children}
    </Modal>
  );
};

export default ModalWindow;
