
// const app = express();
const https = require('https');

const key = '35aa07dabda96881498828946aa65c1f';
const api_url = 'https://api.themoviedb.org/3/';


module.exports.findMovie = function(req, res) {
    var d;

    var param = req.params;
    
    var id = param.id;

    var queryString = api_url + 'movie/' + id + '?api_key=' + key;
    
    https.get(queryString, (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            // save api response to json object
            d = JSON.parse(data);
            console.log(d);
            if (d.status_code == 34) {
                console.log('Could not find movie title');
            }
            else {
                // unpack data into results
                var results = {'title': d.title, 'release_date': d.release_date, 'synopsis': d.overview, 'runtime': d.runtime + 'minutes', 'rating': d.vote_average};
                // send json object
                res.send(results);
            }
        });
      }).on("error", (err) => {
          console.log("Error: " + err.message);
    });
}

module.exports.findShow = function(req, res) {
    var d;
    var param = req.params;
    var id = param.id;

    var queryString = api_url + 'tv/' + id + '?api_key=' + key;
    https.get(queryString, (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            // save api response to json object
            d = JSON.parse(data);
            console.log(d);
            if (d.status_code == 34) {
                console.log('Could not find movie title');
            }
            else {
                // unpack data into results
                var results = {'title': d.name, 'release_date': d.first_air_date, 'end_date': d.last_air_date, 'synopsis': d.overview, 'rating': d.vote_average};
                // send json object
                res.send(results);
            }
        });
      }).on("error", (err) => {
          console.log("Error: " + err.message);
    });
}

module.exports.search = function(req, res) {
    var param = req.params;

    res.send();
}
