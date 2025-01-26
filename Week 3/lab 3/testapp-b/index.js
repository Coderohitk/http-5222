//IMPORT REQUIRED MODULES
const express = require("express");
const path = require("path"); //contains methods to help with path concatenation
const { MongoClient, ObjectId } = require("mongodb"); //import MongoClient from mongodb

//Connect to DB
const dbUrl = "mongodb://127.0.0.1:27017/testdb"; //connection string to connect to localhost db and select the testdb database
const client = new MongoClient(dbUrl);
console.log(client);
//SET UP EXPRESS APP
const app = express(); //express() is a function to initialize an Express app
const port = process.env.PORT || "8888";

//SET UP TEMPLATE ENGINE
app.set("views", path.join(__dirname, "templates")); //set "views" to use the <app_directory>/templates folder to store template files
app.set("view engine", "pug");//set Express to use Pug as the template (view) engine

//SET UP FOLDER FOR STATIC FILES (CSS, client-side JS)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); //extend the urlencoded format (i.e. query string format like weight=0&path=/&name=Home)
app.use(express.json()); //allow for form data retrieval as JSON { weight: 0, path: "/", name: "Home"}

//TEST APP PATH
app.get("/", async (request, response) => {
  let links = await getLinks();
  response.render("index", { title: "Home", menu: links });
});
app.get("/about", async (request, response) => {
  let links = await getLinks();
  response.render("about", { title: "About", menu: links });
});
//ADMIN PAGES
app.get("/admin/menu", async (request, response) => {
  let links = await getLinks();
  //render admin page
  response.render("menu-list", { title: "Administer menu", menu: links });
});
app.get("/admin/menu/add", async (request, response) => {
  let links = await getLinks();
  //render admin page
  response.render("menu-add", { title: "Add menu link", menu: links });
});
app.get("/admin/menu/edit", async (request, response) => {
  if (request.query.linkId) {
    let linkToEdit = await getSingleLink(request.query.linkId);
    let links = await getLinks();
    response.render("menu-edit", {
      title: "Edit menu link", menu: links,
      editLink: linkToEdit
    });
  } else {
    response.redirect("/admin/menu");
  }
});
app.post("/admin/menu/add/submit", async (request, response) => {
  //for POST forms (for this form submission), data is sent in request.body
  //for GET forms, data is sent in request.query
  //console.log(request.body.path);
  let newLink = {
    weight: request.body.weight,
    path: request.body.path,
    name: request.body.name
  };
  await addLink(newLink);
  response.redirect("/admin/menu"); //redirect back to main menu admin page
});
app.post("/admin/menu/edit/submit", async (request, response) => {
  // Get the _id (linkId) from the form and set it as a filter to be used for the query
  let idFilter = { _id: new ObjectId(request.body.linkId) };

  // Get the weight, path, and name values from the form
  let link = {
    weight: request.body.weight,
    path: request.body.path,
    name: request.body.name
  };

  // Run editLink function with the filter and updated values
  try {
    await editLink(idFilter, link);
    response.redirect("/admin/menu"); // Redirect back to the admin menu page after successful update
  } catch (error) {
    console.error("Error updating link:", error);
    response.redirect(`/admin/menu/edit?linkId=${request.body.linkId}&error=Failed to update the link`);
  }
});

// Helper function to update the link in the database
async function editLink(filter, link) {
  db = await connection();
  
  // Prepare the update object: only the fields that are being updated
  let update = {
    $set: link
  };

  // Execute the update operation using the filter and the update object
  const result = await db.collection("menuLinks").updateOne(filter, update);

  if (result.matchedCount === 0) {
    throw new Error("No link found with the provided linkId");
  }

  console.log("Link updated successfully");
}

app.get("/admin/menu/delete", async (request, response) => {
  console.log(request.query.linkId);
  let id = request.query.linkId;
  await deleteLink(id);
  response.redirect("/admin/menu");
})

//SET UP SERVER LISTENING
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

//MONGODB HELPER FUNCTIONS

//Function to connect and return the testdb database
async function connection() {
  db = client.db();
  return db;
}

//Get all menu links
async function getLinks() {
  db = await connection();
  let results = db.collection("menuLinks").find({}); //use empty {} as the query to select (find) all
  let resultArray = await results.toArray(); //convert the results pointer to an array we can use (toArray() is an asynchronous method so we need to use await)
  return resultArray;
}

//expects a link JSON object to be inserted into menuLinks
async function addLink(link) {
  db = await connection();
  let status = await db.collection("menuLinks").insertOne(link);
  console.log("link added");
}

async function deleteLink(id) {
  db = await connection();
  let query = { _id: new ObjectId(id) };
  let result = await db.collection("menuLinks").deleteOne(query);
}
async function getSingleLink(id) {
  db = await connection();
  const editId = { _id: new ObjectId(id) };
const result = await db.collection("menuLinks").findOne(editId);
return result;
}