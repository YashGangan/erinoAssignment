import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack, Typography, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddContactDialog from './AddContactDialog';
import EditContactDialog from './EditContactDialog';
import DeleteContactDialog from './DeleteContactDialog';

const columns = (handleEditOpen, handleDeleteOpen) => [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 100 },
  { field: 'lastName', headerName: 'Last Name', width: 100 },
  {
    field: 'email',
    headerName: 'Email',
    width: 170,
    sortable: false,
  },
  {
    field: 'phone',
    headerName: 'Phone Number',
    width: 150,
    sortable: false,
  },
  { field: 'jobTitle', headerName: 'Job Title', width: 170 },
  { field: 'company', headerName: 'Company', width: 170 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 180,
    sortable: false,
    renderCell: params => (
      <Stack direction="row" spacing={1} alignItems="self-end">
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={() => handleEditOpen(params.row)}
          sx={{ p: 1 }}
        >
          <EditIcon />
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          onClick={() => handleDeleteOpen(params.row)}
          sx={{ p: 1 }}
        >
          <DeleteIcon />
        </Button>
      </Stack>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function Table() {
  const [selectedContact, setSelectedContact] = useState(null); // for editing and deleting
  const [contacts, setContacts] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:3000/contacts');
      const data = await response.json();
      setContacts(
        data.map(contact => ({
          ...contact,
          firstName: contact.first_name,
          lastName: contact.last_name,
          jobTitle: contact.job_title,
          id: contact.id,
        }))
      );
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddOpen = () => setOpenAdd(true);
  const handleEditOpen = (contact) => {
    setOpenEdit(true);
    setSelectedContact(contact);
  };
  const handleDeleteOpen = (contact) => {
    setOpenDelete(true);
    setSelectedContact(contact);
  };
  const handleAddClose = () => setOpenAdd(false);
  const handleEditClose = () => setOpenEdit(false);
  const handleDeleteClose = () => setOpenDelete(false);

  return (
    <>
      <Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            my: 3,
            mx: 10,
          }}
        >
          <Typography variant="h4">Contact List</Typography>
          <Button variant="contained" onClick={handleAddOpen}>
            Add New Contact
            <AddIcon sx={{ pl: 1, fontSize: 'medium' }} />
          </Button>
        </Stack>

        <Paper sx={{ height: 'max-content', width: 'full', mx: 10 }}>
          <DataGrid
            rows={contacts}
            columns={columns(handleEditOpen, handleDeleteOpen)}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            sx={{ border: 0 }}
          />
        </Paper>
      </Stack>

      {/* Add Contact Dialog */}
      <AddContactDialog openAdd={openAdd} setOpenAdd={setOpenAdd} fetchContacts={fetchContacts} />

      {/* Edit Contact Dialog */}
      <EditContactDialog openEdit={openEdit} setOpenEdit={setOpenEdit} selectedContact={selectedContact} fetchContacts={fetchContacts}/>

      {/* Delete Confirmation Dialog */}
      <DeleteContactDialog openDelete={openDelete} setOpenDelete={setOpenDelete} selectedContact={selectedContact} fetchContacts={fetchContacts} />
    </>
  );
}
