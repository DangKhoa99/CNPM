export function calAvgReview(dataReview){
    let avgReview = 0;
    if(dataReview){
        if(dataReview.length > 0){
            for(var key in dataReview){
                var obj = dataReview[key];
                avgReview = avgReview + obj.score;
            }
    
            // return string. ex: 4.5
            return (avgReview / dataReview.length).toFixed(1);
        }
        else{
            // return number 0
            return avgReview;
        }
    }
    else{
        return null;
    }
}