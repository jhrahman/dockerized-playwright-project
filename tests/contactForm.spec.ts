import {test,expect} from '@playwright/test'
import { ContactUsPage } from '../pages/ContactUsPage'

test('Contact From Test', async({page})=>{
    const contact = new ContactUsPage(page)

    await contact.goto()
    await contact.fillContactForm()
    const dialogMessage = await contact.submitFormAndAcceptAlert()
    await expect(dialogMessage).toContain('Press OK to proceed!')
    await expect(contact.contactSuccess).toHaveText('Success! Your details have been submitted successfully.')
    await expect(contact.continueHome).toBeVisible()
})