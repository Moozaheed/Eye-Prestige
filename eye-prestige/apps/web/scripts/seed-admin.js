const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const USERS_FILE = path.join(__dirname, '../lib/users.json');
const SALT = "eye-prestige-admin-secret-salt-2026";

// Create lib directory if it doesn't exist
const libDir = path.join(__dirname, '../lib');
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

// Default super admin credentials
const email = 'admin@eyeprestige.com';
const password = 'adminpassword';

// Hash the password with SHA-256 + salt
const passwordHash = crypto.createHash('sha256').update(password + SALT).digest('hex');

const users = [
  {
    id: 'super-admin-1',
    email: email,
    passwordHash: passwordHash,
    role: 'super_admin'
  }
];

fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
console.log('Super admin seeded successfully!');
console.log('Email:', email);
console.log('Password:', password);
