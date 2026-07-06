import sequelize from "../configs/sequelize.js";
import { DataTypes } from "sequelize";

const Todo = sequelize.define(
  "Todo",
  {
    task: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "mini_todo",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default Todo;
