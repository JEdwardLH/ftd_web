export class BannerList {
   
    bannername: string;
    url: string;
    link: string;
    store_id: string;
    restaurant_name: string;
    

    constructor( bannername: string,url: string,store_id: string,link: string,restaurant_name: string,today_wking_time: string) {
        
        this.bannername = bannername;
        this.url =url;
        this.link =link;
        this.store_id = store_id;
        this.restaurant_name = restaurant_name;
     
    }
    
}
