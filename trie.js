const data = require('./data');

class TrieNode {
    constructor(val) {
        this.val = [val];
        this.children = {};
    }
    addWord(word,id) {
        function build(i, word, trie) {
            if(i == word.length) {
                trie['end'] = true;
                return;
            }
            else {
                if(trie[word[i]] == undefined) {
                    trie[word[i]] = new TrieNode(id);
                    build(i+1, word, trie[word[i]].children);
                }
                else {
                    trie[word[i]].val.push(id);
                    build(i+1, word, trie[word[i]].children);
                }
            }
        }
        word = word.toLowerCase();
        build(0, word, this.children);
        return
    }
    search(word) {
        if(word == '') {
            return;
        }
        var results = [];
        function traverse(i, word, trie) {
            // console.log(trie);
            if (trie[word[i]] != undefined) {
                if(i+1 == word.length) {
                    results = trie[word[i]].val;
                }
                else {
                    traverse(i+1,word,trie[word[i]].children);
                }
            }
            else {
                
                return;
            }
            return;
        }
        word = word.toLowerCase();
        traverse(0,word,this.children);
        return results;
    }

}

movieTrie = new TrieNode('root');
tvTrie = new TrieNode('root');
// console.log(movieTrie);
var moviesArr = data.data.movies;
var tvArr = data.data.shows;

for(var i = 0; i < moviesArr.length; i++) {
    var title = moviesArr[i].title;
    var id = moviesArr[i]._id;
    movieTrie.addWord(title,id);
}
for(var i = 0; i < tvArr.length; i++) {
    var title = tvArr[i].title;
    var id = tvArr[i]._id;
    tvTrie.addWord(title,id);
}

module.exports.movie_trie = movieTrie;
module.exports.tv_trie = tvTrie;