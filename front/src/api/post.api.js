import axios from 'axios';

 export const createNewComic = async(post)=>{



    //! esperando la ruta para hacer el POST 
    await axios.post( "https://no-country-cwv9.onrender.com/api/comics/create",post)
    

   


}