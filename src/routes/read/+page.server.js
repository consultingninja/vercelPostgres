import { createPool } from '@vercel/postgres';
import {SECRET_POSTGRES_STRING} from '$env/static/private';

export const config = {
    runtime: 'nodejs18.x',
}


export async function load({}){
    const pool = createPool({
        connectionString: SECRET_POSTGRES_STRING,
      });
    //attempt to get users from user table return nothing if table does not exist or error
    const {rows} = await pool.sql`SELECT * FROM users`
    console.log(rows)
    return {users:rows}
}