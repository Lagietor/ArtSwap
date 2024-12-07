import User from "./UserType";

interface ItemType {
    "id": number,
    "tokenId": bigint,
    "owner": User,
    "collection": {
        "id": number
    }
    "name": string,
    "shortName": string,
    "views": number,
    "value": number,
    "image": string,
}

export default ItemType;