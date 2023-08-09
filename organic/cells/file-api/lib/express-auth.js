const expressAuth = (pg) => {
  return function (req, res, next) {
    if (req.user && req.user.id) {
      // Check that user exists in db
      const sql = `SELECT id FROM api.user WHERE id = $1`
      const params = [req.user.id]
      pg.query(sql, params, (err, res) => {
        if (err) {
          res.status(401).send({ error: err})
        }
        let user = res.rows[0]
        if (!user) {
          res.status(401).send({ error: 'User does not exist'})
        } else {
          next()
        }
      })
    } else {
      res.status(401).send({ error: 'Authentication required' })
    }
  }
}

module.exports = expressAuth
