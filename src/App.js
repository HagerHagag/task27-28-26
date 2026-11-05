import { useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Burger", description: "Classic beef burger", quantity: 3 },
    { id: 2, name: "Pizza", description: "Italian cheese pizza", quantity: 2 },
    {
      id: 3,
      name: "Sandwich",
      description: "Fresh chicken sandwich",
      quantity: 1,
    },
  ]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return;

    if (editingId !== null) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingId
            ? { ...product, name: name.trim(), description: description.trim() }
            : product,
        ),
      );

      setEditingId(null);
    } else {
      const newProduct = {
        id: Date.now(),
        name: name.trim(),
        description: description.trim(),
        quantity: 0,
      };

      setProducts((prev) => [...prev, newProduct]);
    }

    setName("");
    setDescription("");
  }

  function increaseQuantity(id) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      ),
    );
  }

  function decreaseQuantity(id) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(0, product.quantity - 1) }
          : product,
      ),
    );
  }

  function editProduct(product) {
    setEditingId(product.id);
    setName(product.name);
    setDescription(product.description);
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((product) => product.id !== id));

    if (editingId === id) {
      cancelEdit();
    }
  }

  // Cancel editing
  function cancelEdit() {
    setEditingId(null);
    setName("");
    setDescription("");
  }

  return (
    <main className="container">
      <section className="products-section">
        <h2>My Products</h2>

        {products.length === 0 ? (
          <p className="empty-message">
            No products yet. Add your first product!
          </p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="card-top">
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description || "No description"}</p>
                  </div>

                  <span className="quantity-badge">{product.quantity}</span>
                </div>

                <div className="card-bottom">
                  <div className="quantity-controls">
                    <button
                      onClick={() => decreaseQuantity(product.id)}
                      disabled={product.quantity === 0}
                      aria-label={`Decrease ${product.name}`}
                    >
                      −
                    </button>

                    <span>{product.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(product.id)}
                      aria-label={`Increase ${product.name}`}
                    >
                      +
                    </button>
                  </div>

                  <div className="card-actions">
                    <button
                      className="edit-btn"
                      onClick={() => editProduct(product)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
