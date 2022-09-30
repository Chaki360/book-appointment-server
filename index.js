const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gncqied.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const appointmentCollection = client.db('Book-Appointment').collection('Appointment');

        app.post('/appointment', async (req, res) => {
            const newAppointment = req.body;
            const result = await appointmentCollection.insertOne(newAppointment);
            res.send(result);

        });
        app.get('/appointment', async (req, res) => {
            const query = {};
            const cursor = appointmentCollection.find(query);
            const Appointments = await cursor.toArray();
            res.send(Appointments)
        });

    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send(' Appointment booking Server Running!!!!')
})

app.listen(port, () => {
    console.log(`Hello from Appointment Server ${port}`)
})