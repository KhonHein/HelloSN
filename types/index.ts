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
  

  export type PostType = {
    id: number | string,
    title: string,
    content: string,
    assetUrl: string | null,
    published: number | boolean,
    authorId: number | boolean,
    created_at: any,
    updated_at: any,
    isArchived: number | boolean
    };