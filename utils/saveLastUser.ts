import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lastUserPath = path.join(__dirname, 'lastUser.json');

export function saveLastUser(userData: { username: string; email: string; password: string }) {
  fs.writeFileSync(lastUserPath, JSON.stringify(userData, null, 2), 'utf-8');
  console.log(`Saved last user: ${userData.username}, email: ${userData.email}`);
}


export function readLastUser(){
    if(!fs.existsSync(lastUserPath)){ 
        throw new Error('No last user data found, Please run the registration test first.');
}
    const data = fs.readFileSync(lastUserPath, 'utf-8');
    return JSON.parse(data);
}