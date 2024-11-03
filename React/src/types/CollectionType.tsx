import UserType from "./UserType";

interface CollectionType {
    "id": number,
    "user": UserType,
    "name": string,
    "shortName": string,
    "itemsCount": number,
    "floorPrice": number,
    "volume": number,
    "views": number,
    "image": string,
    "description": string,
    "shortDescription": string
}

export default CollectionType;