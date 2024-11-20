import mongoose from "mongoose";
import zod from 'zod';

// Validation schema for employee data
export const employeeValidationSchema = zod.object({
    Name: zod.string().min(1, { message: "Name is required" }),
    email: zod.string().email({ message: "Invalid email address" }),
    mobile_number: zod.string()
        .min(10, { message: "Mobile number must be 10 digits" })
        .max(10, { message: "Mobile number must be 10 digits" })
        .regex(/^\d+$/, { message: "Mobile number should contain only digits" }),
    designation: zod.string().min(1, { message: "Designation is required" }),
    gender: zod.string().min(1, { message: "Gender is required" }),
    course: zod.record(zod.boolean(), { message: "Invalid course data" }),
    image_upload: zod.string().min(1, { message: "Image upload is required" }),
});
export const employeeUpdateValidationSchema=zod.object({
    Name: zod.string().min(1, { message: "Name is required" }),
    email: zod.string().email({ message: "Invalid email address" }),
    mobile_number: zod.string()
    .min(10, { message: "Mobile number must be 10 digits" })
    .max(10, { message: "Mobile number must be 10 digits" })
    .regex(/^\d+$/, { message: "Mobile number should contain only digits" }),
    designation: zod.string().min(1, { message: "Designation is required" }),
    gender: zod.string().min(1, { message: "Gender is required" }),
    course: zod.record(zod.boolean(), { message: "Invalid course data" }),
    image_upload: zod.string().min(1, { message: "Image upload is required" }).optional(),
})
// Define the schema for MongoDB
const schemainfo = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile_number: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    course: {
        type: Map,
        of: Boolean,
        required: true,
    },
    image_upload: {
        type: String, // Will store the file path of the uploaded image
        required: true,
    }
}, {
    timestamps: true
});

// Export the model
const employeemodel = mongoose.model('Employee', schemainfo);
export default employeemodel;
