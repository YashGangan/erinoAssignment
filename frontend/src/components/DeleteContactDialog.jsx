import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteContactDialog = ({ openDelete, setOpenDelete, selectedContact, fetchContacts }) => {
  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/contacts/${selectedContact.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedContact),
      });

      if (response.ok) {
        fetchContacts();
        handleClose(); 
      } else {
        console.error('Error deleting contact');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <>
        <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this contact?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will delete this record from the contacts list. Are you sure you want to delete the contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus >
            Confirm Delete
          </Button>
        </DialogActions>
        </Dialog>
    </>
  )
}

export default DeleteContactDialog