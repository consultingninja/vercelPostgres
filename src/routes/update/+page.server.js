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


async function updateUser(user) {
    console.log('user',user);
    const pool = createPool({
        connectionString: SECRET_POSTGRES_STRING,
      });   
  
      //update the user
      const {result} =await pool.sql`UPDATE users 
      SET firstname = ${user.firstname}, lastname = ${user.lastname}, email = ${user.email} WHERE id = ${user.id}`;

    return {
      result
    };
  }


export const actions={
    update: async ({request})=>{
        
        const form = await request.formData();
    
        const firstname = form.get('firstname')?? '';
        const lastname = form.get('lastname')?? '';
        const email = form.get('email')??'';
        const id = form.get('id')??'';

        let updateResult = false;
    
        const data = {
            firstname,
            lastname,
            email,
            id,

        };

        let updateResponse = {
            error:false,
            email:email,
            firstname,
            lastname,
            message: ''
        }
    
        try{
            //update the user
            const result = await updateUser(data);
            console.log('api request ran');
            if(result) updateResult = true;

        }catch(err){
            console.log('api request errored');
            console.log(err);
            updateResponse.error = true;
            updateResponse.message = err.message;

        }

            finally{
                return updateResponse;
            }
    
    }
}