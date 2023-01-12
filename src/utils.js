import { fileURLtoPath } from 'url';
import { direname } from 'path';

const __filename = fileURLtoPath(import.meta.url);
const __direname = direname(__filename);

export default __direname;