import { faker } from '@faker-js/faker';

export default async function examFactory() {
    return{
        name: faker.lorem.words(2),
        pdfUrl: faker.internet.url(),
        category: faker.lorem.word(),
        discipline: faker.lorem.word(),
        teacher: faker.lorem.word()
    }
};