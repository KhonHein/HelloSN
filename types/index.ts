export interface BookType {
    id:number,
    title:string,
    content:string,
    imgUrl?:string,
}

export type MarkedDateType = {
    name: string;
    data: string;
    selected: boolean;
    marked: boolean; 
    height: number;
    selectedColor: string;
  };
  