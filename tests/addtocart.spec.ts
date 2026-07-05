import { test, expect } from '@playwright/test'
import { AddtoCart } from '../pages/AddtoCart'
import { LoginPage } from '../pages/LoginPage'
import { loginData } from '../test-data/loginData'

test.describe('Add products to cart', async () => {


    test('Add Products to Cart Without Login', async ({ page }) => {
        const cart = new AddtoCart(page)

        await cart.goto()
        await cart.addProduct()
        await expect(cart.productAdded).toContainText('Added!')
        await expect(cart.continueShoppingButton).toBeVisible()
        await cart.viewCart()
        await expect(page).toHaveURL('/view_cart')
        await expect(cart.addedProduct).toBeVisible()
        await cart.proceedToCheckout()
        await expect(cart.loginRequired).toContainText('Register / Login account to proceed on checkout.')
        await expect(cart.continueOnCart).toBeVisible()


    })

    test('Add Products to Cart With Logged In User', async ({ page }) => {
        const cart = new AddtoCart(page)

        await cart.goto()
        await cart.addProduct()
        await expect(cart.productAdded).toContainText('Added!')
        await expect(cart.continueShoppingButton).toBeVisible()
        await cart.viewCart()
        await expect(page).toHaveURL('/view_cart')
        await expect(cart.addedProduct).toBeVisible()
        await cart.proceedToCheckout()
        await expect(cart.loginRequired).toContainText('Register / Login account to proceed on checkout.')
        await expect(cart.continueOnCart).toBeVisible()
        await cart.loginOnCheckout()
        //reuse login method from login page object class
        const login = new LoginPage(page)
        await login.loginMethod(loginData[0].username, loginData[0].password)
        await expect(page).toHaveURL('/')
        await cart.loggedInCart()
        await cart.loggedInCheckout()
        await expect(cart.addressDetails).toBeVisible()
        await expect(cart.addressDelivery).toBeVisible()
        await expect(cart.addressInvoice).toBeVisible()
        await expect(cart.totalAmount).toBeVisible()
        const priceText = await cart.totalPrice.textContent()
        console.log("Current Price: ", priceText)
        expect(priceText).not.toBeNull()
        await expect(cart.totalPrice).toHaveText(priceText!)
        await cart.addComment()
        await cart.placeOrder()
        await cart.payment()
        await expect(cart.orderPlaced).toContainText('Order Placed!')
        await expect(cart.orderConfirmation).toContainText('Congratulations! Your order has been confirmed!')
        await expect(cart.downloadInvoice).toBeVisible()


    })
})