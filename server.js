const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql2");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ===============================
// 🔗 CONEXIÓN A MYSQL (Render usa variables de entorno)
// ===============================
const db = mysql.createConnection({
  host: process.env.DB_HOST,      // ejemplo: "containers-us-west-29.railway.app"
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT       // necesario en Railway o PlanetScale
});

db.connect(err => {
  if (err) {
    console.log("❌ Error al conectar a MySQL:", err);
    return;
  }
  console.log("✅ Conectado a MySQL en la nube");
});

// ===============================
// GET — Obtener todos los productos
// ===============================
app.get("/api/productos", (req, res) => {
  db.query("SELECT * FROM products ORDER BY id ASC", (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la consulta" });
    res.json(results);
  });
});

// ===============================
// GET — Obtener un producto por ID
// ===============================
app.get("/api/productos/:id", (req, res) => {
  db.query("SELECT * FROM products WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la consulta" });

    if (results.length === 0)
      return res.status(404).json({ error: "Producto no encontrado" });

    res.json(results[0]);
  });
});

// ===============================
// POST — Agregar producto
// ===============================
app.post("/api/productos", (req, res) => {
  const { name, price, img, category, description } = req.body;

  db.query(
    "INSERT INTO products (name, price, img, category, description) VALUES (?, ?, ?, ?, ?)",
    [name, price, img, category, description],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al insertar producto" });

      res.json({ message: "Producto agregado", id: result.insertId });
    }
  );
});

// ===============================
// PUT — Editar producto
// ===============================
app.put("/api/productos/:id", (req, res) => {
  const { name, price, img, category, description } = req.body;

  db.query(
    "UPDATE products SET name=?, price=?, img=?, category=?, description=? WHERE id=?",
    [name, price, img, category, description, req.params.id],
    err => {
      if (err) return res.status(500).json({ error: "Error al actualizar" });

      res.json({ message: "Producto actualizado" });
    }
  );
});

// ===============================
// DELETE — Eliminar producto
// ===============================
app.delete("/api/productos/:id", (req, res) => {
  db.query("DELETE FROM products WHERE id = ?", [req.params.id], err => {
    if (err) return res.status(500).json({ error: "Error al eliminar" });

    res.json({ message: "Producto eliminado" });
  });
});

// ===============================
// SERVIR FRONTEND
// ===============================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ===============================
// PUERTO DINÁMICO PARA RENDER
// ===============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
