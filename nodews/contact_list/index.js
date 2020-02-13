const express = require("express");
const path = require("path");
const port = 8000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", function(request, response) {
  // console.log(__dirname);

  // response.send("<h1>It's running!!</h1>");
  return response.render("home", {
    title: "Contacts List"
  });
});

app.get("/practice", function(request, response) {
  return response.render("practice", {
    title: "Let's play with ejs"
  });
});

app.listen(port, function(err) {
  if (err) {
    console.log("Error in running the server : ", err);
    return;
  }
  console.log("Express server running on port : ", port);
});
