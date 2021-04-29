const handleQuiz = (req, res, db) => {

  // Destructuring the user's id from the body of the request
  const { id } = req.body;

  // Finding the user in the 'users' table by their id
  db('users').where('id', '=', id)
    // Incrementing the quizsubmissions column by 1
    .increment('quizsubmissions', 1)
    // Returning the quizsubmissions
    .returning('quizsubmissions')
  .then(quizsubmissions => {
    // Responding with the count of the quizsubmissions
    res.json(quizsubmissions[0]);
  })
  .catch(err => res.status(400).json('Unable to get quiz submissions'))
}

export default handleQuiz;