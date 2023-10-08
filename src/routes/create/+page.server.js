import { createPool } from '@vercel/postgres';
import {SECRET_POSTGRES_STRING} from '$env/static/private';
import { redirect } from '@sveltejs/kit';

function getNextAvailableId(rows) {
  rows.sort((a, b) => a.id - b.id); // Sort the rows array based on id property

  let id = 1;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].id === id) {
      id++; // If the current id matches the expected id, increment to the next one
    } else if (rows[i].id > id) {
      break; // If the current id is greater than the expected id, a gap is found, so break the loop
    }
  }

  return id;
}


async function addUser(user) {
    console.log('user',user);
    const pool = createPool({
        connectionString: SECRET_POSTGRES_STRING,
      });


    await pool.sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      `;

      const {rows} = await pool.sql`SELECT * FROM users`;
      //find an id that hasn't been used yet by grabbing all user ids and either adding one or filling in a previously used id that is now empty
      const id = getNextAvailableId(rows);

  
      //insert the user

      const result = await pool.sql`INSERT INTO users VALUES (${id},${user.firstname}, ${user.lastname}, ${user.email}, ${user.password})
      ON CONFLICT (email) DO NOTHING;
      `;
      console.log('result of insert:',result)
  

    return {
        result
    };
  }


export const actions={
    create: async ({request,locals})=>{
        
        const form = await request.formData();
    
        const firstname = form.get('firstname')?? '';
        const lastname = form.get('lastname')?? '';
        const email = form.get('email')??'';
        const password = form.get('password')??'';

        let createResult = false;
    
        const data = {
            firstname,
            lastname,
            email,
            password: '',

        };

        let registerResponse = {
            error:false,
            email:email,
            firstname,
            lastname,
            message: ''
        }
    
        try{
            data.password = password;

            //create the user
            const result = await addUser(data);
            console.log('api request ran');
            if(result) createResult = true;

        }catch(err){
            console.log('api request errored');
            registerResponse.error = true;
            registerResponse.message = err.message;

        }

            finally{
                if(!createResult){
                    return registerResponse;
                }
                if(createResult) throw redirect(303,'/');

                
            }
    




    }
}