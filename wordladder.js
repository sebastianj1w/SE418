var fs = require('fs');
/*
class: Wordladder
Implement the function of finding the shortest path in the dictionary
 */

/*
function: InitDict
parameter: dictPath the path of the json file you want to use as dictionary
Init the dictionary of a Wordladder
 */
function InitDict(dictPath){
    var data=fs.readFileSync(dictPath,'utf-8');
    return JSON.parse(data);
}

/*
function: WordLadder
parameter: dictPath the path of the json file you want to use as dictionary
Init Wordladder
 */
function WordLadder(path)
{
    this.dict = null;
    this.Input = null;
    this.Output = null;
    this._init(path);
}

/*
function: _init
parameter: dictPath the path of the json file you want to use as dictionary
Encapsulate the InitDict function
 */
WordLadder.prototype._init = function(path) {
    this.Input = "";
    this.Output = "";
    this.dict = InitDict(path);
}

/*
function: SetInput
parameter: the word user inputs
set the Input
 */
WordLadder.prototype.SetInput = function(input) {
    this.Input = input;
}

/*
function: SetOutput
parameter: the word user wants to output
set the Output
 */
WordLadder.prototype.SetOutput = function(output) {
    this.Output = output;
}

/*
function: GetInput
parameter:
return  the Input
 */
WordLadder.prototype.GetInput = function() {
    return this.Input;
}

/*
function: GetOutput
parameter:
get the output
 */
WordLadder.prototype.GetOutput = function() {
    return this.Output;
}

/*
function: Search
parameter: the word user input
search the word user inputs in the dictionary we set, return whether the word is in the dictionary
 */
WordLadder.prototype.Search = function(word) {
    let len = this.dict.length;
    for (let i = 0; i < len; ++i)
    {
        if (this.dict[i] === word)
        {
            return true;
        }
    }

    return false;
}

/*
function: BFS
parameter: the word user input
search the word user inputs in the dictionary we set, return whether the word is in the dictionary
 */
WordLadder.prototype.BFS = function() {
    let alphabet ="abcdefghijklmnopqrstuvwxyz";
    let SearchList = [];
    let searched = new Map();
    let init = {"word":this.GetInput(), "past":""};
    SearchList.push(init);
    while (SearchList.length !== 0)
    {
        let NowSearch = SearchList.shift();
        //change letter
        searched.set(NowSearch.word, NowSearch.past);
        let len = NowSearch.word.length;
        for (let i = 0; i < len; ++i)
        {
            for (let letter in alphabet)
            {
                let copy = new String();
                copy = copy.concat(NowSearch.word.substring(0,i),alphabet[letter],
                                                            NowSearch.word.substring(i+1));
                if (this.Search(copy) && !searched.has(copy))// has the word and hasn't been searched
                {
                    SearchList.push({"word":copy, "past":NowSearch.word});
                    searched.set(copy, NowSearch.word);
                    if (copy === this.GetOutput())// has get
                    {

                        let result = [];
                        result.push(copy)
                        let recursion = searched.get(copy);
                        while(recursion !== "")
                        {
                            result.push(recursion);
                            recursion = searched.get(recursion);
                        }
                        return result;
                    }
                }
            }
        }

    }
    return [""];
}

module.exports = WordLadder;

