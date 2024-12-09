const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Bakery",
  port: 3307,
} );

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

app.post('/signup', (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO users (first_name, last_name, email, password_) VALUES (?, ?, ?, ?)';
  db.query(query, [first_name, last_name, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting customer data:', err);
      return res.status(500).send('Database error');
    } else {
      res.status(201).json({ message: 'Customer registered successfully' });
    }
  });
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT user_id FROM users WHERE email = ? AND password_ = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error checking login credentials:', err);
      return res.status(500).send('Database error');
    }

    if (results.length > 0) {
      const userId = results[0].user_id; // Get the user_id
      res.status(200).json({ message: 'Login successful', userId }); // Include user_id in the response
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  });
});
app.post('/alogin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT admin_id FROM admin WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error checking login credentials:', err);
      return res.status(500).send('Database error');
    }

    if (results.length > 0) {
      const userId = results[0].admin_id; // Get the user_id
      res.status(200).json({ message: 'Login successful', userId }); // Include user_id in the response
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  });
});

// Endpoint to fetch all cakes
app.get("/cakes", (req, res) => {
  const sql = `SELECT * FROM product WHERE category="Cakes"`;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// Endpoint to fetch a specific cake by ID
app.get("/cakes/:id", (req, res) => {
  const cakeId = req.params.id;
  const sql = `SELECT * FROM product WHERE product_id = ? AND category="Cakes"`;
  db.query(sql, [cakeId], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json(err);
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Cake not found" });
    }
    return res.json(data[0]);
  });
});
app.get("/review/:id", (req, res) => {
  const cakeId = req.params.id;
  const sql = `SELECT * FROM feedback WHERE feedbackProd_id = ?`;
  db.query(sql, [cakeId], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json(err);
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Cake not found" });
    }
    return res.json(data);
  });
});

// Endpoint to fetch cookies
app.get("/cookies", (req, res) => {
  const sql = `SELECT * FROM product WHERE category="Cookies"`;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// Endpoint to fetch a specific cookie by ID
app.get("/cookies/:id", (req, res) => {
  const cookieId = req.params.id;
  const sql = `SELECT * FROM product WHERE product_id = ? AND category="Cookies"`;
  db.query(sql, [cookieId], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json(err);
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Cookie not found" });
    }
    return res.json(data[0]);
  });
});

// Endpoint to fetch all croissants
app.get("/croissants", (req, res) => {
  const sql = `SELECT * FROM product WHERE category="Croissant"`;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// Endpoint to fetch a specific croissant by ID
app.get("/croissants/:id", (req, res) => {
  const croissantId = req.params.id;
  const sql = `SELECT * FROM product WHERE product_id = ? AND category="Croissant"`;
  db.query(sql, [croissantId], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json(err);
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Croissant not found" });
    }
    return res.json(data[0]);
  });
});

// Endpoint to fetch doughnuts
app.get("/doughnut", (req, res) => {
  const sql = `SELECT * FROM product WHERE category="Doughnut"`;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// Endpoint to fetch a specific doughnut by ID
app.get("/doughnut/:id", (req, res) => {
  const doughnutId = req.params.id;
  const sql = `SELECT * FROM product WHERE product_id = ? AND category="Doughnut"`;
  db.query(sql, [doughnutId], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json(err);
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Doughnut not found" });
    }
    return res.json(data[0]);
  });
});


// Endpoint to fetch all cart items
app.get("/order/:id", (req, res) => {
  const id=req.params.id;
  const sql = `
    SELECT product_name, price, CartQuantity, prod_id
    FROM product, cart 
    WHERE product.product_id = cart.prod_id AND cart.user_id=${id};

  `;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json(err);
    }
    return res.json(data);
  });
});

  app.post("/cart", (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    if (!userId || !productId || !quantity) {
      return res.status(400).send({ message: 'Missing required fields' });
    }
  
    const insertQuery = `INSERT INTO cart(user_id, prod_id, CartQuantity) VALUES (?, ?, ?)`;
    db.query(insertQuery, [userId, productId, quantity], (err, result) => {
      if (err) {
        console.error('Error adding to cart:', err);
        return res.status(500).send({ message: 'Failed to add to cart' });
      }
      res.send({ message: 'Item added to cart successfully' });
    });
  });



app.post("/completeOrder", (req, res) => {
  const { userId, totalAmount, totalQuantity, products, address, city, state, pincode } = req.body;
  const orderSql = `INSERT INTO orders (user_id, total, quantity, Delivery_Location) VALUES (?, ?, ?, ?)`;
  db.query(orderSql, [userId, totalAmount, totalQuantity, `${address}, ${city}, ${state}, ${pincode}`], (err, orderResult) => {
    if (err) {
      console.error("Error inserting into orders:", err);
      return res.status(500).send("Failed to complete order");
    }

    const orderId = orderResult.insertId; 
    const orderItems = products.map(({ product_id, quantity }) => [orderId, product_id, quantity]);
    const orderItemsSql = `INSERT INTO ordPro (order_id, pro_id, Ordquantity) VALUES ?`;
    db.query(orderItemsSql, [orderItems], (err, itemsResult) => {
      if (err) {
        console.error("Error inserting into ordPro:", err);
        return res.status(500).send("Failed to add products to the order");
      }
      res.send("Order completed successfully");
    });
  });
});
app.get("/orderhistory/:id", (req, res) => {
  const id=req.params.id;
  const sql = `
    SELECT order_id,order_datetime,quantity,total
    FROM orders
    WHERE user_id=${id}
    Order by order_id DESC;

  `;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json(err);
    }
    return res.json(data);
  });
});
app.get("/orderhistory", (req, res) => {
  const sql = `
    SELECT order_id,order_datetime,quantity,total
    FROM orders;

  `;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json(err);
    }
    return res.json(data);
  });
});
app.get("/profile/:id",(req,res)=>
{
  const id=req.params.id;
  const sql = `
    SELECT first_name,last_name,user_id
    FROM users
    WHERE user_id=${id};

  `;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json(err);
    }
    return res.json(data);
  });
});
app.get("/cart/:id",(req,res)=>
  {
    const id=req.params.id;
    const sql = `
      SELECT product_id,product_name,url,price,CartQuantity,quantity
      FROM cart,product
      WHERE cart.prod_id=product.product_id AND user_id=${id};
  
    `;
    db.query(sql, (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.json(err);
      }
      return res.json(data);
    });
  });

  app.post("/cart/:userId/update", (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.params.userId;

    if (!productId || !quantity || !userId) {
        return res.status(400).json({ error: "Missing required parameters." });
    }

    const checkQuery = `SELECT CartQuantity FROM cart WHERE user_id = ? AND prod_id = ?;`;
    db.query(checkQuery, [userId, productId], (err, results) => {
        if (err) {
            console.error("Database Error (checkQuery):", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length > 0) {
            // Update existing item
            const updateQuery = `UPDATE cart SET CartQuantity = ? WHERE user_id = ? AND prod_id = ?;`;
            db.query(updateQuery, [quantity, userId, productId], (err) => {
                if (err) {
                    console.error("Database Error (updateQuery):", err);
                    return res.status(500).json({ error: "Failed to update quantity." });
                }
                res.json({ message: "Quantity updated successfully" });
            });
        } else {
            // Item doesn't exist in the cart
            res.status(404).json({ error: "Item not found in cart." });
        }
    });
});

  app.post('/cart/:userId/delete', (req, res) => {
    const { productId } = req.body;
    const userId = req.params.userId;
  
    const query = `DELETE FROM cart WHERE user_id = ? AND prod_id = ?;`;
    db.query(query, [userId, productId], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Item removed successfully' });
    });
  });

  app.get("/rev/:oid",(req,res)=>
    {
      const oid=req.params.oid;
      const sql = `
        SELECT product_id,product_name,url,price,category,Ordquantity,rating,number_of_ratings
        FROM ordPro,product
        WHERE ordPro.pro_id=product.product_id AND order_id=${oid} ;
    
      `;
      db.query(sql, (err, data) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.json(err);
        }
        return res.json(data);
      });
    });

    app.post('/review/submit', (req, res) => {
      const { productId, totalRatings, numberOfRatings, feedback, userId, orderId } = req.body;
    
      // Query to check if feedback already exists for this user, product, and order
      const checkFeedbackQuery = `
        SELECT * FROM feedback 
        WHERE uid = ? AND feedbackProd_id = ? AND oid = ?;
      `;
    
      // Insert feedback into the feedback table
      const insertFeedbackQuery = `
        INSERT INTO feedback (uid, feedbackProd_id, oid, feedback) 
        VALUES (?, ?, ?, ?);
      `;
    
      // Update the product's total ratings and number of ratings
      const updateProductQuery = `
        UPDATE product
        SET 
          rating = ?, 
          number_of_ratings = ?
        WHERE product_id = ?;
      `;
    
      // Start transaction
      db.beginTransaction((transactionErr) => {
        if (transactionErr) {
          return res.status(500).json({ error: 'Failed to start database transaction' });
        }
    
        // Check if feedback already exists
        db.query(checkFeedbackQuery, [userId, productId, orderId], (checkErr, checkResult) => {
          if (checkErr) {
            return db.rollback(() => {
              res.status(500).json({ error: 'Error checking feedback: ' + checkErr.message });
            });
          }
    
          if (checkResult.length > 0) {
            // Feedback already exists
            return db.rollback(() => {
              res.status(400).json({ error: 'Feedback already submitted for this product and order by this user.' });
            });
          }
    
          // Update product ratings
          db.query(updateProductQuery, [totalRatings, numberOfRatings, productId], (updateErr, updateResult) => {
            if (updateErr) {
              return db.rollback(() => {
                res.status(500).json({ error: 'Failed to update product: ' + updateErr.message });
              });
            }
    
            // Insert feedback
            db.query(insertFeedbackQuery, [userId, productId, orderId, feedback], (feedbackErr, feedbackResult) => {
              if (feedbackErr) {
                return db.rollback(() => {
                  res.status(500).json({ error: 'Failed to insert feedback: ' + feedbackErr.message });
                });
              }
    
              // Commit transaction
              db.commit((commitErr) => {
                if (commitErr) {
                  return db.rollback(() => {
                    res.status(500).json({ error: 'Failed to commit transaction: ' + commitErr.message });
                  });
                }
    
                // Success response
                res.json({ message: 'Review submitted and feedback recorded successfully!' });
              });
            });
          });
        });
      });
    });
    app.get("/customer",(req,res)=>
      {
       
        const sql = `
          SELECT first_name,last_name,user_id,email
          FROM users;
        `;
        db.query(sql, (err, data) => {
          if (err) {
            console.error("Error executing query:", err);
            return res.json(err);
          }
          return res.json(data);
        });
      });
      app.get("/products",(req,res)=>
        {
          
          const sql = `
             SELECT product_id, product_name, price, category, quantity
             FROM product
             ORDER BY category;
            `;
          db.query(sql, (err, data) => {
            if (err) {
              console.error("Error executing query:", err);
              return res.json(err);
            }
            return res.json(data);
          });
        }); 
        app.post('/add-product', (req, res) => {
          const { 
            productName, 
            productPrice, 
            productDescription, 
            productCategory, 
            productQuantity, 
            productUrl 
          } = req.body;
        
          // Insert the new product into the products table
          const query = `
            INSERT INTO product 
            (product_name, price, description, category, quantity, url) 
            VALUES (?, ?, ?, ?, ?, ?);
          `;
        
          db.query(
            query, 
            [productName, productPrice, productDescription, productCategory, productQuantity, productUrl], 
            (err, result) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }
              
              // Check if the product was successfully inserted (optional)
              if (result.affectedRows > 0) {
                return res.json({ message: 'Product added successfully!' });
              } else {
                return res.status(400).json({ error: 'Failed to add product' });
              }
            }
          );
        });

        app.put('/update-product/:productId', (req, res) => {
          const { productId } = req.params;
          const { quantity } = req.body;
        
          const query = `UPDATE product SET quantity = ? WHERE product_id = ?`;
          db.query(query, [quantity, productId], (err, result) => {
            if (err) {
              return res.status(500).json({ error: 'Failed to update quantity' });
            }
            if (result.affectedRows === 0) {
              return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: 'Quantity updated successfully' });
          });
        });        
app.get("/", (req, res) => {
  res.send("Backend Page");
});

// Start the server
app.listen(8080, () => {
  console.log("Listening on port 8080");
});