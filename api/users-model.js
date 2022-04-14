let id = 0;

function getId() {
    return ++id;
}

let users = [
    {id: getId(), name: "Ace"},
    {id: getId(), name: "Bonnie"},
    {id: getId(), name: "Clyde"},
]

module.exports = {
    async findAll() {
        return users
    }
}