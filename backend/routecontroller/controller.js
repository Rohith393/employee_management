import mongoose from "mongoose";
import employeemodel, { employeeUpdateValidationSchema, employeeValidationSchema } from "../employee_schema/schema.js";

// GET all employee details
export const getdetails = async (req, res) => {
  try {
    const employeedata = await employeemodel.find({});
    res.status(200).json({ success: true, data: employeedata });
  } catch (error) {
    console.error("Error while fetching details:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch employee details" });
  }
};

// GET a single employee by ID
export const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID format" });
  }

  try {
    const employee = await employeemodel.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    console.error("Error while fetching employee by ID:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch employee details" });
  }
};

// POST new employee details
export const postdetails = async (validatedData, res) => {
  try {
    const existingUser = await employeemodel.findOne({ email: validatedData.email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already in use" });
    }

    const newEmployee = new employeemodel(validatedData);
    await newEmployee.save();

    res.status(201).json({ success: true, message: "Employee details saved successfully" });
  } catch (error) {
    console.error("Error while posting details:", error.message);
    res.status(500).json({ success: false, message: "Failed to save employee details" });
  }
};

// PUT update employee details by ID (with image update)
export const updatedetails = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID format" });
  }

  try {
    let updateFields = {
      Name: req.body.Name,
      email: req.body.email,
      mobile_number: req.body.mobile_number,
      designation: req.body.designation,
      gender: req.body.gender,
    };

    // Parse course field if provided
    if (req.body.course) {
      if (typeof req.body.course === "string") {
        try {
          updateFields.course = JSON.parse(req.body.course);
        } catch (error) {
          return res.status(400).json({ success: false, message: "Invalid course format" });
        }
      } else if (typeof req.body.course === "object") {
        updateFields.course = req.body.course;
      }
    }

    // Handle image upload
    if (req.file) {
      updateFields.image_upload = req.file.filename; // Assign the new image filename
    } else {
      const existingEmployee = await employeemodel.findById(id);
      if (existingEmployee) {
        updateFields.image_upload = existingEmployee.image_upload; // Retain the existing image if no new image is uploaded
      }
    }

    // Validate the updated fields
    const validated = employeeUpdateValidationSchema.parse(updateFields);

    // Perform the update
    const updatedEmployee = await employeemodel.findByIdAndUpdate(id, validated, {
      new: true, // Return the updated document
    });

    if (!updatedEmployee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({ success: true, message: "Employee updated successfully", data: updatedEmployee });
  } catch (error) {
    console.error("Error while updating employee:", error.message);
    res.status(500).json({ success: false, message: "Failed to update employee details" });
  }
};

// DELETE employee by ID
export const deletedetails = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID format" });
  }

  try {
    const deletedEmployee = await employeemodel.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error while deleting details:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete employee details" });
  }
};
