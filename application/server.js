/* eslint-disable no-unused-vars */
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = require('./app');
const port = process.env.PORT || 8000;
const db =
  process.env.DATABASE_URL.replace('<PASSWORD>', process.env.USER_PASSWORD) ||
  process.env.DATABASE_LOCAL;                                

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }) 
  
  const dbc = mongoose.connection;
  dbc.on("error", console.error.bind(console, "Connection error:"));
  dbc.once("open", function () {
    console.log("Database Connected");
  });

app.listen(port, (req, res) => {
  console.log(`listening at port ${port}`);
});
