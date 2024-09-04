const mongoose = require("mongoose");

//connection
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;


const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.3ts3m.mongodb.net/`
    );

    console.log("conectou no banco");
    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn()
module.exports = conn;
