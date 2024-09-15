//The entry point of the server

const express = require('express');
const app = express();
require('dotenv').config()
const routes = require('./routes');

app.use('/api', routes);

const PORT = process.env.PORT || 6161;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));