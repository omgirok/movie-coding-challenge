const data = require('./data');
const trie = require('./trie');

const movieArray = data.data.movies;
const tvArray = data.data.shows;

// functions corresponding to each route

module.exports.findMovie = function(req, res) {    
    var id = req.params.id;
    if (id < 1 || id > 100) {
        res.json({'error': 'Cound not find movie corresponding to id=' + id});
        res.end();
    }
    else {
        var item = movieArray[id-1];
        res.json(item);
        res.end();
    }
}

module.exports.findShow = function(req, res) {
    var id = req.params.id;
    if (id < 1 || id > 100) {
        res.json({'error': 'Cound not find movie corresponding to id=' + id});
        res.end();
    }
    else {
        var item = tvArray[id-1];
        res.json(item);
        res.end();
    }
}

module.exports.search = function(req, res) {
    console.log(req.query)
    var results;
    var searchString = req.query.query;
    var page = req.query.page || 1;
    // check if search string is valid
    if (searchString == undefined || searchString == '') {
        results = {"error": "please search using the '?query=${keywords}' query string syntax"};
        res.json(results);
        res.end();
        return
    }
    else {
        var movieTrie = trie.movie_trie;
        var tvTrie = trie.tv_trie;
        var movieResults = movieTrie.search(searchString);
        var tvResults = tvTrie.search(searchString);
        var allResults = [];
        for(var i = 0; i < movieResults.length; i++) {
            allResults.push(movieArray[movieResults[i]-1]);
        }
        for(var i = 0; i < tvResults.length; i++) {
            allResults.push(tvArray[tvResults[i]-1]);
        }
        var totalPages = (Math.floor((allResults.length) / 10) + 1);
        if (page > totalPages) {
            res.json({"error": "page number " + page + " does not exist, results only go up to page " + totalPages + "."});
            res.end();
            return;
        }
        var thisPageResults = [];
        for(var i = page*10 - 10; i < page*10; i++) {
            if (allResults[i]) {
                thisPageResults.push(allResults[i]);
            }
        }
        results = 
            { 
                "total_pages": totalPages,
                "total_results": (movieResults.length + tvResults.length),
                "page": page,
                "results": thisPageResults
            };
        // res.set('Content-Type', 'application/json');
        res.json(results);
        res.end();
        return;
    }
}
