const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Define the route for the app
const activitiesRoutes = require('./routes/activityRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://laynilin:ioH0C7wzLhaAyPk8@cluster0.owxba.mongodb.net/health-tracker"

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err)); 

app.use('/api/activities', activitiesRoutes);
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log(req.body); // Log the request body
    next();
})

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));