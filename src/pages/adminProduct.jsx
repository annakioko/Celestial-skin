import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Modal from "react-modal";

Modal.setAppElement("#root"); 

export const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    image: "",
    name: "",
    gender: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found");
      return;
    }

    console.log("Using token:", token);

    fetch("http://127.0.0.1:5500/product", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        if (data && data.products) {
          setProducts(data.products);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const handleSaveProduct = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:5500/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        setShowLeaveModal(false);
        fetchLeaves(token);
      } else {
        console.error(`Error: ${response.status}`);
      }
    });
  };
function handleDeleteProduct() {
  const token = localStorage.getItem("token");

  fetch(`http://127.0.0.1:5500/products/${product.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      onDelete(employee.id);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation: ", error);
    });
}


  const handleEditProduct = (product) => {
    // Edit product logic here
  };

  return (
    <div className="bg-light-mode min-h-screen p-4">
      <h1 className="text-Heading font-bold text-2xl text-center py-3">
        INVENTORY
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-dark-mode text-white p-3 rounded-3xl font-bold w-full md:w-auto"
        >
          <option value="" disabled>
            Category
          </option>
          <option value="All">All</option>
          <option value="Category1">Makeup</option>
          <option value="Category2">Skin care</option>
          <option value="Category3">Fragrances</option>
        </select>
        <button
          onClick={handleAddProduct}
          className="bg-dark-mode text-white p-3 rounded-3xl font-bold w-full md:w-auto"
        >
          ADD NEW PRODUCT
        </button>
      </div>
      <div className="hidden md:block">
        <table className="w-full mx-auto text-left text-Heading">
          <thead className="text-[18px] font-body bg-secondary  text-black ">
            <tr className="border-[6px] border-dark-mode bg-dark-mode">
              <th className="p-[10px]">Image</th>
              <th className="p-[10px]">Name</th>
              <th className="p-[10px]">Gender</th>
              <th className="p-[10px]">Price</th>
              <th className="p-[10px]">Description</th>
              <th className="p-[10px]">Stock</th>
              <th className="p-[10px]">Action</th>
            </tr>
          </thead>
          <tbody className="text-[16px] font-normal text-Heading">
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="bg-white dark:bg-variant1-dark border-[6px]"
              >
                <td className="p-[10px] capitalize">{product.image}</td>
                <td className="p-[10px] capitalize">{product.name}</td>
                <td className="p-[10px]">{product.gender}</td>
                <td className="p-[10px]">{product.price}</td>
                <td className="p-[10px]">{product.stock}</td>
                <td className="p-[10px]">{product.description}</td>
                <td className="p-[10px] flex gap-2">
                  <button onClick={() => handleEditProduct(product)}>
                    <FaEdit className="text-black" />
                  </button>
                  <button onClick={() => handleDeleteProduct(product.id)}>
                    <FaTrashAlt className="text-black" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Product"
        className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-0"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-white dark:bg-variant1-dark rounded-lg p-4 max-w-md w-full md:w-auto">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Add New Product</h2>
          <form onSubmit={handleSaveProduct}>
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              className="block w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="block w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Gender"
              value={newProduct.gender}
              onChange={(e) =>
                setNewProduct({ ...newProduct, gender: e.target.value })
              }
              className="block w-full mb-2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="block w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="block w-full mb-2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              className="block w-full mb-2 p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md mt-4"
            >
              Save
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};
