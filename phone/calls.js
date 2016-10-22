var self = module.exports = (function(){
    var calls = {};


    return {
        getCallerInfo: function(number){
            return calls[number];
        },
        addCallerInfo: function(number, data){
            calls[number] = data;
        },
        removeCaller: function(number){
            delete calls[number];
        }
    };
})();