let id = 0;

function getId() {
    return ++id;
}

let users = [
    {id: getId(), userName: "ACE", password: "*Flame" },
    {id: getId(), userName: "BONNIE", password: "+Love" },
    {id: getId(), userName: "CLYDE", password: "#Guns"},
]

module.exports = {
    async findAll() {
        let usersDisplay = [];
        users.map(user => {
            usersDisplay.push({ id: user.id, userName: user.userName });
        })
        return usersDisplay;
    },

    async create({ userName, password }){
        const newUser = { id: getId(), userName: userName.toUpperCase(), password };
        users.push(newUser);
        return newUser;
    },

    async validate({ userName, password }){
        const validUser = users.find(user => user.userName == userName);
        
        if(!validUser){
            return null
        } else if (validUser.password !== password) {
            return null
        } else {
            return validUser
        }
    }
}