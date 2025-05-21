import bcrypt from 'bcryptjs';

const users = [
  {
    name: "Admin User",
    email: "admin1@example.com",
    password: bcrypt.hashSync('123456', 10), // Stronger password
    isAdmin: true,  // ✅ No quotes, correct Boolean type
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync('123456', 10), // ✅ Stronger password
    isAdmin: false,  // ✅ No quotes, correct Boolean type
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync('123456', 10), // ✅ Stronger password
    isAdmin: false,  // ✅ No quotes, correct Boolean type
  }
];

export default users;

console.log(users);
