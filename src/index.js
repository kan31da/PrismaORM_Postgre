import { prisma } from "./lib/prisma.js";


// const students = await prisma.student.findMany();

// console.log(students);

// const student = await prisma.student.create({
//     data: {
//         firstName: 'Peter',
//         lastName: 'Ivanov',
//         email: 'peter@mail.com',
//         age: 21,
//     },
// });

// console.log(student.id)


// const students2 = await prisma.student.findMany();

// console.log(students2);

// router.get('/', async (req, res) => {
//     try {
//         const students = await
//             prisma.student.findMany();
//         res.json(students);
//     } catch (e) {
//         next(e);
//     }
// });


// const teacher = await prisma.teacher.create({
//     data: {
//         name: 'John Doe',
//     }
// });


const students = await prisma.student.findMany();
const teacher = await prisma.teacher.findFirst();

await prisma.teacher.update({
    where: { id: teacher.id },
    data: {
        students: {
            connect: students.map(s => ({ id: s.id }))
        }
    }
});


const updatedTeacher = await prisma.teacher.findMany();
console.log(updatedTeacher);