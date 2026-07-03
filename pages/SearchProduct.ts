import {Page, Expect, Locator} from '@playwright/test'

export class SearchProduct{
    readonly page:Page
    readonly productsPage: Locator
    readonly allProducts: Locator
    readonly searchBox: Locator
    readonly submitSearch: Locator
    readonly seacheditem: Locator


    constructor(page:Page){
        this.page = page
        this.productsPage = page.locator("a[href='/products']")
        this.allProducts = page.locator("//*[@class='product-image-wrapper']//*[@class='single-products']")
        this.searchBox = page.locator("#search_product")
        this.submitSearch = page.locator("#submit_search")
        this.seacheditem = page.locator("//*[@class='single-products']//p[1]").nth(0)

    }

    async goto(){
        await this.page.goto('/products')
    }

    async searchMethod(item:string){
        await this.searchBox.fill(item)
        await this.submitSearch.click()
    }

}