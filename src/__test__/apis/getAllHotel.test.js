import getAllHotel from "../../apis/getAllHotel"

it("testing API getAllHotel", async function () {
    const response = getAllHotel();
    var data = await response;
    expect(data[142].name).toEqual("DANGKHOA")
})

it("testing API getAllHotel out of range", async function () {
    const response = getAllHotel();
    var data = await response;
    expect(data[200]).toEqual(undefined)
})