module.exports = [
    {
        "ID": "Welcome",
        "Text": "Welcome to Service St.Louis Help line. What can I help you with? Your options are Food, Transportation, Shelter",
        "Choices": [
            {"option": 1, "nextState": "Food"},
            {"option": 2, "nextState": "Transportation"},
            {"option": 3, "nextState": "Shelter"}
        ]
    },
    {
        "ID": "Food",
        "Text": "These are your food options",
        "Choices": [
            {"option": 1, "nextState": "End"},
            {"option": 2, "nextState": "End"}
        ]
    },
    {
        "ID": "Transport",
        "Text": "Do you need help with public transportation",
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