/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: _____________ROHAN_________ Student ID: _147492235_____________ Date: __23/10/2024____________
*
*  Published URL: ___________________https://assignment3-38h30k1ts-rohann10s-projects.vercel.app/________________________________________
*
********************************************************************************/

const express = require('express');
require('pg'); 
const projectData = require('./modules/projects');
const path = require('path'); // Ensure the path module is imported
const app = express();
const port = 3000;

// Set the view engine to EJS and configure views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '/public')));

// Initialize the project data and start the server
projectData.Initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error("Failed to initialize projects:", err);
    });

// Route for the home page
app.get('/', (req, res) => {
    res.render('home'); // Render 'home.ejs' instead of sending the HTML file
});

// Route for the about page
app.get('/about', (req, res) => {
    res.render('about'); // Render 'about.ejs' instead of sending the HTML file
});

// Route for retrieving all or filtered projects by sector
app.get('/solutions/projects', (req, res) => {
    const sector = req.query.sector;
    if (sector) {
        projectData.getProjectsBySector(sector)
            .then(projects => res.render('projects', { projects })) // Adjust to match EJS file structure
            .catch(err => res.status(404).send(`No projects found for sector: ${sector}`));
    } else {
        projectData.getAllProjects()
            .then(projects => res.render('projects', { projects })) // Adjust to match EJS file structure
            .catch(err => res.status(500).send("Unable to retrieve projects"));
    }
});

// Route for retrieving a project by ID
app.get('/solutions/projects/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    projectData.getProjectById(projectId)
        .then(project => res.render('project-detail', { project })) // Adjust to match EJS file structure
        .catch(err => res.status(404).send(`Project with ID ${projectId} not found`));
});

// 404 error handling route
app.use((req, res) => {
    res.status(404).render('404'); // Render '404.ejs' instead of sending the HTML file
});
