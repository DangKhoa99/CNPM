import getHotelById from "../../apis/getHotelById"

it("testing API getHotelById", async function () {
    let idHotel = "6083ecbd3dbb8305dcde8d0b";
    const response = getHotelById(idHotel);
    var data = await response;
    expect(data.name).toEqual("DANGKHOA")
})

it("testing API getHotelById not exist id", async function () {
    let idHotel = "test";
    const response = getHotelById(idHotel);
    var data = await response;
    expect(data).toEqual(undefined)
})