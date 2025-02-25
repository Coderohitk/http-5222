const mongoose = require("mongoose");
const db = require("../../db");

// Define the Skills schema
const SkillSchema = new mongoose.Schema({
  name: { type: String},  // Skill name
  category: { type: String}, // e.g., "Frontend", "Backend", "Database"
  proficiency: { type: String, enum: ["Beginner", "Intermediate", "Advanced"]}
});

const Skill = mongoose.model("Skill", SkillSchema); // Create the model

// Initialize the skills collection with sample data
async function initializeSkills() {
  const skillList = [
    { name: "JavaScript", category: "Frontend", proficiency: "Advanced" },
    { name: "Node.js", category: "Backend", proficiency: "Intermediate" },
    { name: "MongoDB", category: "Database", proficiency: "Intermediate" },
    { name: "React", category: "Frontend", proficiency: "Advanced" }
  ];

  await Skill.insertMany(skillList);
}

// Fetch all skills from the database
async function getSkills() {
  await db.connect();
  return await Skill.find({});  // Returns an array of skills
}

// Add a new skill to the database
async function addSkill(name, category, proficiency) {
  await db.connect();
  const newSkill = new Skill({ name, category, proficiency });
  return await newSkill.save();
}

// Delete a skill by ID
async function deleteSkill(id) {
  await db.connect();
  return await Skill.deleteOne({ _id: id });
}

// Update a skill by ID
async function updateSkill(id, name, category, proficiency) {
  await db.connect();
  return await Skill.updateOne(
    { _id: id },
    { name, category, proficiency }
  );
}

module.exports = {
  getSkills,
  initializeSkills,
  addSkill,
  deleteSkill,
  updateSkill,
  Skill
};
