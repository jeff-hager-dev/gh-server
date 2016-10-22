var self = module.exports = (function(){
    var calls = {};


    return {
        getCaller: function(number){
            return calls[number];
        },
        addCaller: function(number, data){
            calls[number] = data;
        },
        removeCaller: function(number){
            delete calls[number];
        }
    };
})();