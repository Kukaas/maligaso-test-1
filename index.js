const express = require('express');
const mongoose = require('mongoose');
const Courses = require('./models/courseModels');

const app = express();
app.use(express.json());

//Root API
app.get('/', (req, res) => {
    try {
        res.status(200).json('Welcome to the root of the API!');
    } catch (error) {
        res.status(500).json('Internal server error');
    }
});

//GET backend courses and sort by name
app.get("/courses/backend-courses-sorted", async (req, res) => {
    try {
      const years = await Courses.find();
      let courses = [];
      years.forEach((year) => {
        ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
          if (year[yearKey]) {
            courses.push(...year[yearKey]);
          }
        });
      });
      courses.sort((a, b) => a.description.localeCompare(b.description));
      res.json(courses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

//GET courses name and specialization
app.get("/courses/course-name-specialization", async (req, res) => {
    try {
      const years = await Courses.find();
      let courses = [];
      years.forEach((year) => {
        ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
          if (year[yearKey]) {
            courses.push(...year[yearKey]);
          }
        });
      });
      const descriptionsAndTags = courses.map((course) => ({
        description: course.description,
        tags: course.tags,
      }));
      res.json(descriptionsAndTags);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

//GET published BSIT and BSIS courses
app.get("/courses/published-course", async (req, res) => {
    try {
      const years = await Courses.find();
      let courses = [];
      years.forEach((year) => {
        ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
          if (year[yearKey]) {
            courses.push(...year[yearKey]);
          }
        });
      });
      const descriptionsAndTags = courses
        .filter(
          (course) => course.tags.includes("BSIT") || course.tags.includes("BSIS")
        )
        .map((course) => ({
          description: course.description,
          tags: course.tags,
        }));
      res.json(descriptionsAndTags);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});


mongoose.connect('mongodb+srv://admin:12345@api-sharing.wwdxcbn.mongodb.net/api-sharing?retryWrites=true&w=majority')
.then(() => {
    const port = process.env.port || 3000;
    app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}...`);
});
}).catch(() => {
    console.log(error);
});