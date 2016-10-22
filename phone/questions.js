module.exports = [
    {
        "ID": "Welcome",
        "Text": "Menu: 1.Food, 2.Transportation, 3.Shelter",
        "Choices": [
            {"option": 1, "nextState": "Food"},
            {"option": 2, "nextState": "Transportation"},
            {"option": 3, "nextState": "Shelter"}
        ]
    },
    {
        "ID": "Food",
        "Text": "These are your food options: 1. EBT, 2. Soup Kitchen, 3. Grocery Assistance",
        "Choices": [
            {"option": 1, "nextState": "End"},
            {"option": 2, "nextState": "End"},
            {"option": 3, "nextState": "End"}
        ]
    },
    {
        "ID": "Transportation",
        "Text": "Transportation options: 1. Free, 2. Public",
        "Choices": [
            {"option": 1, "nextState": "End"},
            {"option": 2, "nextState": "End"}
        ]
    },
    {
        "ID": "Shelter",
        "Text": " What kind of help do you need for shelters",
        "Choices": [
            {"option": 1, "nextState": "End"},
            {"option": 2, "nextState": "End"}
        ]
    },
    {
        "ID": "End",
        "Text": "Thank you for calling the Service St.Louis Help line",
        "Choices": []
    }
];
