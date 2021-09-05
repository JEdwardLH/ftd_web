export class RestaurantList {
    delivery_duration: number;
    restaurant_category: string;
    restaurant_desc: string;
    restaurant_image: string;
    restaurant_logo: string;
    restaurant_name: string;
    today_wking_time: string;
    restaurant_id: number;
    restaurant_rate: string;
    restaurant_discount:string;
    restaurant_status:string
    restaurant_delivery_time:string


    constructor(delivery_duration: number, restaurant_category: string,restaurant_desc: string,restaurant_image: string,restaurant_logo: string,restaurant_name: string,today_wking_time: string,restaurant_id: number,restaurant_rate: string) {
        this.delivery_duration = delivery_duration;
        this.restaurant_category = restaurant_category;
        this.restaurant_desc = restaurant_desc;
        this.restaurant_image =restaurant_image;
        this.restaurant_logo =restaurant_logo;
        this.restaurant_name = restaurant_name;
        this.today_wking_time = today_wking_time;
        this.restaurant_id = restaurant_id;
        this.restaurant_rate = restaurant_rate;
    }

}
