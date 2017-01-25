try {
  require('dotenv').config();
} catch(e) {
  console.warn('No .env found, assuming ENV loaded manually');
}
import './ai';
