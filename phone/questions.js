module.exports = [
    {
        "ID": "Welcome",
        "Text": "Menu: 1.Food, 2.Transportation, 3.Housing",
        "Choices": [
            {"option": 1, "nextState": "Food"},
            {"option": 2, "nextState": "Transportation"},
            {"option": 3, "nextState": "Housing"}
        ]
    },
    {
        "ID": "Food",
        "Type": "Question",
        "Text": "These are your food options: 1. E.B.T, 2. Soup Kitchen, 3. Grocery Assistance",
        "Choices": [
            {"option": 1, "nextState": "End"},
            {"option": 2, "nextState": "End"},
            {"option": 3, "nextState": "End"}
        ]
    },
    {
        "ID": "Transportation",
        "Type": "Question",
        "Text": "Transportation options: 1. Free, 2. Public",
        "Choices": [
            {"option": 1, "nextState": "End"},
            {"option": 2, "nextState": "End"}
        ]
    },
    {
        "ID": "Housing",
        "Type": "Question",
        "Text": " What kind of help do you need for housing: 1. Shelter, 2. Housing Assistance",
        "Choices": [
            {"option": 1, "nextState": "Shelter"},
            {"option": 2, "nextState": "HousingAssistance"}
        ]
    },
    {
      "ID": "Shelter",
      "Type": "Process",
      "Text": " What would  you like to know about Shelter",
      "Choices": [
      ]
    },
    {
      "ID": "HousingAssistance",
      "Type": "Process",
      "Text": " You need help with Housing Assistance what would you like to know",
      "Choices": [
      ]
    },
    {
        "ID": "End",
        "Text": "Thank you for calling the Service St.Louis Help line",
        "Choices": []
    }
];
