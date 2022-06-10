require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const app = express();
const cors = require("cors");
const pool = require("./config/DBConn");
const port = 3001;
const verifyJWT = require("./middleware/verifyJWT");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const ROLES_LIST = require("./config/ROLES_LIST");
const allowedRole = require("./middleware/verifyRoles");

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

//USER REGISTRATION
app.use("/users/register", require("./routes/register"));

//USER LOGIN
app.use("/users/login", require("./routes/auth"));

//REFRESH TOKEN
app.use("/users/refresh", require("./routes/refresh"));

//USER LOGOUT
app.use("/users/logout", require("./routes/logout"));

app.use("/products", require("./routes/api/products"));

//All routes past this line will require a token check
app.use(verifyJWT);

//GET ALL USERS
app.get("/users/get-all", allowedRole(ROLES_LIST.Admin), async (req, res) => {
	try {
		const allUsers = await pool.query("SELECT * FROM users");
		res.json(allUsers.rows);
		console.log(allUsers.rows);
	} catch (error) {
		res.json(error.message);
		console.error(error.message);
	}
});

//GET ALL PRODUCTS
// app.get('/products', async (req, res) => {
//   try {
//     const allProducts = await pool.query('SELECT * FROM product')
//     res.status(200).json(allProducts.rows)
//   } catch (error) {
//     res.json(error)
//   }
// })

//GET PRODUCT BY ID
// app.get('/products/:id', async (req, res) => {
//   const productId = '3'
//   try {
//     const allProducts = await pool.query('SELECT * FROM product WHERE product_id=$1 LIMIT 1', [productId])
//     if (allProducts.rows.length == 0) {
//       res.status(404).json({'message': 'Something went wrong. no such product'})
//     }
//     res.status(200).json(allProducts.rows)
//   } catch (error) {
//     res.json(error)
//   }
// })

//EDIT PRDUCT
// app.put('/products/edit/:id', async (req, res) => {
//   const productId = '3'
//   try {
//     const allProducts = await pool.query('UDATE product SET ', [productId])
//     if (allProducts.rows.length == 0) {
//       res.status(404).json({'message': 'Something went wrong. no such product'})
//     }
//     res.status(200).json(allProducts.rows)
//   } catch (error) {
//     res.json(error)
//   }
// })

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
