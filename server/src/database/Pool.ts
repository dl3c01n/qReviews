
import { Pool } from 'pg';
export const pool = new Pool ({
  max: 20,
  connectionString: 'postgres://root:root@172.26.64.1:5432/qreviews_db',
  idleTimeoutMillis: 30000
});