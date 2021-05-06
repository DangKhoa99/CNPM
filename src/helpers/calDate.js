export function calDate(checkIn, checkOut){
    if(checkIn && checkOut){
        return Math.floor((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    }
    else{
        return 0;
    }
}