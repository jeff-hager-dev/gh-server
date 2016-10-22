module.exports = {
 "Welcome": {
   "ID": "Welcome Question",
   "Text": "Welcome to Service St.Louis Help line. What can I help you with? Your options are Food, Transportation, Shelter",
   "Choices": [
     {"option": 1, "nextState": "Food"},
     {"option": 2, "nextState": "Transportation"},
     {"option": 3,  "nextState": "Shelter"}
   ]
 },
  "Food": {
    "ID": "Food Question",
    "Text": "These are your food options",
    "Choices": [
      {"option": 1, "nextState": "End"},
      {"option": 2, "nextState": "End"}
    ]
  },
  "Transport": {
    "ID": "Transport Question",
    "Text": "Do you need help with public transportation",
    "Choices": [
      {"option": "Free(1, food)", "nextState": "End"},
      {"option": "Discount(2, transport)", "nextState": "End"}
    ]
  },
  "Shelter": {
    "ID": "Shelter Question",
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