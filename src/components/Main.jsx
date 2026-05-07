import React, { useState ,useEffect} from "react";

function Main() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    amount: "",
    date: "",
  });

  const [expense, setExpense] = useState(()=>{
    
  try {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
});
  const [search, setSearch] = useState("");

  useEffect(() => {
  localStorage.setItem("expenses", JSON.stringify(expense));
}, [expense]);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(event) {
    event.preventDefault();

    setExpense((prev) => [...prev, {...formData,id: crypto.randomUUID()}]);

    // clear form after submit
    setFormData({
      name: "",
      description: "",
      category: "",
      amount: "",
      date: "",
    });
  }

  const filteredExpenses = expense.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteBtn = (id)=>{
   setExpense(pre =>
    pre.filter(item => item.id !== id)
   )}
  
  return (
    <div className="flex flex-row gap-10 p-4">
      {/* FORM */}
      <div className="flex flex-col border-2 border-black rounded-xl p-4 w-1/4">
        <h1 className="font-bold text-lg mb-3">Add Expense</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
          <input
            type="text"
            name="name"
            placeholder="Expense Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <button className="bg-black text-white p-2 rounded mt-2">
            Submit
          </button>
        </form>
      </div>

      {/* LIST */}
      <div className="flex-1">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search  name ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded mb-4 w-1/4"
        />

        {/* HEADERS */}
        <div className="flex gap-10 font-bold border-b pb-2 mb-2 justify-between ">
          <h2 className="w-1/5">Name</h2>
          <h2 className="w-1/5">Description</h2>
          <h2 className="w-1/5">Amount</h2>
          <h2 className="w-1/5">Category</h2>
          <h2 className="w-1/5">Date</h2>
        </div>

        {/* ITEMS */}
        {filteredExpenses.map((item) => (
          <div
            key={item.id}
            className="flex gap-10 border-b py-2 justify-around  "
          >
            <p className="w-1/5">{item.name}</p>
            <p className="w-1/5">{item.description}</p>
            <p className="w-1/5">{item.amount}</p>
            <p className="w-1/5">{item.category}</p>
            <p className="w-1/5">{item.date}</p>
            <button className="bg-red-400 rounded-md p-3" onClick={() => 
              deleteBtn(item.id)
            }>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;