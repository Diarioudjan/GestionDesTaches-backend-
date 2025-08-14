import 'dotenv/config';
import './src/config/db.js';
import app from './src/app.js';

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server lancé sur http://localhost:${PORT}`);
});
