module.exports = [
    {
        "ID": "Welcome",
        "Text": "Menu: 1.Food, 2.Transportation, 3.Housing",
        "Type": "static",
        "Choices": [
            {"option": 1, "nextState": "Food"},
            {"option": 2, "nextState": "Transportation"},
            {"option": 3, "nextState": "Housing"}
        ]
    },
    {
        "ID": "Food",
        "Type": "static",
        "Text": "These are your food options: 1. E.B.T, 2. Soup Kitchen, 3. Grocery Assistance",
        "Choices": [
            {"option": 1, "nextState": "End"},
            {"option": 2, "nextState": "End"},
            {"option": 3, "nextState": "End"}
        ]
    },
    {
        "ID": "Transportation",
        "Type": "static",
        "Text": "Transportation options: 1. Free, 2. Public",
        "Choices": [
            {"option": 1, "nextState": "End"},
            {"option": 2, "nextState": "End"}
        ]
    },
    {
        "ID": "Housing",
        "Type": "static",
        "Text": " What kind of help do you need for housing: 1. Shelter, 2. Housing Assistance",
        "Choices": [
            {"option": 1, "nextState": "Shelter"},
            {"option": 2, "nextState": "HousingAssistance"}
        ]
    },
    {
      "ID": "Shelter",
      "Type": "dynamic",
      "Text": " What would  you like to know about Shelter",
      "nextState": "call",
      "Choices": [
      ]
    },
    {
      "ID": "HousingAssistance",
      "Type": "dynamic",
      "Text": " You need help with Housing Assistance what would you like to know",
      "nextState": "call",
      "Choices": [
          {"option": 1, "nextState": "call", "phoneNumber": 11231231234},
      ]
    },
    {
      "ID": "Call",
      "Type": "call",
      "nextState": "End"
    },
    {
        "ID": "End",
        "Type": "end",
        "Text": "Thank you for calling the Service St.Louis Help line"
    }
];
