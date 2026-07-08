import { prisma } from "./lib/prisma.js";


const students = await prisma.student.findMany();

console.log(students);

const student = await prisma.student.create({
    data: {
        firstName: 'Peter',
        lastName: 'Ivanov',
        email: 'peter@mail.com',
        age: 21,
    },
});

console.log(student.id)


const students2 = await prisma.student.findMany();

console.log(students2);

// router.get('/', async (req, res) => {
//     try {
//         const students = await
//             prisma.student.findMany();
//         res.json(students);
//     } catch (e) {
//         next(e);
//     }
// });