import axios from 'axios';

function getHotelById(idHotel){
    const options = {
        method: "POST",
        data: {
            "hotelId": idHotel
        },
        url: "http://localhost:5000/hotel/"
    }
    return  axios(options)
            .then(response => {
                return response.data;
            })
            .catch(error => console.log("Error getHotelById: ", error));
}

export default getHotelById;
