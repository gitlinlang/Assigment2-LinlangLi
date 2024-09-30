import { faker } from "@faker-js/faker";

export const generateNewClientPayload = () => {
    return {
        "name": faker.person.fullName(),
        "email": faker.internet.email(),
        "telephone": faker.phone.number(),
    }
}