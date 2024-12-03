import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser } from '../redux/userSlice';
import { Link } from 'react-router-dom';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  if (loading) return <div className="text-center mt-6">Loading...</div>;
  if (error) return <div className="text-center mt-6 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-200 hover:scale-105"
          >
            <img
              src={user.image || 'https://via.placeholder.com/300'}
              alt={user.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
              <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-600"><strong>Phone:</strong> {user.phone}</p>
              <p className="text-gray-600"><strong>Address:</strong> {user.address}</p>
            </div>
            <div className="flex justify-between items-center p-4 border-t">
              <button
                className="bg-red-400 text-white px-4 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
              <Link
                to={`/user/${user._id}`}
                className="bg-blue-400 text-white px-4 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
