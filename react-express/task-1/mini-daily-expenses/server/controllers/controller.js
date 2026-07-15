import expensesModel from "../models/model.js";

export const getExpenses = async (req, res) => {
  try {
    const getAll = await expensesModel.findAll();
    if (getAll.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(getAll);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
};

export const create = async (req, res) => {
  const { category, description, date, nominal } = req.body;
  if (category === "" && description === "" && date === "" && nominal === "") {
    return res.status(400).json({ msg: "Field is required" });
  }
  const newData = await expensesModel.create({
    category: category,
    description: description,
    date: date,
    nominal: nominal,
  });
  res.status(200).send({
    msg: "Success, daily expenses added!",
    data: newData,
  });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { category, description, date, nominal } = req.body;
  try {
    const editData = await expensesModel.findByPk(id);
    if (!editData) {
      return res.status(404).json({ msg: "Data tidak ditemukan!" });
    }
    editData.category = category;
    editData.description = description;
    editData.date = date;
    editData.nominal = nominal;
    await editData.save();
    return res.status(200).send({
      msg: "Success, berhasil diupdate!",
      data: editData,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

export const deleted = async (req, res) => {
  const { id } = req.params;
  const deletedId = await expensesModel.destroy({ where: { id: id } });
  if (deletedId === 0) {
    return res.status(404).json({ msg: "Not found!" });
  }
  return res.status(200).send({
    msg: "Success, daily expenses deleted",
  });
};
