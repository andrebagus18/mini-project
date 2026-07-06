import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const App = () => {
  const [text, setText] = useState(""); // satu string kosong karena hanya satu input
  const [todos, setTodos] = useState([]); // array kosong karena saya ingin membuat daftar
  const [editId, setEditId] = useState(null); // default false karena belum edit

  // fungsi get all data
  // findAll untuk ambil semua data.
  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos");
      setTodos(response.data);
    } catch (error) {
      alert("Gagal memuat data: " + error.message);
    }
  };
  // menjalankan fungsi getTasks sekali saat halaman dimuat
  useEffect(() => {
    getTasks();
  }, []);

  // ini fungsi add atau tambah todo
  // ada kondisi jika mode edit dengan menyimpan state edit
  // dan ada kondisi jika bukan mode edit
  // edit => samakah id nya ? => jika sama lakukan perubahan yang diminta jika tidak kembalikan array semula
  // selain dari itu , lakukan tambah todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!text) return alert("Input tidak boleh kosong");
    if (editId !== null) {
      try {
        // 1. Ambil ID langsung dari state 'editId'
        // 2. Ambil Value Teks Baru langsung dari state 'text' (hasil ketikan input)
        const response = await axios.put(
          `http://localhost:5000/api/todos/${editId}`,
          { task: text }, // 'text' adalah value yang sudah diedit dari kotak input HTML
        );
        if (response.data.msg === "Success") {
          alert("Data berhasil di Update!");
          getTasks();
          setEditId(null); // reset mode edit/ id edit
          setText(""); // reset input
        }
      } catch (error) {}
    } else {
      try {
        const response = await axios.post("http://localhost:5000/api/todos", {
          task: text,
        });
        if (response.status === 201 || response.data.msg.includes("Success")) {
          (alert(response.data.msg), setText("")); //kosongkan input
          getTasks();
        }
      } catch (error) {
        alert("Gagal! " + (error.response?.data?.msg || error.message));
      }
    }
  };

  // edit
  const editTodo = (todo) => {
    setEditId(todo.id); // simpan ID sebagai penanda
    setText(todo.task); // isi input dengan teks(nama kolom db) yang sudah ada sesuai ID nya.
  };

  // ambil id
  //filter id yang tidak sama kembalikan, id yang sama hapus
  // masukkan hasil akhir ke setTodos
  const deleteTodo = async (todoId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/todos/${todoId}`,
      );
      if (response.data.msg.includes("Success")) {
        alert("Data berhasil dihapus!");
        setTodos(todos.filter((item) => item.id !== todoId));
      }
    } catch (error) {
      alert("Gagal menghapus data!");
    }
  };

  const formatTanggal = (stringTanggal) => {
    // Jika tanggal dari database tidak ada
    if (!stringTanggal) return "-";

    const opsi = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    // Mengubah string tanggal menjadi format Indonesia (id-ID)
    return new Date(stringTanggal).toLocaleDateString("id-ID", opsi);
  };

  return (
    <>
      <div className="flex border border-slate-400 rounded-xl bg-white max-w-3xl mx-auto mt-20">
        <div className="p-4 border-r border-r-slate-300">
          <h1 className="text-slate-400 text-lg mb-4">Tasks:</h1>
          <span className="text-black">ToDo</span>
          <form onSubmit={addTodo}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="py-1 px-2 rounded-lg border border-slate-400 text-black"
              placeholder="add todo..."
            />
            <button
              type="submit"
              className="py-1 px-2 rounded-lg border border-slate-400 ml-2 cursor-pointer"
            >
              {editId !== null ? "Update" : "Submit"}
            </button>
          </form>
        </div>
        <div className="p-4">
          <h1 className="text-slate-400 text-lg mb-10">Value:</h1>
          <ul className="space-y-2">
            {todos.map((todo, index) => (
              <li
                key={todo.id}
                className="flex items-center justify-between gap-2"
              >
                ({index + 1}, {todo.task}, {formatTanggal(todo.created_at)})
                <button type="button" onClick={() => editTodo(todo)}>
                  <FaEdit />
                </button>
                <button type="button" onClick={() => deleteTodo(todo.id)}>
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
