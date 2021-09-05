export class Foodtype {
    category_id: number;
    category_name: string;
    category_image: string;
    s3path: string;
    constructor(category_id: number, category_name: string, category_image: string, s3path: string) {
        this.category_id = category_id;
        this.category_name = category_name;
        this.category_image = category_image;
        this.s3path = s3path;
    }
}
