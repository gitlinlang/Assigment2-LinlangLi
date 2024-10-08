import { faker } from "@faker-js/faker";

export const generateNewClientPayload = () => {
    return {
        "name": faker.person.fullName(),
        "email": faker.internet.email(),
        "telephone": faker.phone.number(),
    }
};

export const generateNewBillPayload = () => {
    return {
        "value": faker.number.int({ min: 1000, max: 3000 }),
        "paid": faker.datatype.boolean(),
    }
}