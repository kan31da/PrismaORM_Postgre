import { Client } from 'pg';
import { execSync } from 'child_process';
import 'dotenv/config';

const config = {
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD|| 'postgres',
    host: process.env.HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
};

async function run() {
    const dbName = process.env.DB_NAME || 'mydb';

    if (!/^[a-zA-Z0-9_]+$/.test(dbName)) {
        throw new Error('Invalid database name');
    }

    // Connect to default DB so we can create the target DB
    const client = new Client({
        ...config,
        database: 'postgres'
    });

    try {
        console.log(`Connecting to PostgreSQL at ${config.host}:${config.port}...`);
        await client.connect();

        console.log(`Checking if database "${dbName}" exists...`);

        const result = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [dbName]
        );

        if (result.rowCount === 0) {
            console.log(`Database "${dbName}" does not exist. Creating...`);
            await client.query(`CREATE DATABASE "${dbName}"`);
        } else {
            console.log(`Database "${dbName}" already exists.`);
        }

        console.log('Database is ready. Running Prisma db push...');
        execSync('npx prisma db push', { stdio: 'inherit' });

        console.log('Done.');
    } catch (err) {
        console.error('Database initialization failed:', err.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

run();
