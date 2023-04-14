const mongoose = require('mongoose');

const url = 'mongodb://<username>:<password>@localhost:27017/<db-name>?directConnection=true';

mongoose.connect(url,  {useNewUrlParser: true,
    useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
