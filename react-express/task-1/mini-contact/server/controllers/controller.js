import Contact from "../models/model.js";

export const getContacts = async (req, res) => {
  try {
    const contact = await Contact.findAll();
    if (contact.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const create = async (req, res) => {
  const { name, phone, email, address } = req.body;
  if (name === undefined && phone === undefined) {
    return res.status(400).json({
      msg: "Field is required",
    });
  }
  const contact = await Contact.create({
    name: name,
    phone: phone,
    email: email,
    address: address,
  });
  return res.send({
    msg: "Success, contact has been added!",
    data: contact,
  });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, address } = req.body;
  try {
    const editData = await Contact.findByPk(id);
    if (!editData) {
      return res.status(404).json({ msg: "Data tidak ditemukan!" });
    }
    editData.name = name;
    editData.phone = phone;
    editData.email = email;
    editData.address = address;
    await editData.save();
    return res.send({
      msg: "Success, contact updated!",
      data: editData,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleted = async (req, res) => {
  const { id } = req.params;
  const deletedId = await Contact.destroy({ where: { id: id } });
  if (deletedId === 0) {
    return res.status(404).json({ msg: "Not found!" });
  }
  return res.send({
    msg: "Success, deleted!",
  });
};
