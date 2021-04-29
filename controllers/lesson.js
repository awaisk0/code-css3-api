const handleLesson = (req, res, db) => {

  // Destructuring the user's id from the body of the request
  const { id } = req.body;

  // Finding the user in the 'users' table by their id
  db('users').where('id', '=', id)
    // Incrementing the lessonsubmissions column by 1
    .increment('lessonsubmissions', 1)
    // Returning the lessonsubmissions
    .returning('lessonsubmissions')
  .then(lessonsubmissions => {
    // Responding with the count of the lessonsubmissions
    res.json(lessonsubmissions[0]);
  })
  .catch(err => res.status(400).json('Unable to get lesson submissions'))
}

export default handleLesson;