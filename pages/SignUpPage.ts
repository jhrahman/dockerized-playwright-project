import { Page, Locator, Expect } from "@playwright/test";

export class SignUpPage{
    
    readonly page:Page 
    readonly signUpName: Locator
    readonly signUpEmail: Locator
    readonly signUpButton: Locator
    readonly mrRadioButton: Locator
    readonly passwordField: Locator
    readonly firstName: Locator
    readonly lastName: Locator
    readonly address: Locator
    readonly state: Locator
    readonly city: Locator
    readonly zipcode: Locator
    readonly mobilenumber: Locator
    readonly createAccount: Locator
    readonly accountInformation: Locator
    readonly addressInformation: Locator
    readonly createAccountButton: Locator
    readonly accountCreated: Locator
    readonly continue: Locator
    readonly deleteUser: Locator
    readonly loginButton: Locator
    readonly accountDeleted: Locator
    readonly existingUserMessage: Locator

    constructor(page:Page){
        this.page = page
        this.signUpName = page.getByRole('textbox', { name: 'Name' })
        this.signUpEmail = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address')
        this.signUpButton = page.getByRole('button', { name: 'Signup' })
        this.mrRadioButton = page.locator("label[for='id_gender1']")
        this.passwordField = page.locator("#password")
        this.firstName = page.locator("#first_name")
        this.lastName = page.locator("#last_name")
        this.address = page.locator("#address1")
        this.state = page.locator("#state")
        this.city = page.locator("#city")
        this.zipcode = page.locator("#zipcode")
        this.mobilenumber = page.locator("#mobile_number")
        this.createAccount = page.locator("button[data-qa='create-account']")
        this.accountInformation = page.locator("//b[normalize-space()='Enter Account Information']")
        this.addressInformation = page.locator("//b[normalize-space()='Address Information']")
        this.createAccountButton = page.locator("//button[normalize-space()='Create Account']")
        this.accountCreated = page.locator("//b[normalize-space()='Account Created!']")
        this.continue = page.locator("//a[normalize-space()='Continue']")
        this.deleteUser = page.locator("//a[normalize-space()='Delete Account']")
        this.loginButton = page.locator("a[href='/login']")
        this.accountDeleted = page.locator("//b[normalize-space()='Account Deleted!']")
        this.existingUserMessage = page.locator("//p[normalize-space()='Email Address already exist!']")

    }

    async openLogin(){
        await this.page.goto('/login')
    }
    async signUp(newName:string, newEmail:string){
        await this.signUpName.fill(newName)
        await this.signUpEmail.fill(newEmail)
        await this.signUpButton.click()
    }
    async accountInfo(newPassword:string){
        await this.mrRadioButton.click()
        await this.passwordField.fill(newPassword) 
        await this.firstName.fill("QA")
        await this.lastName.fill("Engineer")
        await this.address.fill("test")
        await this.state.fill("test")
        await this.city.fill("test")
        await this.zipcode.fill("1102")
        await this.mobilenumber.fill("1234")
        await this.createAccount.click()

    }
    async continueHome(){
        await this.continue.click()
    }
    async deleteCreatedUser(){
        await this.deleteUser.click()
    
    }
    async signUpExistingUser(username:string){
        await this.signUpName.fill("QA Engineer")
        await this.signUpEmail.fill(username)
        await this.signUpButton.click()

    }


    
}