const mongoose = require("mongoose");
const db = require("../../db");

// Define the project schema
const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  technology: [String], // Array of technologies
  link: String           // Link to the project or GitHub repository
});

const Project = mongoose.model("Project", ProjectSchema); // Create the model



// Initialize the projects collection with sample data
async function initializeProject() {
  const projectList = [
    {
      name: "Portfolio Website",
      description: "A personal portfolio showcasing my web development skills.",
      technology: ["HTML", "CSS", "JavaScript", "Node.js"],
      link: "https://github.com/your-username/portfolio"
    },
    {
      name: "E-commerce App",
      description: "An e-commerce web application for buying and selling products.",
      technology: ["React", "Node.js", "MongoDB"],
      link: "https://github.com/your-username/e-commerce-app"
    }
  ];

  
    await Project.insertMany(projectList);
    
}
// Fetch all projects from the database
async function getProject() {
  await db.connect();
  return await Project.find({});  // Returns an array of projects
}

// Add a new project to the database
async function addProject(name, description, technology, link) {
  await db.connect();
  const newProject = new Project({
    name,
    description,
    technology: technology.split(',').map(item => item.trim()), // Convert comma-separated string to array
    link
  });

  return await newProject.save();
}

// Delete a project by ID
async function deleteProject(id) {
  await db.connect();
  return await Project.deleteOne({ _id: id });
}

// Update a project by ID
async function updateProject(id, name, description, technology, link) {
  await db.connect();
  return await Project.updateOne(
    { _id: id },
    {
      name,
      description,
      technology: technology.split(',').map(item => item.trim()), // Convert comma-separated string to array
      link
    }
  );
}

module.exports = {
  getProject,
  initializeProject,
  addProject,
  deleteProject,
  updateProject,
  Project // Export the Project model to use in other files
};
