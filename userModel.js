const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

let userModel = {
    findOne: async (userEmail) => {
        const getUser = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        })
        if (getUser != null) {
            return getUser;
        }
        throw new Error(`Couldn't find user with email: ${userEmail}`);
    },
    findById: async (userId) => {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                reminders: true,
            },
        });
        if (user) {
            return user;
        }
        throw new Error(`Couldn't find user with id: ${id}`);
    },
    //checks db for user by id
    checkById: async (userId) => {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        return user
    },
};

module.exports = {
    userModel
};