import express from "express";
import cors from "cors";
import taskRouter from "./routes/task.js";
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
// import sequelize from "./configs/sequelize.js";
// import Todo from "./models/todo.js"; // import models juga agar tahu table nya yang mana

// suruh sequelize.sync() untuk membuat table
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

app.use("/api/todos", taskRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
