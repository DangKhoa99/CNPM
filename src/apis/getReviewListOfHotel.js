import axios from 'axios';

function getReviewListOfHotel(idHotel){
    const options = {
        method: "POST",
        data: {
            "hotelId": idHotel
        },
        url: "http://localhost:5000/hotel/review"
    }
    return  axios(options)
            .then(response => {
                return response.data;
            })
            .catch(error => console.log("Error getReviewListOfHotel: ", error));
}

export default getReviewListOfHotel;
