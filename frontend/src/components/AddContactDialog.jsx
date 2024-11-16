import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid2';

export default function AddContactDialog({ openAdd, setOpenAdd, fetchContacts }) {
  const [formError, setFormError] = useState('');

  const handleClose = () => {
    setOpenAdd(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    if (!formJson.firstName || !formJson.lastName || !formJson.email || !formJson.phone || !formJson.company || !formJson.jobTitle) {
      setFormError('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formJson.firstName,
          last_name: formJson.lastName,
          email: formJson.email,
          phone: formJson.phone,
          job_title: formJson.jobTitle,
          company: formJson.company,
        }),
      });

      if (response.ok) {
        fetchContacts(); 
        handleClose();
      } else {
        const errorData = await response.json();
        setFormError(errorData.message || 'Failed to add contact.');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      setFormError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Dialog
        open={openAdd}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details below to add a new contact to the list.
          </DialogContentText>

          {formError && (
            <DialogContentText color="error" sx={{ mb: 2 }}>
              {formError}
            </DialogContentText>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                margin="dense"
                id="firstName"
                name="firstName"
                label="First Name"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                margin="dense"
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                margin="dense"
                id="phone"
                name="phone"
                label="Phone Number"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                margin="dense"
                id="jobTitle"
                name="jobTitle"
                label="Job Title"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                margin="dense"
                id="company"
                name="company"
                label="Company"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
