create database smart_cafeteria;
USE smart_cafeteria;

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  token VARCHAR(20),
  student_name VARCHAR(100),
  student_id VARCHAR(50),
  shift VARCHAR(20),
  total INT,
  status VARCHAR(20) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
