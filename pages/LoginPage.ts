import { Page, Expect, Locator } from '@playwright/test'

export class LoginPage {

    readonly page: Page
    readonly loginEmail: Locator
    readonly loginPassword: Locator
    readonly loginButton: Locator
    readonly logoutButton: Locator
    readonly errorMessage: Locator
    readonly loginOrsignup: Locator


    constructor(page: Page) {
        this.page = page
        this.loginOrsignup = page.locator("a[href='/login']")
        this.loginEmail = page.locator("//input[@data-qa='login-email']")
        this.loginPassword = page.locator("//input[@placeholder='Password']")
        this.loginButton = page.locator("//button[normalize-space()='Login']")
        this.logoutButton = page.locator("//a[normalize-space()='Logout']")
        this.errorMessage = page.locator("//p[normalize-space()='Your email or password is incorrect!']")

    }

    async goto() {
        await this.page.goto('/login')
    }
    async loginMethod(username: string, password: string) {
        await this.loginEmail.fill(username)
        await this.loginPassword.fill(password)
        await this.loginButton.click()
    }
    async isRequiredFieldMissing(field: "email" | "password"): Promise<boolean> {

        // Decide which input field to check.
        // If 'field' is "email", use the email textbox.
        // Otherwise, use the password textbox.
        const locator = field === "email" ? this.loginEmail : this.loginPassword;

        // Read the browser's built-in validation status for the selected field.
        // 'evaluate()' runs the code inside the browser on the actual HTML element.
        return locator.evaluate(
            (el) =>
                // Convert the generic HTML element into an HTMLInputElement
                // so we can access input-specific properties like 'validity'.
                (el as HTMLInputElement)

                    // 'validity' contains information about whether the input is valid.
                    // 'valueMissing' becomes true when a required field is left empty.
                    .validity.valueMissing
        )
    }
     async logoutMethod(){
          await this.logoutButton.click()  
    }
}