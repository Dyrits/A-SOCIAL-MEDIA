const mongoose = require("mongoose");

const uri = process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : "mongodb://localhost/a-social-media";

mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${uri}!`);
});

mongoose.connection.on("error", error => {
  console.log(`Mongoose connection error: ${error}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected!");
});


const gracefulShutdown = (message, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${message}!`);
    callback();
  });
};


process.once("SIGUSR2", () => {
  gracefulShutdown("---", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});


process.on("SIGINT", () => {
  gracefulShutdown("---", () => {
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  gracefulShutdown("---", () => {
    process.exit(0);
  });
});


require("../models/User");
require("../services/passport");
