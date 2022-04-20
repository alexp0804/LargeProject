const countries = require("./Countries.json")

countryMap = {}
countries.forEach((country) => {
    countryMap[country.name] = country.id
})

export default function CountryCodes()
{
    return countryMap
}