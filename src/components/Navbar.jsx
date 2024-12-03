import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <ul className="flex justify-center space-x-8">
          <li>
            <Link
              to="/"
              className="text-white text-lg font-semibold hover:text-gray-200 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/add"
              className="text-white text-lg font-semibold hover:text-gray-200 transition duration-300"
            >
              Add User
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
