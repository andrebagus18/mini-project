import Todo from "../models/todo.js";

// create task
export const create = async (req, res) => {
  const { task } = req.body;
  if (task === undefined) {
    return res.status(400).send({
      msg: "Task is required",
    });
  }
  const post = await Todo.create({
    task: task,
  });
  return res.send({
    msg: "Success, Task berhasil ditambahkan!",
    data: post,
  });
};

// get all data
export const getAllData = async (req, res) => {
  try {
    const getAll = await Todo.findAll();
    // Cek apakah datanya kosong
    if (getAll.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(getAll);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// edit task
export const editTodo = async (req, res) => {
  const { id } = req.params; // ambil url id dari axios misal http://localhost:5000/api/todos/7 ,
  const { task } = req.body; // Sebagai isi tulisan baru untuk menggantikan tulisan lama di database
  try {
    const editId = await Todo.findByPk(id); // ambil isi id
    if (!editId) {
      return res.status(404).json({ msg: "Data tidak ditemukan!" });
    }
    editId.task = task; // isi id dengan data baru
    await editId.save();

    return res.send({
      msg: "Success",
      data: editId,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// delete
export const deleted = async (req, res) => {
  const { id } = req.params;
  const deletedId = await Todo.destroy({ where: { id: id } });

  if (deletedId === 0) {
    return res.status(404).json({ msg: "Data tidak ditemukan!" });
  }

  return res.send({
    msg: `Success: Data no ${id} telah dihapus`,
  });
};
