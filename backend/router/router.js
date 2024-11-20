import express from "express";
import { upload } from "../middleware/middleware.js";
import { postdetails, getdetails, updatedetails, deletedetails, getEmployeeById } from "../routecontroller/controller.js";

const router = express.Router();

// GET all employee details
router.get("/", getdetails);

// GET a single employee by ID
router.get("/:id", getEmployeeById);

// POST new employee details (with file upload)
router.post("/", upload.single("image_upload"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const validatedData = {
      ...req.body,
      image_upload: req.file.filename,
      course: typeof req.body.course === "string" ? JSON.parse(req.body.course) : req.body.course,
    };

    await postdetails(validatedData, res);
  } catch (error) {
    console.error("Error during POST:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// PUT update employee details by ID
router.put("/:id", upload.single("image_upload"), async (req, res) => {
  await updatedetails(req, res);
});

// DELETE employee by ID
router.delete("/:id", deletedetails);

export default router;
