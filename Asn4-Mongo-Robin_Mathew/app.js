const express = require("express");
const mongoose = require("mongoose");
const app = express();
const database = require("./config/database");
const bodyParser = require("body-parser"); // pull information from HTML POST (express4)

const port = process.env.PORT || 8001;
app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json

mongoose.connect(database.url);

const Employee = require("./models/employee");

//get all employee data from db
app.get("/api/employees", async function (req, res) {
  try {
    // use mongoose to get all todos in the database
    const employees = await Employee.find({});
    res.json(employees); // return all employees in JSON format
  } catch (error) {
    // if there is an error retrieving, send the error otherwise send data
    res.status(500).send(err);
  }
});

// get a employee with ID of 1
app.get("/api/employees/:employee_id", async function (req, res) {
  try {
    const id = req.params.employee_id;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.json(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});

// create employee and send back all employees after creation
app.post("/api/employees", async function (req, res) {
  // create mongose method to create a new record into collection
  console.log(req.body);
  try {
    const employee = new Employee(req.body);
    await employee.save();
    const employees = await Employee.find({});
    res.json(employees); // return all employees in JSON format
  } catch (error) {
    res.send(error);
  }
});

// create employee and send back all employees after creation
app.put("/api/employees/:employee_id", async function (req, res) {
  // create mongose method to update an existing record into collection
  console.log(req.body);
  try {
    const id = req.params.employee_id;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedEmployee) {
      return res.status(404).send("Employee not found");
    }
    res.send("Successfully! Employee updated - " + updatedEmployee.name);
  } catch (error) {
    throw error;
  }
});

// delete a employee by id
app.delete("/api/employees/:employee_id", async function (req, res) {
  console.log(req.params.employee_id);
  try {
    const id = req.params.employee_id;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).send("Employee not found");
    }
    res.send("Successfully! Employee has been Deleted.");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port);
console.log("App listening on port : " + port);
