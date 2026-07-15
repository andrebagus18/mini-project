import sequelize from "../configs/sequelize.js";
import { DataTypes } from "sequelize";

const Expenses = sequelize.define(
  "Expenses",
  {
    category: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    nominal: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "mini_expenses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default Expenses;
