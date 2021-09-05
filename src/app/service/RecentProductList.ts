export class RecentProductList {
    item_category: string;
    item_currency: string;
    item_discount_price: number;
    item_has_discount: string;
    item_id: number;
    item_image: string;
    item_name: string;
    item_order_id: string;
    item_original_price: number;
    item_rating: number;
    product_options_count: number;
    stem_store_id: number;
    stem_store_name: string;
    stem_deliverytime: number;

    constructor(item_category: string, item_currency: string,item_discount_price: number,item_has_discount: string,item_id: number
        ,item_image: string,item_name: string,item_order_id: string,item_original_price: number,item_rating: number,product_options_count: number
        ,stem_store_id: number,stem_store_name: string,stem_deliverytime: number) {
        this.item_category = item_category;
        this.item_currency = item_currency;
        this.item_discount_price = item_discount_price;
        this.item_has_discount =item_has_discount;
        this.item_id =item_id;
        this.item_image = item_image;
        this.item_name = item_name;
        this.item_order_id = item_order_id;
        this.item_original_price = item_original_price;
        this.item_rating = item_rating;
        this.product_options_count = product_options_count;
        this.stem_store_id = stem_store_id;
        this.stem_store_name = stem_store_name
        this.stem_deliverytime = stem_deliverytime
    }
    
}
