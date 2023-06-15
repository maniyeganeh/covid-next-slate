import axios from 'axios'
export const getIranStatsDataHandler = async () => {
  try {
    const { data, status } = await axios('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/Iran/irn', {
      headers: {
        'Content-type': 'application/json',
        'x-rapidapi-key': '8887a86e3cmshdf8099d89e8cd58p1fcf9ejsn8c4fc4b8bbe7',
        'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
      }
    })

    return data[0]
  } catch (err) {
    console.log(err)
  }
}
export const getSingleNewsHandler = async (id) => {
  try {
    const { data } = await axios.get(`https://api.maniyeganeh.ir/api/news/${id}`)

    return data.news
  } catch (err) {
    console.log(err)
  }
}
export const getNewsHandler = async () => {
  try {
    const { data } = await axios.get('https://api.maniyeganeh.ir/api/news')
    return data.results
  } catch (err) {
    console.log(err)
  }
}
