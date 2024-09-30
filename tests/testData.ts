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
};

export const generateNewResPayload = () => {
    return {
        "Start": faker.date.soon({ days: 7 }).toISOString().split('T')[0],
        "End": faker.date.soon({ days: 15 }).toISOString().split('T')[0],
        "Client": faker.person.fullName(),
        "Room": faker.number.int({ min: 1, max: 10 }),
        "Bill": faker.number.int({ min: 1, max: 10 })

    }
}