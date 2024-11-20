import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Fetch employee data
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/details');
        setEmployees(response.data.data); // Adjust to match API response structure
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/details/${id}`);
      if (response.data.success) {
        alert('Employee deleted successfully');
        setEmployees((prevEmployees) => prevEmployees.filter(emp => emp._id !== id));
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Navigate to Edit Employee page
  const handleEdit = (employee) => {
    navigate('/editemployee', { state: { employee } });
  };

  // Filter and sort employees by name
  const filteredAndSortedEmployees = employees
    .filter(employee =>
      employee.Name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.Name.localeCompare(b.Name)); // Sort by name

  return (
    <div>
      <div className="employeeheading">
        <h3 style={{ color: 'white' }}>Employee Data</h3>
      </div>
      <div className="searchfield">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedEmployees.map((employee, index) => (
              <tr key={employee._id}>
                <td>{index + 1}</td>
                <td>
                  <img 
                    src={
                      employee.image_upload
                        ? `http://localhost:5000/uploads/${employee.image_upload}`
                        : '/placeholder-image.png'
                    }
                    alt={employee.Name}
                    // width={50}
                    // height={50}
                  />
                </td>
                <td>{employee.Name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile_number}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>
                  {Object.keys(employee.course).map((courseKey) => (
                    <div key={courseKey}>
                      {courseKey}: {employee.course[courseKey] ? 'Yes' : 'No'}
                    </div>
                  ))}
                </td>
                <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(employee)}>Edit</button>
                  <button onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeTable;
