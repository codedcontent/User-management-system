const mysql = require("mysql2");

// Database connection Pool
const pool = mysql.createPool(process.env.MYSQLURL);

// View users
exports.view = (req, res) => {
  // Connect to the db
  pool.getConnection((err, connection) => {
    if (err) console.log(err); // not connected!

    // Use the connection
    connection.query(
      "SELECT * FROM user WHERE status = 'active'",
      (err, rows) => {
        // When done with the connection, release it
        connection.release();

        if (!err) {
          const removedUser = req.query.removed;
          res.render("home.hbs", { rows, removed: removedUser });
        } else {
          console.log(err);
        }
      }
    );
  });
};

// Find users
exports.find = (req, res) => {
  // Connect to the db
  pool.getConnection((err, connection) => {
    if (err) console.log(err); // not connected!

    const searchTerm = req.body.search;

    // Use the connection
    connection.query(
      "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?",
      ["%" + searchTerm + "%", "%" + searchTerm + "%"],
      (err, rows) => {
        // When done with the connection, release it.
        connection.release();

        if (!err) {
          res.render("home.hbs", { rows });
        } else {
          console.log(err);
        }
      }
    );
  });
};

// View add user page
exports.addUser = (erq, res) => {
  res.render("add-user.hbs");
};

// Create user
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  pool.getConnection((err, connection) => {
    if (err) console.log(err); // not connected!

    // Use the connection
    connection.query(
      "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
      [first_name, last_name, email, phone, comments],
      (err, rows) => {
        // When done with the connection, release it.
        connection.release();

        if (!err) {
          res.render("add-user.hbs", { alert: "User added successfully." });
        } else {
          console.log(err);
        }
      }
    );
  });
};

exports.viewEdit = (req, res) => {
  const { id } = req.params;

  pool.getConnection((err, connection) => {
    if (err) console.log(err);

    connection.query("SELECT * FROM user WHERE id = ?", [id], (err, rows) => {
      // When done, release connection
      connection.release();
      if (!err) res.render("edit-user.hbs", { rows, id });

      console.log(err);
    });
  });
};

exports.editUser = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  pool.getConnection((err, connection) => {
    if (err) console.log(err);

    connection.query(
      "UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?",
      [first_name, last_name, email, phone, comments, req.params.id],
      (err) => {
        // When done, release connection
        if (!err) {
          connection.query(
            "SELECT * FROM user WHERE id = ?",
            [req.params.id],
            (err, rows) => {
              // When done, release connection
              connection.release();
              if (!err)
                res.render("edit-user.hbs", {
                  rows,
                  alert: "Edit successful!",
                });
              console.log(err);
            }
          );
        }

        console.log(err);
      }
    );
  });
};

// Delete user
exports.delete = (req, res) => {
  // Connect to the db
  pool.getConnection((err, connection) => {
    if (err) console.log(err); // not connected!

    // Use the connection
    connection.query(
      "DELETE FROM user WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        // When done with the connection, release it
        connection.release();

        if (!err) {
          res.redirect("/?removed=true");
        } else {
          console.log(err);
        }
      }
    );
  });
};

exports.viewAll = (req, res) => {
  // Connect to the db
  pool.getConnection((err, connection) => {
    if (err) console.log(err); // not connected!

    // Use the connection
    connection.query(
      "SELECT * FROM user WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        // When done with the connection, release it
        connection.release();

        if (!err) {
          res.render("view-user.hbs", { rows });
        } else {
          console.log(err);
        }
      }
    );
  });
};
