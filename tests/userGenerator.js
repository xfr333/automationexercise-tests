import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'user.counter.txt');

export function generateNextUser() {
  let userNumber = 1;

  if (fs.existsSync(filePath)) {
    const numStr = fs.readFileSync(filePath, 'utf-8');
    userNumber = parseInt(numStr, 10) + 1;
  }

  fs.writeFileSync(filePath, userNumber.toString(), 'utf-8');

  const username = `user${userNumber}`;
  const email = `user${userNumber}@example.com`;

  console.log(`Generated username: ${username}, email: ${email}`);
  return { username, email };
}
