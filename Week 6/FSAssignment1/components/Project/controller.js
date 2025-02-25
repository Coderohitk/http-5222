const projectModel = require("./model");

// List all projects and initialize if no projects exist
const listProject = async (request, response) => {
  let projectData = await projectModel.getProject();
  if (!projectData.length) {
    await projectModel.initializeProject();
    projectData = await projectModel.getProject();
  }
  response.render("project/list", { projects: projectData });
};



// Show the form to add a new project
const showAddForm = (request, response) => {
  response.render("project/addProject");
};

// Add a new project
const addNewProject = async (request, response) => {
  const { name, description, technology, link } = request.body;
  let result = await projectModel.addProject(name, description, technology, link);
  console.log(result);
  response.redirect("../list");  // Redirect to the project list after adding
};

// Delete a project by its ID
const deleteProjectById = async (request, response) => {
  let id = request.params.id;
  await projectModel.deleteProject(id);
  console.log(`Deleted project with ID: ${id}`);
  response.redirect("../list");  // Redirect to the project list after deletion
};

// Show the form to update a project
const showUpdateForm = async (request, response) => {
  const projectId = request.params.id;
  const project = await projectModel.Project.findById(projectId);
  if (!project) {
    return response.status(404).send("Project not found.");
  }
  response.render("project/updateProject", { project });
};

// Update a project
const updateProject = async (request, response) => {
  const projectId = request.params.id;
  const { name, description, technology, link } = request.body;
  const result = await projectModel.updateProject(projectId, name, description, technology, link);

  if (result.modifiedCount === 0) {
    return response.status(404).send("Project not found or no changes made.");
  }

  console.log("Project updated:", result);
  response.redirect("../list");  // Redirect to the project list after updating
};

module.exports = {
  listProject,
  showAddForm,
  addNewProject,
  deleteProjectById,
  showUpdateForm,
  updateProject
};
