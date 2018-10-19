const data = require('./data');

// console.log(data.data.movies)

module.exports.findMovie = function(req, res) {    
    var id = req.params.id;
    // console.log(words.results[0])
    if(id < 1 || id > 100) {
        res.send({'error': 'Cound not find movie corresponding to id=' + id});
    }
    else {
        var item = data.data.movies[id-1];
        res.send(item);
    }
}

module.exports.findShow = function(req, res) {
    var id = req.params.id;
    if(id < 1 || id > 100) {
        res.send({'error': 'Cound not find movie corresponding to id=' + id});
    }
    else {
        var item = data.data.shows[id-1];
        res.send(item);
    }
    // var queryString = api_url + 'tv/' + id + '?api_key=' + key;
    // https.get(queryString, (resp) => {
    //     let data = '';
    //     // A chunk of data has been recieved.
    //     resp.on('data', (chunk) => {
    //       data += chunk;
    //     });
    //     // The whole response has been received. Print out the result.
    //     resp.on('end', () => {
    //         // save api response to json object
    //         d = JSON.parse(data);
    //         console.log(d);
    //         if (d.status_code == 34) {
    //             var results = {'error': 'Could not find a TV show corresponding to id=' + id}
    //             res.send(results);
    //             console.log('Could not find TV show title');
    //         }
    //         else {
    //             // unpack data into results
    //             var results = {'title': d.name, 
    //                            'release_date': d.first_air_date, 
    //                            'end_date': d.last_air_date, 
    //                            'synopsis': d.overview, 
    //                            'rating': d.vote_average};
    //             // send json object
    //             res.send(results);
    //         }
    //     });
    //   }).on("error", (err) => {
    //       console.log("Error: " + err.message);
    // });
}

module.exports.search = function(req, res) {
    // console.log(req.query)
    var queryString = api_url + 'search/multi?api_key=' + key + '&query=' + req.query.query;
    // https.get(queryString, (resp) => {
    //     let data = '';
    //     // A chunk of data has been recieved.
    //     resp.on('data', (chunk) => {
    //       data += chunk;
    //     });
    //     // The whole response has been received. Print out the result.
    //     resp.on('end', () => {
    //         // save api response to json object
    //         d = JSON.parse(data);
    //         if (d.total_results == 0) {
    //             var results = {'error': 'Did not find any titles matching "' + req.query.query + '"'};
    //         }
    //         else {
    //             // unpack data into results
    //             var compressedResults = [];
    //             for(var i = 0; i < d.results.length; i++) {
    //                 let stuff = {
    //                     'id': d.results[i].id,
    //                     'title': d.results[i].title,
    //                     'media_type': d.results[i].media_type,
    //                     'release_date': d.results[i].release_date,
    //                     'synopsis': d.results[i].overview
    //                 };
    //                 compressedResults.push(stuff)
    //             }
    //             var results = {
    //                            'page': d.page,
    //                            'total_results': d.total_results,
    //                            'total_pages': d.total_pages,
    //                            'results': compressedResults
    //                           } 
    //             // send json object
    //             res.send(results);
    //         }
    //     });
    //   }).on("error", (err) => {
    //       console.log("Error: " + err.message);
    // });
}
