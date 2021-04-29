const handleSignin = (req, res, db, bcrypt) => {
  
  // Destructuring the email and password from the body of the request
  const { email, password } = req.body;

  // Validation to ensure none of the fields are empty
  if (!email || !password) {
    return res.status(400).json('Incorrect form submission');
  } 
  
  // Checking the hash against the password the user entered
  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      // Using Bcrypt to check if the entered password is valid
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            // Responding with the user object
            res.json(user[0]);
          })
          .catch(err => res.status(400).json('Unable to get user'));
      } else {
        res.status(400).json('Incorrect login details');
      }
    })
    .catch(err => res.status(400).json('Incorrect login details'));
}
  
export default handleSignin;