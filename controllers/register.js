const handleRegister = (req, res, db, bcrypt) => {

  // Destructuring the name, email, password from the body of the request
  const { name, email, password } = req.body;

  // Validation to ensure none of the fields are empty
  if (!name || !email || !password) {
    return res.status(400).json('Incorrect form submission');
  }
  
  // Email validation using Regex
  if (!/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
    return res.status(400).json('Incorrect form submission');
  }

  // Using Bcrypt to hash the password 
  const hash = bcrypt.hashSync(password, 10);
    
  // Creating a database transaction to ensure both transactions pass before committing otherwise the changes are rolled back
  db.transaction(trx => {
    // Inserting the password hash and email in the 'login' table
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    // Inserting the email, name, joined date into the 'users' table
    .then(loginEmail => {
      return trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0],
          name: name,
          joined: new Date()
        })
        // Returning the user object
        .then(user => {
          res.json(user[0]);
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('Unable to register'));
}
  
export default handleRegister;