import express from 'express';
import dbConnection from './DB/connection.js'
import cors from "cors";

import user from './routes/user.js'

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET','PUT','POST'],
  credentials: true
}));
app.use('/api', user)

const PORT = 4100 || process.env.PORT;




app.listen(PORT, () => {
  console.log(`server running on: ${PORT}`);
});




// Connect to the MySQL server


