export interface IItem {
    _id: number;
    title: string;
    amount: string;
    description: string;
    gender: string;
    metalType: string;
    imageNames: File[];
    category: number;
  }

export interface IItemsState {
    [key: string]: IItem[];
}

export interface Category {
    id: string;
    name: string;
}