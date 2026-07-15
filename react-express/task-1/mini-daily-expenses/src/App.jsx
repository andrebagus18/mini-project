import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    category: "",
    description: "",
    date: "",
    nominal: "",
  });
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);
  const total = expenses.reduce((acc, expense) => {
    return acc + expense.nominal;
  }, 0);

  const getExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses");
      setExpenses(response.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  useEffect(() => {
    getExpenses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addExpenses = async (e) => {
    e.preventDefault();
    console.log(form);
    if (!form.category || !form.description || !form.date || !form.nominal) {
      return alert("Field is required!");
    }
    if (editId !== null) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/expenses/edit/${editId}`,
          form,
        );
        if (response.status === 200) {
          getExpenses();
          setEditId(null);
          setForm({
            category: "",
            description: "",
            date: "",
            nominal: "",
          });
        }
      } catch (error) {
        alert(error.response.data.msg);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/expenses/create",
          form,
        );
        if (response.status === 200) {
          alert(response.data.msg);
          setForm({
            category: "",
            description: "",
            date: "",
            nominal: "",
          });
          getExpenses();
        }
      } catch (error) {
        alert(error.response.data.msg);
      }
    }
  };

  const editExpense = (expense) => {
    setEditId(expense.id);
    setForm({
      category: expense.category,
      description: expense.description,
      date: expense.date,
      nominal: expense.nominal,
    });
  };

  const delExpense = async (editId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/expenses/deleted/${editId}`,
      );
      if (response.status === 200) {
        alert(response.data.msg);
        setExpenses(expenses.filter((item) => item.id !== editId));
      }
    } catch (error) {
      alert(response.data.msg);
    }
  };

  return (
    <>
      <div className="flex flex-col border border-slate-400 rounded-xl bg-slate-200 max-w-3xl mx-auto my-20 shadow-xl">
        <div className="p-4">
          <h1 className="text-slate-400 text-lg mb-4">Add Expenses</h1>
          <form onSubmit={addExpenses}>
            <div className="p-2 flex flex-col">
              <label htmlFor="category">Kategori</label>
              <input
                type="text"
                id="editCategory"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="py-1 px-2 rounded-lg border border-slate-400 text-black"
                placeholder="makan bro..."
                required
              />
            </div>
            <div className="p-2 flex flex-col">
              <label htmlFor="description">Deskripsi</label>
              <input
                type="text"
                id="editDescription"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="py-1 px-2 rounded-lg border border-slate-400 text-black"
                required
              />
            </div>
            <div className="p-2 flex flex-col">
              <label htmlFor="date">Tanggal</label>
              <input
                type="date"
                id="editDate"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="py-1 px-2 rounded-lg border border-slate-400 text-black"
              />
            </div>
            <div className="p-2 flex flex-col">
              <label htmlFor="nominal">Nominal</label>
              <input
                type="text"
                id="editNominal"
                name="nominal"
                value={form.nominal}
                onChange={handleChange}
                className="py-1 px-2 rounded-lg border border-slate-400 text-black"
              />
            </div>
            <button
              type="submit"
              className="btnAction py-1 px-4 mt-3 rounded-lg border border-slate-400 ml-2 cursor-pointer"
            >
              {editId !== null ? "Update" : "Submit"}
            </button>
          </form>
        </div>
        <div className="p-4">
          <h1 className="text-slate-400 text-lg mb-5">Result:</h1>
          <div className="flex flex-col border border-slate-400 rounded-xl p-4 mb-2">
            <h2 className="text-md font-normal">Total Pengeluaran</h2>
            <p className="text-xl font bold ">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(total)}
            </p>
          </div>
          <div className=" p-4 w-full border border-slate-400 rounded-xl">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-b-slate-400">
                  <th>No.</th>
                  <th>Kategori</th>
                  <th>Deskripsi</th>
                  <th>Tanggal</th>
                  <th>Nominal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={expense.id}>
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{expense.category}</td>
                    <td className="p-2">{expense.description}</td>
                    <td className="p-2">
                      {new Date(expense.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-2">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(expense.nominal)}
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="editBtn"
                          onClick={() => editExpense(expense)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => delExpense(expense.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
