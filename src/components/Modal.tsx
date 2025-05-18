
import React, { ReactNode } from 'react';
import { Modal, Button } from 'react-bootstrap';

// Define the props interface for the modal component
interface ModalComponentProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  children: ReactNode;
  // Optional props with default values
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryAction?: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  show,
  handleClose,
  title,
  children,
  primaryButtonText = "Save changes",
  secondaryButtonText = "Close",
  onPrimaryAction,
}) => {
  
  // Default primary action is to close the modal if no custom action is provided
  const handlePrimaryAction = (): void => {
    if (onPrimaryAction) {
      onPrimaryAction();
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {secondaryButtonText}
        </Button>
        <Button variant="primary" onClick={handlePrimaryAction}>
          {primaryButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;