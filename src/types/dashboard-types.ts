export interface IItem {
    key: number;
    title: string;
    price: string;
    description: string;
    image: string;
}

export interface IItemsState {
    [key: string]: IItem[];
}