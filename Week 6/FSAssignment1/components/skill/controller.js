const { request, response } = require("express");
const skillModal = require("./model");

const listSkills = async (request, response) => {
    let skillData = await skillModal.getSkills();
    if (!skillData.length) {
        await skillModal.initializeSkills();
        skillData = await skillModal.getSkills();
    }
    response.render("skill/list", { skills: skillData });
};

const showAddForm = async (request, response) => {
    response.render("skill/add");
};
const addNewSkill = async (request, response) => {
    const { name, category, proficiency } = request.body;
    let result = await skillModal.addSkill(name, category, proficiency);
    console.log(result);
    response.redirect("../list",);
}

const deleteSkillById = async (request, response) => {
    let id = request.params.id;
    await skillModal.deleteSkill(id);
    console.log(`Deleted project with ID: ${id}`);
    response.redirect("../list");
}
const showUpdateForm = async (request, response) => {
    const skillId = request.params.id;
    const skill = await skillModal.Skill.findById(skillId);
    if (!skill) {
        return response.status(404).send("Project not found.");
    }
    response.render("skill/update", { skill });
};
const updateSkill = async (request, response) => {
    const skillId = request.params.id;
    const { name, category, proficiency } = request.body;
    const result = await skillModal.updateSkill(skillId, name, category, proficiency);
    if (result.modifiedCount === 0) {
        return response.status(404).send("Project not found or no changes made.");
    }

    console.log("Skill updated:", result);
    response.redirect("../list");
};

module.exports = {
    listSkills,
    showAddForm,
    addNewSkill,
    deleteSkillById,
    showUpdateForm,
    updateSkill
};
