const axios = require('axios')
const { LAST_FM_API_KEY, LAST_FM_URL } = process.env   //pulls api key and base url from env file using process.env

exports.searchSongs = async (req, res) => {         //defines and exports the function that handles a GET request from ym search route
  try {
    const { query } = req.query     //grabs the query parameter from the request URL
    const response = await axios.get(`${LAST_FM_URL}?method=track.search&track=${query}&api_key=${LAST_FM_API_KEY}&format=json`)     //makes a GET request to last fm using axios
    const tracks = response.data.results.trackmatches.track.map(track => ({  //after getting the response, this line starts mapping the results into a cleaner structure for my frontend
      title: track.name,      //keeps title
      artist: track.artist,   // keeps artist
      album: '',    //doesn't return
      cover: track.image?.[2]['#text'] || '',   // tries to grab album image and uses optional chaining in case the image is missing
    }))  //ends map function & tracks becomes an array of cleaned up results
    res.json(tracks)     //sends cleaned array back to the frontend in json format
  } catch (error) {    //catches any error and sends response
    res.status(500).json({ message: 'Error fetching data from external API', error: error.message })
  }
}





// method=track.search - tells the API you want to search songs
// track=${query} - passes the user’s search term
// api_key - includes your personal Last.fm key from .env
// format=json - asks for the data in JSON format


// From MDN: You can use optional chaining when attempting to call a method which may not exist. This can be helpful, for example, when using an API in which a method might be unavailable, either due to the age of the implementation or because of a feature which isn't available on the user's device.



//This function accepts search terms, calls last fm api for tracks, cleans the response and sends back track titles, artists, and cover art to my frontend