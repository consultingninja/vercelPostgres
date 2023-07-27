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


async function deleteUser(user) {
    console.log('user',user);
    const pool = createPool({
        connectionString: SECRET_POSTGRES_STRING,
      });

      //delete the user
      const { result } = await pool.sql`
      DELETE FROM users
      WHERE id = ${user.id};
    `;

    return {
      result
    };
  }


export const actions={
    delete: async ({request})=>{
        
        const form = await request.formData();
        const id = form.get('id')??'';

        let deleteResult = false;
    
        const data = {
            id,
        };

        let deleteResponse = {
            error:false,
            message: ''
        }
    
        try{
            //delete the user
            const result = await deleteUser(data);
            console.log('api request ran');
            if(result) deleteResult = true;

        }catch(err){
            console.log('api request errored');
            console.log(err);
            deleteResponse.error = true;
            deleteResponse.message = err.message;

        }

            finally{
                return deleteResponse;
            }
    
    }
}