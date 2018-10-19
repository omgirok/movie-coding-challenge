const data = require('./data');
const trie = require('./trie');
// console.log(data.data.movies)

const movieArray = data.data.movies;
const tvArray = data.data.shows;
module.exports.findMovie = function(req, res) {    
    var id = req.params.id;
    // console.log(words.results[0])
    if(id < 1 || id > 100) {
        res.send({'error': 'Cound not find movie corresponding to id=' + id});
    }
    else {
        var item = movieArray[id-1];
        res.send(item);
    }
}

module.exports.findShow = function(req, res) {
    var id = req.params.id;
    if(id < 1 || id > 100) {
        res.send({'error': 'Cound not find movie corresponding to id=' + id});
    }
    else {
        var item = tvArray[id-1];
        res.send(item);
    }
}

module.exports.search = function(req, res) {
    console.log(req.query)
    var results;
    var searchString = req.query.query;
    var page = req.query.page || 1;
    if (searchString == undefined) {
        results = {"error": "please search using the '?query=${keywords}' query string syntax"};
        res.send(results);
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
        
        console.log(allResults.length)
        var totalPages = (Math.floor((allResults.length) / 10) + 1);
        if(page > totalPages) {
            res.send({"error": "page number " + page + " does not exist, results only go up to page " + totalPages + "."});
            return;
        }
        var thisPageResults = [];
        for(var i = page*10 - 10; i < page*10; i++) {
            if(allResults[i]) {
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
        console.log(results);
        res.send(results);
        return;
    }
    res.send();
}
