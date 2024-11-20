import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const Homecompo = () => {
  const location = useLocation(); // Get passed state
  // const navigate = useNavigate();
  const employee = location.state?.employee; // Extract employee data if exists

  const [username, setUsername] = useState(employee?.Name || "");
  const [email, setEmail] = useState(employee?.email || "");
  const [mobileno, setMobileNo] = useState(employee?.mobile_number || "");
  const [designation, setDesignation] = useState(employee?.designation || "");
  const [gender, setGender] = useState(employee?.gender || "");
  const [courses, setCourses] = useState(employee?.course || { MCA: false, BCA: false, BSC: false });
  const [imageUpload, setImageUpload] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const handleCourseChange = (e) => {
    const { name, checked } = e.target;
    setCourses((prevCourses) => ({
      ...prevCourses,
      [name]: checked,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImageUpload(file);
      setMessage("");
    } else {
      setImageUpload(null);
      setMessage("Only JPEG and PNG images are allowed.");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    if (
      !username ||
      !email ||
      !mobileno ||
      !designation ||
      !gender ||
      Object.values(courses).every((val) => !val) ||
      (!imageUpload && !employee)
    ) {
      setMessage("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("Name", username);
      formData.append("email", email);
      formData.append("mobile_number", mobileno);
      formData.append("designation", designation);
      formData.append("gender", gender);
      formData.append("course", JSON.stringify(courses));
      if (imageUpload) {
        formData.append("image_upload", imageUpload);
      }

      const response = employee
        ? await axios.put(`http://localhost:5000/api/details/${employee._id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await axios.post("http://localhost:5000/api/details", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      if (response.data.success) {
        setMessage(employee ? "Employee updated successfully!" : "Employee added successfully!");
        // setTimeout(() => {
        //   navigate("/", { replace: true }); // Redirect to a valid page
        // }, 3000);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000);
      } else {
        setMessage(response.data.message || "Error submitting data.");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setMessage(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="headingcomp">{employee ? "Edit Employee" : "Add New Employee"}</h3>
      <div className="container">
        {/* Form Fields */}
        <input
          className="inputstyleshomecompo"
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="inputstyleshomecompo"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="inputstyleshomecompo"
          type="text"
          placeholder="Mobile Number"
          value={mobileno}
          onChange={(e) => setMobileNo(e.target.value)}
        />
        <select
          className="dropdown"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        >
          <option value="" disabled>
            -- Select designation --
          </option>
          <option value="HR">HR</option>
          <option value="MANAGER">MANAGER</option>
          <option value="SALES">SALES</option>
        </select>

        <div className="form-section">
          <h3>Select Gender</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>Course Details</h3>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="MCA"
                checked={courses.MCA}
                onChange={handleCourseChange}
              />
              MCA
            </label>
            <label className="checkbox-componenet">
              <input
                type="checkbox"
                name="BCA"
                checked={courses.BCA}
                onChange={handleCourseChange}
              />
              BCA
            </label>
            <label className="checkbox-componenet">
              <input
                type="checkbox"
                name="BSC"
                checked={courses.BSC}
                onChange={handleCourseChange}
              />
              BSC
            </label>
          </div>
        </div>

        <div className="image_upload">
          <h3 className="upload_image">Upload Image</h3>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="button-container1">
          <button className="buttoncompo" onClick={handleSubmit} disabled={loading}>
            {employee ? "Update Employee" : "Submit"}
          </button>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
      {showPopup && <div className="popup">{message}</div>}
    </div>
  );
};
