import User from "./UserType";

interface ItemType {
    "id": number,
    "owner": User,
    "collection": {
        "id": number
    }
    "name": string,
    "views": number,
    "value": number,
    "image": string
}

export default ItemType;