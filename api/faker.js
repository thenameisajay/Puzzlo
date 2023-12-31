const mongoose = require("mongoose");
const connectDB = require("./database/connection");
const Leaderboard = require("./models/leaderboard");
const { faker } = require("@faker-js/faker");
const moment = require("moment");

const today = new Date();

const generatePassword = () => {
  const digits = new Set();
  while (digits.size < 4) {
    digits.add(Math.floor(Math.random() * 10));
  }
  return Array.from(digits).join("");
};

connectDB()
  .then(async () => {
    console.log("MongoDB connected successfully");

    for (let i = 0; i < 10; i++) {
      const score = Math.floor(Math.random() * 100000) + 1;
      const numberOfTries = Math.floor(Math.random() * 100) + 1;
      const fakeUser = {
        username: faker.internet.userName(),
        numberOfTries: numberOfTries,
        score: score,
      };

      let leaderboard = await Leaderboard.findOne({
        date: {
          $gte: moment(today).startOf("day").toDate(),
          $lte: moment(today).endOf("day").toDate(),
        },
      });
      if (leaderboard) {
        leaderboard.leaderboard.push(fakeUser);
        console.log("pushed : " + fakeUser.username);
      } else {
        leaderboard = new Leaderboard({
          date: today,
          password: generatePassword(),
          leaderboard: fakeUser,
        });
      }
      await leaderboard.save();
      console.log("leaderBoard document created : " + fakeUser.username);
    }
  })
  .catch((err) => console.error(err));
