import { Page, Locator, Expect } from "@playwright/test";

export class ProductPage{

    readonly page:Page
    readonly products: Locator
    readonly allProducts: Locator


    constructor(page:Page){
        this.page = page
        this.products = page.getByRole('link', { name: ' Products' })
        this.allProducts = page.locator("//*[@class='product-image-wrapper']//*[@alt='ecommerce website products']")
    }

    async openApp(){
        await this.page.goto('/products')
    }

}