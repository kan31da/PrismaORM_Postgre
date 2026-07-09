import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.student.createMany({
        data: [
            { firstName: 'Peter', lastName: 'Parker', email: 'peter.parker@example.com' },
            { firstName: 'Maria', lastName: 'Smith', email: 'maria.smith@example.com' }
        ],
    });

    await prisma.teacher.createMany({
        data: [
            { name: 'Class A' },
            { name: 'Class B' }
        ],
    });
}
main()
    .then(async () => { await prisma.$disconnect(); })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect(); process.exit(1);
    });
