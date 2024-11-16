/********************************************************************************
*  WEB322 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: ROHAN Student ID: 147492235 Date: 26-09-2024
*
********************************************************************************/

const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

// Initialize the projects array with projectData and sector info


function initialize() {
  return new Promise((resolve, reject) => {
    try {
      projectData.forEach(project => {
        const sector = sectorData.find(s => s.id === project.sector_id)?.sector_name;
        projects.push({ ...project, sector });
      });
      resolve();
    } catch (error) {
      reject("Failed to initialize projects");
    }
  });
}

// Return all projects


function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length > 0) {
      resolve(projects);
    } else {
      reject("No projects available");
    }
  });
}

// Return project by ID


function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      resolve(project);
    } else {
      reject("Project not found");
    }
  });
}

// Return projects by sector


function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const filteredProjects = projects.filter(p => 
      p.sector.toLowerCase().includes(sector.toLowerCase())
    );
    if (filteredProjects.length > 0) {
      resolve(filteredProjects);
    } else {
      reject("No projects found for the given sector");
    }
  });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };

