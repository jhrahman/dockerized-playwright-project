import {Page, Expect, Locator} from '@playwright/test'

export class AddtoCart{

    readonly page: Page
    readonly addtocartButton: Locator
    readonly productAdded: Locator
    readonly continueShoppingButton: Locator
    readonly viewcartButton: Locator
    readonly addedProduct: Locator
    readonly proceedCheckout: Locator
    readonly loginRequired: Locator
    readonly continueOnCart: Locator
    readonly firstProduct: Locator
    readonly regOrlogin: Locator
    readonly cartNavButton: Locator
    readonly addressDetails: Locator
    readonly addressDelivery: Locator
    readonly addressInvoice: Locator
    readonly totalAmount: Locator
    readonly totalPrice:Locator
    readonly message: Locator
    readonly placeOrderButton: Locator
    readonly cardName: Locator
    readonly cardNumber: Locator
    readonly cvc: Locator
    readonly expriation: Locator
    readonly year: Locator
    readonly paynConfirm: Locator
    readonly orderPlaced: Locator
    readonly orderConfirmation: Locator
    readonly downloadInvoice: Locator


    constructor(page:Page){
        this.page = page
        this.firstProduct = page.locator('.product-image-wrapper')
        this.addtocartButton = page.locator("a[data-product-id='1']")
        this.productAdded = page.getByRole('heading', { name: 'Added!' })
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' })
        this.viewcartButton = page.getByRole('link', { name: 'View Cart' })
        this.addedProduct = page.locator("#product-1")
        this.proceedCheckout = page.locator("//a[normalize-space()='Proceed To Checkout']")
        this.loginRequired = page.locator("//p[normalize-space()='Register / Login account to proceed on checkout.']")
        this.continueOnCart = page.locator("//button[normalize-space()='Continue On Cart']")
        this.regOrlogin = page.locator("//u[normalize-space()='Register / Login']")
        this.cartNavButton = page.getByRole('link', { name: ' Cart' })
        this.addressDetails = page.locator("//h2[normalize-space()='Address Details']")
        this.addressDelivery = page.locator("#address_delivery")
        this.addressInvoice = page.locator("#address_invoice")
        this.totalAmount = page.locator("//h4//b")
        this.totalPrice = page.locator("(//*[@class='cart_total_price'])[2]")
        this.message = page.locator("//textarea[@name='message']")
        this.placeOrderButton = page.locator("//a[normalize-space()='Place Order']")
        this.cardName = page.locator("//input[@name='name_on_card']")
        this.cardNumber = page.locator("//input[@name='card_number']")
        this.cvc =page.locator("//*[@data-qa='cvc']")
        this.expriation = page.locator("//input[@placeholder='MM']")
        this.year = page.locator("//input[@placeholder='YYYY']")
        this.paynConfirm = page.locator("#submit")
        this.orderPlaced = page.locator("//b[normalize-space()='Order Placed!']")
        this.orderConfirmation = page.locator("(//p)[1]")
        this.downloadInvoice = page.locator("//a[normalize-space()='Download Invoice']")


    }

    async goto(){
        await this.page.goto('/products')
    }
    async addProduct(){
        // await this.firstProduct.first().hover()
        await this.addtocartButton.first().click()
    }
    async viewCart(){
        await this.viewcartButton.click()
    }
    async proceedToCheckout(){
        await this.proceedCheckout.click()
    }

    async loginOnCheckout(){
        await this.regOrlogin.click()
    }
    async loggedInCart(){
        await this.cartNavButton.click()
    }

    async loggedInCheckout(){
        await this.proceedCheckout.click()
    }
    async addComment(){
        await this.message.fill('Call me before coming!')
    }
    async placeOrder(){
        await this.placeOrderButton.click()
    }
    async payment(){
        await this.cardName.fill('QA Engineer')
        await this.cardNumber.fill('44444444444444')
        await this.cvc.fill('123')
        await this.expriation.fill('05')
        await this.year.fill('2035')
        await this.paynConfirm.click()
    }
}