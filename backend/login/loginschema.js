import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import zod from 'zod';
export const employeeValidationSchema = zod.object({
    Name: zod.string().min(1, { message: "Name is required" }),
    email: zod.string().email({ message: "Invalid email address" }),
    mobile_number: zod
      .string()
      .min(10, { message: "Mobile number must be 10 digits" })
      .max(10, { message: "Mobile number must be 10 digits" })
      .regex(/^\d+$/, { message: "Mobile number should contain only digits" }),
    designation: zod.string().min(1, { message: "Designation is required" }),
    gender: zod.string().min(1, { message: "Gender is required" }),
    course: zod
      .object({
        MCA: zod.boolean(),
        BCA: zod.boolean(),
        BSC: zod.boolean(),
      })
      .refine(
        (courses) => Object.values(courses).some((value) => value),
        { message: "At least one course must be selected" }
      ),
  });
export const loginschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
});
loginschema.pre('save',async function(next){
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
const usermodel = mongoose.model('Userinfo', loginschema);
export default usermodel;
