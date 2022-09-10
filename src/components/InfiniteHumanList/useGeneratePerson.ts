import { getUUID } from "../../utils/getUuid";

const generatePerson = (count: number) => {

    const humansList = [];

    for (let i = 0; i < count; i++) {
        const uuid = getUUID()
        humansList.push({
            name: `name-${uuid}`,
            surname: `surn-${uuid}`,
            mail: `user_${uuid}@gmail.com`
        })
    }
    return humansList;
}


export default generatePerson;