import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const themeStyle = {
    backgroundColor: isDarkMode ? "black" : "unset",
    color: isDarkMode ? "white" : "unset",
    padding: "20px",
  };

  const API_URL = "https://dummyjson.com";

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${API_URL}/products`);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const result = await response.json();

      setProducts(result.products);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((item) => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div style={themeStyle}>
        <h3>useMemo Demonstration</h3>{" "}
        <button onClick={() => setIsDarkMode((prev) => !prev)}>
          {isDarkMode ? "Dark" : "Lite"}
        </button>
        <hr />
        <input
          type="text"
          placeholder="Search products.."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        {filteredProducts?.slice(0, 10).map((item) => (
          <p key={item.id}>{item.title}</p>
        ))}
      </div>
    </>
  );
}

export default App;
