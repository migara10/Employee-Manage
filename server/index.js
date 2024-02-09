import express from 'express'

const app = express();

const PORT = 4100 || process.env.PORT;


app.listen(PORT, () => {
    console.log(`server running on: ${PORT}`)
})