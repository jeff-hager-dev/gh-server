module.exports = {
 "Welcome": {
   "Text": "Welcome to Service St.Louis Help line. What can I help you with? Your options are Food, Transportation, Shelter",
   "Choices": [
     {"option": "food(1, food)", "nextState": "Food"},
     {"option": "transport(2, transport)", "nextState": "Transportation"},
     {"option": "shelter(3, shelter)",  "nextState": "Shelter"}
   ]
 }
};