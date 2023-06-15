import React, { createContext, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const CovidContext = createContext({
  dark: '',
  airQuality: {},
  user: {},
  admin: {},
  token: {},
  userId: {},
  countries: [],
  country: {},
  singleCountry: {},
  iranStats: {},
  countryInfo: {},
  filteredCountry: [],
  news: [],
  iranVac: [],
  iranLastVac: {},
  vaccine: [],
  phaseOne: [],
  phaseTwo: [],
  phaseThree: [],
  phaseFour: [],
  singleNews: {},
  iranChart: [],
  worldVac: [],
  world: {},
  iranVacT: {},
  getCountries: () => { },
  getSingleCountry: () => { },
  getNews: () => { },
  getSingleNews: () => { },
  getIranStats: () => { },
  getIranChart: () => { },
  searchCountry: () => { },
  login: () => { },
  getUser: () => { },
  logout: () => { },
  addNews: () => { },
  deleteNews: () => { },
  addVaccine: () => { },
  getVaccines: () => { },
  getIranVaccine: () => { },
  getPhaseOne: () => { },
  getPhaseTwo: () => { },
  getPhaseThree: () => { },
  getPhaseFour: () => { },
  getAirQuality: () => { },
  refData: () => { },
  getWorld: () => { },
  darkModeFun: () => { },
  getWorldVac: () => { },
  editStats: () => { },
  test: "",
  next: {},
  prev: {},
  testChange: () => { },
  searchNews: () => { },
  totalRes: ''
})

export const CovidContextProvider = (props) => {
  const router = useRouter()

  const [darkMode, setDarkMode] = useState(false)
  const [airQ, setAirQ] = useState({})
  const [userData, setUserData] = useState({})
  const [isAdmin, setIsAdmin] = useState()
  const [tokenData, setTokenData] = useState('')
  const [uid, setUid] = useState('')
  const [countriesData, setCountriesData] = useState([])
  const [newsData, setNewsData] = useState([])
  const [vaccineData, setVaccineData] = useState([])
  const [iranChartData, setIranChartData] = useState([])
  const [iranVaccine, setIranVaccine] = useState([])
  const [phaseOneData, setPhaseOneData] = useState([])
  const [phaseTwoData, setPhaseTwoData] = useState([])
  const [phaseThreeData, setPhaseThreeData] = useState([])
  const [phaseFourData, setPhaseFourData] = useState([])
  const [worldVacData, setWorldVacData] = useState([])
  const [iranLastVaccine, setIranLastVaccine] = useState({})
  const [worldData, setWorldData] = useState({})
  const [coutnryData, setCountryData] = useState({})
  const [iranData, setIranData] = useState({})
  const [countryInfoData, setCountryInfoData] = useState({})
  const [singleNewsData, setSingleNewsData] = useState({})
  const [singleCountryData, setSingleCountryData] = useState({})
  const [searchCountryData, setSearchCountryData] = useState([])
  const [iranVacTwo, setIranVacTwo] = useState({})
  const [nextPage, setNextPage] = useState({})
  const [prevPage, setPrevPage] = useState({})
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (isSystemDark) {
      (isSystemDark === true) ? setDarkMode(true) : setDarkMode(false)
      localStorage.setItem('dark', true)
    } else {
      setDarkMode(false)
      localStorage.setItem('dark', false)
    }

  }, [])

  const darkModeHandler = () => {
    if (darkMode === false) {
      setDarkMode(true)
      localStorage.setItem('dark', true)
    } else {
      setDarkMode(false)
      localStorage.setItem('dark', false)
    }
  }
  // const darkModeHandler = () => {
  //     setDarkMode(prevState => !prevState)

  // }

  // const getIranStatsHandler = async () => {
  //   try {
  //     const { data, status } = await axios('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/Iran/irn', {
  //       headers: {
  //         'Content-type': 'application/json',
  //         'x-rapidapi-key': '8887a86e3cmshdf8099d89e8cd58p1fcf9ejsn8c4fc4b8bbe7',
  //         'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
  //       }
  //     })

  //     setIranData(data[0])
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  const getIranStatsHandler = async () => {
    try {
      const { data } = await axios("https://disease.sh/v2/countries/iran")
      setIranData(data)

    }
    catch (err) {
      console.log(err);
    }
  }
  const getIranChartDataHandler = async (name) => {

    try {
      const { data } = await axios.get(`https://api.covid19api.com/total/country/${name}`)
      setIranChartData(data)
      return data

    } catch (err) {
      console.log(err)
    }
  }

  const getNewsHandler = async (page, limit) => {
    try {
      const { data } = await axios.get(`https://api.maniyeganeh.ir/api/news?page=${page}&limit=${limit}`)
      setNewsData(data.results)
      setNextPage(data.next)
      setPrevPage(data.previous)


      return data.results
    } catch (err) {
      console.log(err)
    }
  }
  const getSearchNews = async (search, page, limit) => {
    try {
      const { data } = await axios.get(`https://api.maniyeganeh.ir/api/news/search/${search}?page=${page}&limit=${limit}`)

      setNewsData(data.results)
      setNextPage(data.next)
      setPrevPage(data.previous)
      setTotal(data.total)
    }
    catch (err) {
      console.log(err);
    }
  }
  const getCountiresDataHandler = async () => {
    try {
      const { data } = await axios('https://disease.sh/v3/covid-19/countries')
      // setCountriesData(data)
      return data
    } catch (err) {
      console.log(err)
      toast.error('مشکلی از سمت سرور رخ داده است', {
        position: 'top-right',
        style: {
          direction: 'rtl',
          fontFamily: 'Iran-sans-reg'

        }
      })
    }
  }
  // const getCountiresDataHandler = async () => {
  //     try {
  //         const { data } = await axios('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries',{
  //             headers: {
  //                 'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
  //                 'x-rapidapi-key': '8887a86e3cmshdf8099d89e8cd58p1fcf9ejsn8c4fc4b8bbe7'
  //               }
  //         })
  //         console.log(data);
  //          setCountriesData(data)

  //     }
  //     catch (err) {
  //         console.log(err);
  //     }
  // }
  // const getSingleCountryHandler = async (country , iso) => {
  //     try {
  //         const { data } = await axios(`https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/${country}/${iso}`,{
  //             headers: {
  //                 'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
  //                 'x-rapidapi-key': '8887a86e3cmshdf8099d89e8cd58p1fcf9ejsn8c4fc4b8bbe7'
  //               }
  //         })
  //         setSingleCountryData(data)
  //         setCountryInfoData(data.countryInfo)

  //     }
  //     catch (err) {
  //         console.log(err);
  //     }
  // }
  const getSingleCountryHandler = async (country) => {
    try {
      const { data } = await axios(`https://disease.sh/v2/countries/${country}`)
      setSingleCountryData(data)
      setCountryInfoData(data.countryInfo)
    } catch (err) {
      console.log(err)
    }
  }

  const searchCountryHanlder = async (name) => {
    console.log(name)
    const countries = [...countriesData]
    const searchResult = countries.filter(count =>
      count.continent.match(name)
    )
    if (searchResult) {
      return setSearchCountryData(searchResult)
    }
    console.log(searchCountryData)
  }
  const getSingleNewsHandler = async (id) => {
    try {
      const { data } = await axios.get(`https://api.maniyeganeh.ir/api/news/${id}`)
      setSingleNewsData(data.news)
    } catch (err) {
      console.log(err)
    }
  }
  const loginHandler = async (email, password) => {
    try {
      const user = {
        email,
        password
      }

      const { data } = await axios('https://api.maniyeganeh.ir/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        data: user
      })

      localStorage.setItem('token', data.token)
      localStorage.setItem('uid', data.user._id)
      setTokenData(data.token)
      setUid(data.user._id)
      setIsAdmin(data.user.isAdmin)
      toast.success('Welcome', {
        position: 'top-right'
      })
    } catch (err) {
      console.log(err)
    }
  }
  const getUserHandler = async (id) => {
    try {
      const { data } = await axios.get(`https://api.maniyeganeh.ir/api/user/${id}`)

      setUserData(data.users)
    } catch (err) {
      console.log(err)
    }
  }
  const logoutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('uid')
    router.push('/user/login')
  }
  const addNewsHandler = async (news) => {
    try {
      const { status } = await axios('https://api.maniyeganeh.ir/api/news/postnews', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: news
      })
      if (status === 201) {
        toast.success('News Added', {
          position: 'top-right'
        })
      }
    } catch (err) {
      toast.error(err.message, {
        position: 'top-right'
      })
      console.log(err.message)
    }
  }
  const removeNewsHandler = async (newsId) => {
    try {
      const { status } = await axios.delete(`https://api.maniyeganeh.ir/api/news/${newsId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')

        }
      })
      if (status === 200) {
        toast.error('news deleted', {
          position: 'top-right'
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  const addVaccineHandler = async (vaccine) => {
    console.log(vaccine)
    try {
      const { data, status } = await axios('https://api.maniyeganeh.ir/api/vaccine/iranvaccine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: vaccine
      })
      if (status === 201) {
        toast.success(data.message, {
          position: 'top-right'
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  const getVaccinesHandler = async () => {
    try {
      const { data } = await axios.get('https://api.maniyeganeh.ir/api/vaccine/')
      setVaccineData(data.vaccine)
    } catch (err) {
      console.log(err)
    }
  }

  const getIranVaccineHandler = async () => {
    try {
      const { data } = await axios.get('https://api.maniyeganeh.ir/api/vaccine/iranvaccine')
      // const { data } = await axios.get("http://localhost:8080/api/vaccine/iranvaccine")

      setIranVaccine(data.vaccine)
      setIranLastVaccine(data.vaccine[data.vaccine.length - 1])
      setIranVacTwo(data.vaccine[data.vaccine.length - 2])
      return data.vaccine
    } catch (err) {
      console.log(err.message)
    }
  }

  const getPhaseOneHanlder = async () => {
    try {
      const { data } = await axios.get('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/vaccines/get-all-vaccines-phase-i', {
        headers: {
          'x-rapidapi-key': '8887a86e3cmshdf8099d89e8cd58p1fcf9ejsn8c4fc4b8bbe7',
          'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
        }
      })
      setPhaseOneData(data)
    } catch (err) {
      console.log(err)
    }
  }

  const getPhaseTwoHandler = async () => {
    try {
      const { data } = await axios.get('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/vaccines/get-all-vaccines-phase-ii', {
        headers: {
          'x-rapidapi-key': '8887a86e3cmshdf8099d89e8cd58p1fcf9ejsn8c4fc4b8bbe7',
          'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
        }
      })
      setPhaseTwoData(data)
    } catch (err) {
      console.log(err)
    }
  }

  const getPhaseThreeHanlder = async () => {
    try {
      const { data } = await axios.get('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/vaccines/get-all-vaccines-phase-iii', {
        headers: {
          'x-rapidapi-key': '8887a86e3cmshdf8099d89e8cd58p1fcf9ejsn8c4fc4b8bbe7',
          'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
        }
      })
      setPhaseThreeData(data)
    } catch (err) {
      console.log(err)
    }
  }

  const getPhaseFourHandler = async () => {
    try {
      const { data } = await axios.get('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/vaccines/get-all-vaccines-phase-iv', {
        headers: {
          'x-rapidapi-key': '8887a86e3cmshdf8099d89e8cd58p1fcf9ejsn8c4fc4b8bbe7',
          'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
        }
      })
      setPhaseFourData(data)
    } catch (err) {
      console.log(err)
    }
  }

  const getAirQualityHandler = async (lat, lon) => {
    try {
      const { data } = await axios(`https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=4f1d290c-e863-4126-b546-71317e7da0e1`)
      setAirQ(data.data.current.pollution)
      // console.log(data.data.current.pollution)
    } catch (err) {
      console.log(err)
    }
  }

  const getWorldDataHandler = async () => {
    try {
      const { data } = await axios('https://disease.sh/v2/all')
      setWorldData(data)
    } catch (err) {
      console.log(err)
    }
  }
  // const getWorldDataHandler = async () => {
  //     try {
  //         const { data } = await axios('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world',{
  //             headers: {
  //                 'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
  //                 'x-rapidapi-key': '8887a86e3cmshdf8099d89e8cd58p1fcf9ejsn8c4fc4b8bbe7'
  //               }
  //         })
  //         setWorldData(data[0])
  //     }
  //     catch (err) {
  //         console.log(err);
  //     }
  // }
  const getWorldVacHandler = async () => {
    try {
      const { data } = await axios('https://api.maniyeganeh.ir/api/world-vaccine')
      setWorldVacData(data.vaccine)
    } catch (err) {
      console.log(err)
    }
  }
  const updateStatsHandler = async (id, first, second) => {
    try {
      const { data, status } = await axios(`https://api.maniyeganeh.ir/api/world-vaccine/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'

        },
        data: {
          first,
          second,
          creator: localStorage.getItem('uid')
        }
      })
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }
  const refDataHandler = () => {
    setSearchCountryData([])
  }
  useEffect(() => {
    setTokenData(localStorage.getItem('token'))
  }, [tokenData])
  useEffect(() => {
    setUid(localStorage.getItem('uid'))
  }, [uid])
  useEffect(() => {

  }, [])
  // useEffect(() => {

  //     setDarkMode(localStorage.getItem("dark"))
  // },[])
  const context = {
    dark: darkMode,
    airQuality: airQ,
    user: userData,
    token: tokenData,
    userId: uid,
    admin: isAdmin,
    login: loginHandler,
    countries: countriesData,
    country: coutnryData,
    iranStats: iranData,
    iranVac: iranVaccine,
    iranLastVac: iranLastVaccine,
    singleCountry: singleCountryData,
    news: newsData,
    vaccine: vaccineData,
    phaseOne: phaseOneData,
    phaseTwo: phaseTwoData,
    phaseThree: phaseThreeData,
    phaseFour: phaseFourData,
    getSingleNews: getSingleNewsHandler,
    countryInfo: countryInfoData,
    getNews: getNewsHandler,
    iranChart: iranChartData,
    singleNews: singleNewsData,
    getIranStats: getIranStatsHandler,
    getIranChart: getIranChartDataHandler,
    getCountries: getCountiresDataHandler,
    getSingleCountry: getSingleCountryHandler,
    filteredCountry: searchCountryData,
    searchCountry: searchCountryHanlder,
    getUser: getUserHandler,
    logout: logoutHandler,
    addNews: addNewsHandler,
    deleteNews: removeNewsHandler,
    addVaccine: addVaccineHandler,
    getVaccines: getVaccinesHandler,
    getIranVaccine: getIranVaccineHandler,
    getPhaseOne: getPhaseOneHanlder,
    getPhaseTwo: getPhaseTwoHandler,
    getPhaseThree: getPhaseThreeHanlder,
    getPhaseFour: getPhaseFourHandler,
    getAirQuality: getAirQualityHandler,
    refData: refDataHandler,
    world: worldData,
    getWorld: getWorldDataHandler,
    iranVacT: iranVacTwo,
    darkModeFun: darkModeHandler,
    worldVac: worldVacData,
    getWorldVac: getWorldVacHandler,
    editStats: updateStatsHandler,
    next: nextPage,
    prev: prevPage,
    searchNews: getSearchNews,
    totalRes: total

  }
  return (
    <CovidContext.Provider value={context}>
      {props.children}
    </CovidContext.Provider>
  )
}

export default CovidContext
