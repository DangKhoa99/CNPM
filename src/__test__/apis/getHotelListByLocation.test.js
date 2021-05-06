import getHotelListByLocation from "../../apis/getHotelListByLocation"

it("testing API getHotelListByLocation", async function () {
    let location = "TPHCM";
    const response = getHotelListByLocation(location);
    var data = await response;
    expect(data[16].name).toEqual("Cool apt with very nice terrace - 201 Binh Thanh ")
})

it("testing API getHotelListByLocation not exist location in db", async function () {
    let location = "Huế";
    const response = getHotelListByLocation(location);
    var data = await response;
    expect(data).toEqual([])
})