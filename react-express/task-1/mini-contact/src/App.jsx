import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [contacts, setContacts] = useState([]);
  const [editId, setEditId] = useState(null);

  const getContacts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/contact");
      setContacts(response.data);
    } catch (error) {
      alert("Gagal memuat data: " + error.message);
    }
  };
  useEffect(() => {
    getContacts();
  }, []);

  const addContacts = async (e) => {
    e.preventDefault();
    console.log(form);
    if (!form.name || !form.phone) return alert("Field is required");
    if (editId !== null) {
      // ambil id dari state
      try {
        const response = await axios.put(
          `http://localhost:5000/api/contact/update/${editId}`,
          form,
        ); // karena form sudah berisi object contact
        if (response.data.msg.includes("Success")) {
          getContacts();
          setEditId(null);
          setForm({
            name: "",
            phone: "",
            email: "",
            address: "",
          });
        }
      } catch (error) {
        console.log(error.response?.data?.msg);
        alert(error.response.data.msg);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/contact/create",
          form,
        );
        if (response.status === 201 || response.data.msg.includes("Success")) {
          (alert(response.data.msg),
            setForm({
              name: "",
              phone: "",
              email: "",
              address: "",
            }),
            getContacts());
        }
      } catch (error) {
        console.log(error.response.data.msg);
        alert(error.response.data.msg);
      }
    }
  };

  const editContact = (contact) => {
    setEditId(contact.id);
    setForm({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      address: contact.address,
    });
  };

  const delContact = async (editId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/contact/deleted/${editId}`,
      );
      if (response.data.msg.includes("Success")) {
        alert(response.data.msg);
        setContacts(contacts.filter((item) => item.id !== editId));
      }
    } catch (error) {
      console.log(error);
      alert("Failed!");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex border border-slate-400 rounded-xl bg-slate-200 max-w-3xl mx-auto mt-20 shadow-xl">
        <div className="p-4 border-r border-r-slate-300">
          <h1 className="text-slate-400 text-lg mb-4">Add Contact:</h1>
          <form onSubmit={addContacts} id="contactForm">
            <div className="p-2 flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="editName"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="todo-item py-1 px-2 rounded-lg border border-slate-400 text-black"
                placeholder="Jhon Doe"
                required
              />
            </div>
            <div className="p-2 flex flex-col">
              <label htmlFor="name">Phone</label>
              <input
                type="tel"
                id="editPhone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="todo-item py-1 px-2 rounded-lg border border-slate-400 text-black"
                required
              />
            </div>
            <div className="p-2 flex flex-col">
              <label htmlFor="name">Email</label>
              <input
                type="email"
                id="editEmail"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="todo-item py-1 px-2 rounded-lg border border-slate-400 text-black"
                placeholder="jhon@gmail.com"
              />
            </div>
            <div className="p-2 flex flex-col">
              <label htmlFor="name">Address</label>
              <input
                type="text"
                id="editAddress"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="todo-item py-1 px-2 rounded-lg border border-slate-400 text-black"
                placeholder="Sun City"
              />
            </div>
            <button
              type="submit"
              className=" btnAction py-1 px-4 mt-3 rounded-lg border border-slate-400 ml-2 cursor-pointer"
            >
              {editId !== null ? "Update" : "Add"}
            </button>
          </form>
        </div>
        <div className="p-4">
          <h1 className="text-slate-400 text-lg mb-5">Result:</h1>
          <div className="grid grid-cols-2 gap-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex flex-col gap-2 contact-item"
              >
                <div className="flex flex-col gap-1 mb-1">
                  <span className="text-slate-400 text-md">Name</span>
                  <span className="text-black text-lg">{contact.name}</span>
                </div>
                <div className="flex flex-col gap-1 mb-1">
                  <span className="text-slate-400 text-md">Phone</span>
                  <span className="text-black text-lg">{contact.phone}</span>
                </div>
                <div className="flex flex-col gap-1 mb-1">
                  <span className="text-slate-400 text-md">Email</span>
                  <span className="text-black text-lg">{contact.email}</span>
                </div>
                <div className="flex flex-col gap-1 mb-1">
                  <span className="text-slate-400 text-md">Address</span>
                  <span className="text-black text-lg">{contact.address}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="editBtn"
                    onClick={() => editContact(contact)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => delContact(contact.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
