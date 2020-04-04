const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
//Accessing Static Files
app.use(express.static("assets"));

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
    name: "Ayushi",
    phone: "7458990334"
  },
  {
    name: "Shyam",
    phone: "7007150981"
  }
];

app.get("/", function(request, response) {
  // console.log(__dirname);

  Contact.find({}, function(err, contacts) {
    if (err) {
      console.log("error in fetching contacts from db");
      return;
    }
    return response.render("home", {
      title: "Contacts List",
      contact_list: contacts
    });
  });

  // response.send("<h1>It's running!!</h1>");
});

//For deleting a contact
app.get("/delete-contact", function(request, response) {
  //Get the query from the URL
  // console.log(request.query);
  //get the id from query in the url
  let id = request.query.id;
  //find the contact in the db using id and delete it
  Contact.findByIdAndDelete(id, function(err) {
    if (err) {
      console.log("error in deleting an object from database");
      return;
    }
    return response.redirect("back");
  });
  // let contactIndex = contactList.findIndex(
  //   contact => contact.phone == phone && contact.name == name
  // );
  // console.log(contactIndex);
  // if (contactIndex != -1) {
  //   contactList.splice(contactIndex, 1);
  // }
  // return response.redirect("back");
  // console.log("Outta HERE!");
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
  // contactList.push(request.body);

  Contact.create(
    {
      name: request.body.name,
      phone: request.body.phone
    },
    function(err, newContact) {
      if (err) {
        console.log("error in creating a contact!");
        return;
      }
      console.log("********\n", newContact, "\n*********");
      return response.redirect("back");
    }
  );
  // return response.redirect("/");
  // return response.redirect("back");
});

app.listen(port, function(err) {
  if (err) {
    console.log("Error in running the server : ", err);
    return;
  }
  console.log("Express server running on port : ", port);
});
