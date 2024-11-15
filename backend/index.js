import express, { json, urlencoded } from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;
// middlewares
app.use(cors())
app.use(json()); 
app.use(urlencoded({extended: false}));

// Routes
app.use(routes); // Use the imported routes

app.get("/", (req, res) => {
    res.send("Hello World");
})
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
