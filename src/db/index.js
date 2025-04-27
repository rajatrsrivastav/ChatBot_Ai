import { fileURLToPath } from "url";
import db from 'src/db';  // Default export from src/db/index.js

const __filename = fileURLToPath(import.meta.url);
const __dirname = __filename.substring(0, __filename.lastIndexOf("/"));

export default __dirname;
