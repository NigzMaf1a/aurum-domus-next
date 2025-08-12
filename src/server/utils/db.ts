import mysql, { Pool, PoolOptions, RowDataPacket, ResultSetHeader} from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'] as const;
for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
}

const poolConfig: PoolOptions = {
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONN_LIMIT) || 10,
  queueLimit: 0,
};

const pool: Pool = mysql.createPool(poolConfig);

/**
 * Query wrapper with overloads for correct return type:
 * - SELECT returns RowDataPacket[]
 * - INSERT/UPDATE/DELETE returns ResultSetHeader
 */
export async function query<T extends RowDataPacket>(
  sql: string,
  params?: ReadonlyArray<unknown>
): Promise<T[]>;

export async function query(
  sql: string,
  params?: ReadonlyArray<unknown>
): Promise<ResultSetHeader>;

// Implementation
export async function query<T extends RowDataPacket>(
  sql: string,
  params?: ReadonlyArray<unknown>
): Promise<T[] | ResultSetHeader> {
  const [rows] = await pool.query(sql, params);
  return rows as T[] | ResultSetHeader;
}

async function shutdownPool() {
  console.log('🔌 Closing MySQL connection pool...');
  await pool.end();
  console.log('✅ MySQL pool closed.');
}

process.on('SIGINT', async () => {
  await shutdownPool();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await shutdownPool();
  process.exit(0);
});

export default pool;





// This module exports a MySQL connection pool for use in the application.
// It uses environment variables for configuration, allowing for easy changes without modifying code.
// The pool is created using mysql2's promise API for better async/await support.
// The connection pool allows for efficient management of multiple database connections,
// improving performance and resource utilization in a production environment.
// The pool is configured with a maximum of 10 connections, which can be adjusted based on application needs.
// The `waitForConnections` option ensures that requests wait for a connection to become available,
// rather than failing immediately when the pool is exhausted.
// The `queueLimit` is set to 0, meaning there is no limit on the number of queued requests.
// This setup is suitable for applications that require high concurrency and low latency in database operations.
// The use of environment variables for database configuration enhances security and flexibility,
// allowing different configurations for development, testing, and production environments.
// The pool can be used throughout the application to execute queries, transactions, and other database operations.
// This modular approach keeps the database configuration separate from the application logic,
// promoting better organization and maintainability of the codebase.
// The pool can be imported in other modules as needed, enabling a clean separation of concerns.
// This code is a foundational part of the Aurum Domus server, providing the necessary database connectivity