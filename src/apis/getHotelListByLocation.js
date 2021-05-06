import axios from 'axios';

function getHotelListByLocation(location){
    const options = {
        method: "POST",
        data: {
            "location": location
        },
        url: "http://localhost:5000/hotel/location"
    }
    return  axios(options)
            .then(response => {
                return response.data;
            })
            .catch(error => console.log("Error getHotelListByLocation: ", error));
}

export default getHotelListByLocation;
