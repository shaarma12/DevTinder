const moongoose = require("mongoose");

const connectDB = async () => {
  await moongoose.connect(
    "mongodb+srv://himanshusharma1581:Nsitee18@namastenode.h3ywh.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
