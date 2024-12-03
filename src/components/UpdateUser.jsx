import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleUser, updateUser } from '../redux/userSlice';
import { useEffect, useState } from 'react';

const UpdateUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  if (!id) return <div>Invalid User ID</div>; 
  
  const user = users.find((user) => user._id === id);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: ''
  });

  useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        const fetchedUser = await dispatch(getSingleUser(id)).unwrap();
        setFormData({
          name: fetchedUser?.name || '',
          email: fetchedUser?.email || '',
          phone: fetchedUser?.phone || '',
          address: fetchedUser?.address || '',
          gender: fetchedUser?.gender || ''
        });
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };
  
    if (!user) {  
      fetchAndSetUser();
    } else {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        gender: user.gender || ''
      });
    }
  }, [dispatch, id, user]);  
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, user: formData }))
      .unwrap()
      .then(() => {
        alert('User updated successfully!');
      })
      .catch((err) => {
        console.error('Error updating user:', err);
      });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Update User</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
       
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-700 font-medium">Phone:</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div>
          <label htmlFor="address" className="block text-gray-700 font-medium">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

       
        <div>
          <label htmlFor="gender" className="block text-gray-700 font-medium">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

      
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
