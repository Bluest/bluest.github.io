import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(__dirname));

app.listen(1337, () => {
    console.log('Listening on port 1337');
});
