const express = require("express");
const router = express.Router();

const { 
  listProject, 
  showAddForm, 
  addNewProject, 
  deleteProjectById, 
  getProjectAPI, 
  showUpdateForm, 
  updateProject 
} = require("./controller");

// Route to list all projects
router.get("/list", listProject); // Handles the homepage or project list page

// Route to show the add project form
router.get("/add", showAddForm); // Show form for adding a new project

// Route to add a new project (POST request)
router.post("/add/submit", addNewProject); // Handles adding a new project

// Route to show the update project form
router.get("/update/:id", showUpdateForm); // Show form for updating a project

// Route to update an existing project (POST request)
router.post("/update/:id", updateProject); // Handles updating an existing project

// Route to delete a project
// Change to GET for the delete route
router.get("/delete/:id", deleteProjectById);
 // Handles deleting a project

// Route to fetch all projects as JSON (API)


module.exports = router;
