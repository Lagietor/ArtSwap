import UserType from "./UserType";

interface CollectionType {
    "id": number,
    "user": UserType,
    "name": string,
    "itemsCount": number,
    "floorPrice": number,
    "volume": number,
    "views": number,
    "image": string,
    "description": string
}

export default CollectionType;