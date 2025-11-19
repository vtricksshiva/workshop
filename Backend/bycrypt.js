const bcrypt = require('bcryptjs');

async function generateHash() {
    const password = 'admin123'; // Change this to your desired password
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('Password:', password);
    console.log('Hash:', hashedPassword);
    
    // SQL to insert user
    console.log('\nSQL to insert user:');
    console.log(`INSERT INTO users (email, password, name, bio, profile_picture, role) VALUES ('admin@example.com', '${hashedPassword}', 'Admin User', 'System Administrator', 'https://via.placeholder.com/150/007bff/ffffff?text=Admin', 'admin');`);
}

generateHash();