function predict(bathrooms, cul_de_sac, days_on_market, den, laundry, lot, sq_feet, year_built, zip) {
    let intercept = -2233520.211
    bathrooms = 15164.491 * bathrooms
    cul_de_sac = cul_de_sac? 4440.24 : -4440.24
    days_on_market = -4.31 * days_on_market
    den = den? 7986.93 : -7986.93
    laundry = laundry? -517.63 : 517.63
    lot = 70434.40 * lot
    sq_feet = 48.13 * sq_feet
    year_built = 1134.07 * year_built
    zip = calcZip(zip)
    let pred = intercept + bathrooms + cul_de_sac + days_on_market + den
        + laundry + lot + sq_feet + year_built + zip
    console.log(pred)
    return pred
};
predict(3,false,4,true, true, 0.23, 2837,2011, 84045,)
function calcZip(zip){
    switch(zip){
        case 84003:
        zip = 36323.91
        return zip
        case 84004:
        zip = 70771.90
        return zip
        case 84005:
        zip = -34009.58
        return zip
        case 84042:
        zip = 8598.41
        return zip
        case 84043:
        zip = -2956.45
        return zip
        case 84045:
        zip = -14819.16
        return zip
        case 84057:
        zip = 990.35
        return zip
        case 84058:
        zip = 8351.78
        return zip
        case 84062:
        zip = 9761.38
        return zip
        case 84097:
        zip = 24298.02
        return zip
        case 84601:
        zip = 12060.81
        return zip
        case 84602:
        zip = -53906.79
        return zip
        case 84604:
        zip = 68522.40
        return zip
        case 84606:
        zip = 4696.75
        return zip
        case 84633:
        zip = -41999.11
        return zip
        case 84651:
        zip = -27759.83
        return zip
        case 84653:
        zip = -13506.93
        return zip
        case 84655:
        zip = -29292.1
        return zip
        case 84660:
        zip = -28887.91
        return zip
        case 84663:
        zip = 0
        return zip
        case 84664:
        zip = 2762.12
        return zip
    }
}
