import getReviewListOfHotel from "../../apis/getReviewListOfHotel"

it("testing API getReviewListOfHotel", async function () {
    let idHotel = "60770fda3c9ed7d07f99bbc1";
    const response = getReviewListOfHotel(idHotel);
    var data = await response;
    expect(data[0].score).toEqual(2)
})

it("testing API getReviewListOfHotel no data review", async function () {
    let idHotel = "60770fda3c9ed7d07f99bc0c";
    const response = getReviewListOfHotel(idHotel);
    var data = await response;
    expect(data).toEqual([])
})

it("testing API getReviewListOfHotel not exist id", async function () {
    let idHotel = "test";
    const response = getReviewListOfHotel(idHotel);
    var data = await response;
    expect(data).toEqual(undefined)
})