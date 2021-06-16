const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Club = require(`${__dirname}/../../models/clubModel.js`);
const Finance = require(`${__dirname}/../../models/chairpersonModel.js`);
const Faculty = require(`${__dirname}/../../models/facultyModel.js`);
const Dean = require(`${__dirname}/../../models/deanModel.js`);

dotenv.config({ path: `${__dirname}/../../config.env` });

const db =
  process.env.DATABASE_URL.replace("<PASSWORD>", process.env.USER_PASSWORD) ||
  process.env.DATABASE_LOCAL;

const connect = async () => {
  await mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Database Connected");
    });
  process.exit();
};

const read = async () => {
    const clubSeeds = JSON.parse(fs.readFileSync(`${__dirname}/clubData.json`));
    const financeSeeds = JSON.parse(fs.readFileSync(`${__dirname}/financeData.json`));
    const facultySeeds = JSON.parse(fs.readFileSync(`${__dirname}/facultyData.json`));
    const deanSeeds = JSON.parse(fs.readFileSync(`${__dirname}/deanData.json`));
    //seeding clubs
    try {
        for (let club of clubSeeds) {
        await Club.create(club);
        }
        console.log("successfully seeded clubs!");
    } catch (err) {
        console.log("failed to seed clubs");
        console.log(err);
    }
    //seeding faculty
    try {
      for (let faculty of facultySeeds) {
        await Faculty.create(faculty);
      }
      console.log("successfully seeded faculties!");
    } catch (err) {
      console.log("failed to seed faculties");
      console.log(err);
    }
    //seeding finance
    try {
      for (let finance of financeSeeds) {
        await Finance.create(finance);
      }
      console.log("successfully seeded finance!");
    } catch (err) {
      console.log("failed to seed finance");
      console.log(err);
    }
    try {
      for (let dean of deanSeeds) {
        await Dean.create(dean);
      }
      console.log("successfully seeded dean!");
    } catch (err) {
      console.log("failed to seed dean");
      console.log(err);
    }
    
  process.exit();
};

const del = async () => {
  try {
      await Club.deleteMany();
      await Finance.deleteMany();
      await Faculty.deleteMany();
      await Dean.deleteMany();
    console.log("successfully deleted");
  } catch (err) {
    console.log("failed to delete");
    console.log(err);
  }
  process.exit();
};

connect();

if (process.argv[2] === "--import") {
  read();
} else if (process.argv[2] === "--delete") {
  del();
}
