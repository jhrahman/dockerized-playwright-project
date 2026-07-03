import {Page, Locator, Expect, Dialog} from '@playwright/test'

export class ContactUsPage {
    readonly page: Page
    readonly contactName: Locator
    readonly contactEmail: Locator
    readonly contactSubject: Locator
    readonly contactMessage: Locator
    readonly contactUpload: Locator
    readonly contactSubmitButton: Locator
    readonly contactSuccess: Locator
    readonly continueHome: Locator


    constructor(page:Page){
        this.page = page
        this.contactName = page.getByRole('textbox', { name: 'Name' })
        this.contactEmail = page.getByRole('textbox', { name: 'Email', exact: true })
        this.contactSubject = page.getByRole('textbox', { name: 'Subject' })
        this.contactMessage = page.getByRole('textbox', { name: 'Your Message Here' })
        this.contactUpload = page.getByRole('button', { name: 'Choose File' })
        this.contactSubmitButton = page.getByRole('button', { name: 'Submit' })
        this.contactSuccess = page.locator("//div[@class='status alert alert-success']")
        this.continueHome = page.locator("//span[normalize-space()='Home']")
    }

    async goto(){
        await this.page.goto('/contact_us')
    }
    async fillContactForm(){
        await this.contactName.fill('test')
        await this.contactEmail.fill('test@example.com')
        await this.contactSubject.fill('test')
        await this.contactMessage.fill('testestest')
        await this.contactUpload.setInputFiles('./test-files/text.txt')
        
    }
    async submitFormAndAcceptAlert(){
        
        let dialogMessage = ''

        this.page.once('dialog', async(dialog:Dialog)=>{
            
            dialogMessage = dialog.message()
            await dialog.accept()
        })
        await this.contactSubmitButton.click()
        return dialogMessage
    }

}