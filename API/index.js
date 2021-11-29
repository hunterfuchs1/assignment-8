const express = require('express');
const app = express();
const nodemon = require('nodemon');
app.use(express.json());

//MongoDB Package
const mongoose = require('mongoose');

const PORT = 1200;

const dbUrl = "mongodb+srv://admin:Password1@cluster0.nqv83.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//Connect to MongoDB
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//MongoDB Connection
const db = mongoose.connection;

//Handle DB Error, display connection
db.on('error', () => {
    console.error.bind(console, 'connection error: ');
});
db.once('open', () => {
    console.log('MongoDB Connected')
});

require('./Models/Students');
require('./Models/Courses');

const Student = mongoose.model('Student');
const Course = mongoose.model('Course');

//gets all students
app.get('/getAllStudents', async (req, res) => {
    try {
        let students = await Student.find({}).lean();
        return res.status(200).json({ "students": students });
    } catch {
        res.status(500).json('{message: Could not find students}');
    }


});

//gets all courses
app.get('/getAllCourses', async (req, res) => {
    try {
        let courses = await Course.find({}).lean();
        return res.status(200).json({ "courses": courses });
    } catch {
        res.status(500).json('{message: Could not find courses}');
    }


});

//gets specific student using any unique field such as 'studentID': 100
app.post('/findStudent', async (req, res) => {
    try {
        let students = await Student.find({ studentID: req.body.studentID }).lean();
        return res.status(200).json(students);
    } catch {
        res.status(500).json('{message: Could not find student}');
    }


});

//gets specific course using any unique field such as 'courseID': 'CMSC2204'
app.post('/findCourse', async (req, res) => {
    try {
        let courses = await Course.find({ courseID: req.body.courseID }).lean();
        return res.status(200).json(courses);
    } catch {
        res.status(500).json('{message: Could not find course}');
    }


});

//adds a course by requiring all properties needed for a course
app.post('/addCourse', async (req, res) => {
    try {
        let courses = {
            courseInstructor: req.body.courseInstructor,
            courseCredits: req.body.courseCredits,
            courseID: req.body.courseID,
            courseName: req.body.courseName,
            dateEntered: req.body.dateEntered

        }

        await Course(courses).save().then(c => {
            return res.status(201).json('courses added');
        });
    } catch {
        return res.status(500).json('{message: could not add course}');
    }
});

//adds a student by requiring all properties from a student
app.post('/addStudent', async (req, res) => {
    try {
        let students = {
            fname: req.body.fname,
            lname: req.body.lname,
            studentID: req.body.studentID,
            dateEntered: req.body.dateEntered

        }

        await Student(students).save().then(c => {
            return res.status(201).json('student added');
        });
    } catch {
        return res.status(500).json('{message: could not add student}');
    }
});

//Edit student by id
app.post('/editStudentById', async (req, res) => {
    try {
        student = await Student.updateOne({ _id: req.body.id }
            , {
                fname: req.body.fname
            }, { upsert: true });
        if (student) {
            res.status(200).json("{message: Student Edited}");
        }
        else {
            res.status(200).json("{message: No Student Changed}");
        }
    }
    catch {
        return res.status(500).json("{message: Failed to edit student}");
    }
});


//Edit student by fname
app.post('/editStudentByFname', async (req, res) => {
    try {
        student = await Student.updateOne({ fname: req.body.queryFname }
            , {
                fname: req.body.fname,
                lname: req.body.lname
            }, { upsert: true });
        if (student) {
            res.status(200).json("{message: Student Edited}");
        }
        else {
            res.status(200).json("{message: No Student Changed}");
        }
    }
    catch {
        return res.status(500).json("{message: Failed to edit student}");
    }
});

//Edit course by course name
app.post('/editCourseByCourseName', async (req, res) => {
    try {
        course = await Course.updateOne({ courseName: req.body.courseName }
            , {
                courseInstructor: req.body.courseInstructor
            }, { upsert: true });
        if (course) {
            res.status(200).json("{message: Course Edited}");
        }
        else {
            res.status(200).json("{message: No Course Changed}");
        }
    }
    catch {
        return res.status(500).json("{message: Failed to edit course}");
    }
});


//Delect course by Id
app.post('/deleteCourseById', async (req, res) => {
    try {
        let course = await Course.findOne({ _id: req.body.id });

        if (course) {
            await Course.deleteOne({ _id: req.body.id });
            return res.status(200).json("{message: Course deleted}");
        }
        else {
            return res.status(200).json("{message: No Course Deleted - Query Null}");
        }
    }
    catch {
        return res.status(500).json("{message: Failed to delete course");
    }
});

//Remove student from classes
/*
app.post('/removeStudentFromClasses', async (req, res) => {
    try {
        let course = await Course.findOne({ studentID: req.body.studentID });

        if (course) {
            await Course.deleteOne({ studentID: req.body.studentID });
            return res.status(200).json("{message: Student removed from class}");
        }
        else {
            return res.status(200).json("{message: No Student Removed}");
        }
    }
    catch {
        return res.status(500).json("{message: Failed to remove student from class");
    }
});*/

//Remove student from classes
app.post('/removeStudentFromClasses', async (req, res) => {
    try {
        let course = await Course.findOne({ studentID: req.body.studentID });

        if (course) {
            await Student.deleteOne({ studentID: req.body.studentID });
            return res.status(200).json("{message: Student removed from class}");
        }
        else {
            return res.status(200).json("{message: No Student Removed}");
        }
    }
    catch {
        return res.status(500).json("{message: Failed to remove student from class");
    }
});


app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
});