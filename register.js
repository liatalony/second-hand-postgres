const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '34.140.24.48',
  database: 'wrinkle-db',
  password: 'F;ytuJT3-$=l:68F',
  port: 5432,
});


// const getUser = (email) => {
//     const user_email = email;
//     return new Promise(function(resolve, reject) {
//       pool.query('SELECT user_id, user_email, user_password FROM users WHERE user_email=$1', [user_email], (error, results) => {
//         if (error) {
//           reject(error)
//           return
//         }
//         resolve(results.rows);
//       })
//     }) 
//   }

//   module.exports = {
//     getUser,
//   }

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user_first_name, user_last_name, user_email , user_con_pass, user_pass, user_phone } = req.body;
    if (!user_first_name || !user_last_name || !user_email || !user_con_pass || !user_pass || !user_phone) return res.status(400).json({ 'message': 'All fields are required.' });
    // check for duplicate usernames in the db
    
        return new Promise(function(resolve, reject) {
          pool.query('SELECT user_id FROM users WHERE user_email=$1', [user_email], (error, results) => {
            if (error) {
              reject(error)
              return
            }
            if(results.rows.length===0){
                console.log("User does not exist in system")
                // resolve("User does not exist in system")
                resolve(results.rows.length===0);
            }else{
                resolve("Already exists")
            }
          })
        }) 


    // const duplicate = usersDB.users.find(person => person.username === user);
    // if (duplicate) return res.sendStatus(409); //Conflict 
    // try {
    //     //encrypt the password
    //     const hashedPwd = await bcrypt.hash(pwd, 10);
    //     //store the new user
    //     const newUser = { "username": user, "password": hashedPwd };
    //     usersDB.setUsers([...usersDB.users, newUser]);
    //     await fsPromises.writeFile(
    //         path.join(__dirname, '..', 'model', 'users.json'),
    //         JSON.stringify(usersDB.users)
    //     );
    //     console.log(usersDB.users);
    //     res.status(201).json({ 'success': `New user ${user} created!` });
    // } catch (err) {
    //     res.status(500).json({ 'message': err.message });
    // }
}


const addNewUser = async (req, res) => {
    console.log('inside add new user function');
    return new Promise(function(resolve, reject) {
        pool.query('INSERT INTO users (user_first_name, user_last_name, user_email, user_password, user_phone) VALUES ($1, $2, $3, $4, $5 )', [user_first_name, user_last_name, user_email, user_pass, user_phone], (error, results) => {
          if (error) {
            reject(error)
            return
          }
          resolve(results.rows);
        })
      }) 
}
module.exports = { handleNewUser, addNewUser };