import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function EditContactDialog({ openEdit, setOpenEdit, selectedContact, fetchContacts }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    company: '',
  });

  // Update form data when selectedContact changes
  useEffect(() => {
    if (selectedContact) {
      setFormData({
        firstName: selectedContact.firstName,
        lastName: selectedContact.lastName,
        email: selectedContact.email,
        phone: selectedContact.phone,
        jobTitle: selectedContact.jobTitle,
        company: selectedContact.company,
      });
    }
  }, [selectedContact]);

  const handleClose = () => {
    setOpenEdit(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/contacts/${selectedContact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchContacts();
        handleClose(); 
      } else {
        console.error('Error updating contact');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Dialog open={openEdit} onClose={handleClose}>
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            variant="standard"
            fullWidth
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
            margin="dense"
          />
          <TextField
            label="Last Name"
            variant="standard"
            fullWidth
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
            margin="dense"
          />
          <TextField
            label="Email"
            variant="standard"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            margin="dense"
            type="email"
          />
          <TextField
            label="Phone"
            variant="standard"
            fullWidth
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            margin="dense"
            type="tel"
          />
          <TextField
            label="Job Title"
            variant="standard"
            fullWidth
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            required
            margin="dense"
          />
          <TextField
            label="Company"
            variant="standard"
            fullWidth
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
            margin="dense"
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
