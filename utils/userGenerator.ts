import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { saveLastUser } from './saveLastUser';

const FIXED_PASSWORD = 'Test12#$';


// __filename и __dirname в ES модули
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'user.counter.txt');

export function generateNextUser() {
  let userNumber = 1;

  if (fs.existsSync(filePath)) {
    const numStr = fs.readFileSync(filePath, 'utf-8');
    userNumber = parseInt(numStr, 10) + 1;
  }

  fs.writeFileSync(filePath, userNumber.toString(), 'utf-8');

  const username = `georgitest${userNumber}`;
  const email = `georgitest${userNumber}@example.com`;
  const password = `Test12#$`;

  saveLastUser({ username, email, password });

  console.log(`Generated username: ${username}, email: ${email}`);
  return { username, email };
}
