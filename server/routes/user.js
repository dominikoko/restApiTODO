
const connection = require("../config/database");
var session = require("express-session");
exports.login = async function(req, res) {
  var message = "";
  //const hashedPassword = await bcrypt.hash(req.body.password, 10)
  if (req.method == "POST") {
    var post = req.body;
    var name = post.username;
    var pass = post.password;

    var sql =
      "SELECT username,email FROM `users` WHERE `username`='" +
      name +
      "' and password = '" +
      pass +
      "'";
    connection.query(sql, function(err, results) {
      if (results.length) {
        req.session.userId = results[0].id;
        req.session.userId = results[0];
        console.log(results[0].id);
        res.redirect("/todo");
      } else {
        message = "Wrong Credentials.";
        res.render("login.ejs", { message: message });
        console.log("smth went wrong with login");
      }
    });
  } else {
   app.get('todo/:userId')
    res.render("todo.ejs", { message: message });
  }
};

// module.exports = router;
