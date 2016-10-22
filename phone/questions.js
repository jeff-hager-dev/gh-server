module.exports = {
 "Welcome": {
   "Text": "Welcome to Service St.Louis Help line. What can I help you with? Your options are Food, Transportation, Shelter",
   "Choices": [
     {"option": "food(1, food)", "nextState": "Food"},
     {"option": "transport(2, transport)", "nextState": "Transportation"},
     {"option": "shelter(3, shelter)",  "nextState": "Shelter"}
   ]
 },
  "Food": {
    "Text": "These are your food options",
    "Choices": [
      {"option": "Free(1, food)", "nextState": "End"},
      {"option": "Discount(2, transport)", "nextState": "End"}
    ]
  },
  "Transport": {
    "Text": "Do you need help with public transportation",
    "Choices": [
      {"option": "Free(1, food)", "nextState": "End"},
      {"option": "Discount(2, transport)", "nextState": "End"}
    ]
  },
  "Shelter": {
    "Text": " What kind of help do you need for shelters",
    "Choices": [
      {"option": "Free(1, food)", "nextState": "End"},
      {"option": "Discount(2, transport)", "nextState": "End"}
    ]
  },
  "End": {
    "Text": "Thank you for calling the Service St.Louis Help line",
    "Choices": []
  }
};