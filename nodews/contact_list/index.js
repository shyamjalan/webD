const express = require("express");
const path = require("path");
const port = 8000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
//Accessing Static Files
app.use(express.static('assets'))

//MiddleWare 1
// app.use(function(request, response, next) {
//   console.log("middleware 1 called");
//   next();
// });

//MiddleWare 2
// app.use(function(request, response, next) {
//   console.log("middleware 2 called");
//   next();
// });

var contactList = [
  {
    name: "Shyam",
    phone: "8953171545"
  },
  {
    name: "Kishu",
    phone: "7458990334"
  },
  {
    name: "Bata",
    phone: "7007150981"
  }
];

app.get("/", function(request, response) {
  // console.log(__dirname);

  // response.send("<h1>It's running!!</h1>");
  return response.render("home", {
    title: "Contacts List",
    contact_list: contactList
  });
});

// app.get("/practice", function(request, response) {
//   return response.render("practice", {
//     title: "Let's play with ejs"
//   });
// });

app.post("/create-contact", function(request, response) {
  // contactList.push({
  //   name: request.body.name,
  //   phone: request.body.phone
  // });
  contactList.push(request.body);
  // return response.redirect("/");
  return response.redirect("back");
});

app.listen(port, function(err) {
  if (err) {
    console.log("Error in running the server : ", err);
    return;
  }
  console.log("Express server running on port : ", port);
});
