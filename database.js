let Database = [
    {
        id: 1,
        name: 'cindy',
        email: 'cindy@gmail.com',
        password: 'cindy123',
        admin: true,
        ppic: 'https://images.unsplash.com/photo-1634883966638-ba2c79927cd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzU5Mjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzcwNDMxNDg&ixlib=rb-1.2.1&q=80&w=400',
        reminders: [
            {
                id: 1,
                title: 'abc',
                description: 'abcabc',
                completed: false
            }
        ]
    },
    {
        id: 2,
        name: 'alex',
        email: 'alex123@yahoo.com',
        password: 'Alex456!',
        admin: false,
        ppic: 'https://images.unsplash.com/photo-1634656658011-0af928be8607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzU5Mjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzcwNDMxNzk&ixlib=rb-1.2.1&q=80&w=400',
        reminders: [
            {
                id: 1,
                title: 'alex',
                description: 'reminder',
                completed: false
            }
        ]
    }
]

let userModel = {
    findOne: (email) => {
        const user = Database.find((user) => user.email === email);
        if (user) {
            return user;
        }
        throw new Error(`Couldn't find user with email: ${email}`);
    },
    findById: (id) => {
        const user = Database.find((user) => user.id === id);
        if (user) {
            return user;
        }
        throw new Error(`Couldn't find user with id: ${id}`);
    },
    //checks db for user by id
    checkById: (id) => {
        const user = Database.find((user) => user.id === id);
        return user != null
    },
};

module.exports = {
    Database,
    userModel
};