import axios from 'axios';

function getAllHotel(){
    const options = {
        method: "GET",
        url: "http://localhost:5000/hotel/"
    }
    return  axios(options)
            .then(response => {
                return response.data;
            })
            .catch(error => console.log("Error getAllHotel: ", error));
}

export default getAllHotel;
