const handleProfileGet = (req, res, db) => {

  // Destructuring the user's id from the URL
  const { id } = req.params;

  // Finding the user in the 'users' table by their id
  db.select('*').from('users').where({id})
    .then(user => {
      // If user exists
      if (user.length) {
        // Return the user object
        res.json(user[0]);
      } else {
        res.status(404).json('Not found');
      }
    })
    .catch(err => res.status(400).json('Error getting user'));
}

export default handleProfileGet;