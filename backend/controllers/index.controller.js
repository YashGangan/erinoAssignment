import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "yash2004",
  database: "CRUD",
  port: "5432",
});

const getContacts = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT id, first_name, last_name, email, phone, company, job_title FROM contacts ORDER BY id ASC"
    );
    res.status(200).json(response.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving contacts" });
  }
};

const createContact = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, company, job_title } = req.body;

    const response = await pool.query(
      "INSERT INTO contacts (first_name, last_name, email, phone, company, job_title) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [first_name, last_name, email, phone, company, job_title]
    );

    res.status(201).json({
      message: "A new contact was created",
      body: response.rows[0], // Return the created contact
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating contact" });
  }
};

const updateContact = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;

    const response = await pool.query(
      "UPDATE contacts SET first_name = $1, last_name = $2, email = $3, phone = $4, company = $5, job_title = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *",
      [firstName, lastName, email, phone, company, jobTitle, id]
    );

    if (response.rowCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({
      message: "Contact updated successfully",
      body: response.rows[0], // Return the updated contact
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating contact" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const response = await pool.query("DELETE FROM contacts WHERE id = $1 RETURNING *", [id]);

    if (response.rowCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({
      message: `Contact with ID ${id} was deleted successfully`,
      body: response.rows[0], // Return the deleted contact
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting contact" });
  }
};

export {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
