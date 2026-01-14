const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "smart_cafeteria",
});

db.connect(() => console.log("✅ MySQL Connected"));

/* PLACE ORDER */
app.post("/order", (req, res) => {
  const { name, studentID, shift, total } = req.body;
  const token = "HSM-" + Date.now();

  db.query(
    "INSERT INTO orders (token, student_name, student_id, shift, total) VALUES (?,?,?,?,?)",
    [token, name, studentID, shift, total],
    () => {
      io.emit("newOrder");
      res.json({ token });
    }
  );
});

/* GET ALL ORDERS (ADMIN) */
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders ORDER BY id DESC", (err, rows) => {
    res.json(rows);
  });
});

/* UPDATE STATUS */
app.put("/serve/:id", (req, res) => {
  db.query(
    "UPDATE orders SET status='Served' WHERE id=?",
    [req.params.id],
    () => {
      io.emit("update");
      res.send("Updated");
    }
  );
});

server.listen(3000, () =>
  console.log("🚀 Backend running on http://localhost:3000")
);
