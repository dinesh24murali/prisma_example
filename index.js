const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    // insert a record
    await prisma.user.create({
        data: {
            name: 'John',
            email: 'john@example.com',
            posts: {
                create: { title: 'Hello World' },
            }
        },
    })
    // fetch all the user records
    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
        },
    })
    console.dir(allUsers, { depth: null })
    // fetch all the post records
    const allPosts = await prisma.post.findMany({
        include: {
            author: true,
        },
    })
    console.dir(allPosts, { depth: null })
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })