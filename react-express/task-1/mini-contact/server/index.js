import express from "express";
import cors from "cors";
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
import sequelize from "./config/sequelize.js";
import router from "./routes/route.js";

// suruh sequelize.sync() untuk membuat table
// import models juga agar tahu table nya yang mana
// import Contact from "./models/model.js";
// async function server() {
//   try {
//     await sequelize.authenticate();
//     await sequelize.sync();
//     console.log("Database Connected");
//   } catch (error) {
//     console.log("error");
//   }
// }
// server();

app.use("/api/contact", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
