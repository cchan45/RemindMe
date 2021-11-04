// let Database = {
//     cindy: {
        // reminders: [
        //     {
        //         id: 1,
        //         title: 'abc',
        //         description: 'abcabc',
        //         completed: false
        //     }
        // ]
//     },
//     alex: {
//         reminders: []
//     }
// }

let Database = [
    {
        id: 1,
        name: "cindy",
        email: "cindy@gmail.com",
        password: "cindy123",
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
        name: "alex",
        remidners: []
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
  };

module.exports = { Database, userModel };