import { test, expect } from '@playwright/test'
import { SignUpPage } from '../pages/SignUpPage'
import { generateRandomName, generateRandomEmail, generateRandomPassword } from '../utils/signupDataGenarator'
import { loginData } from '../test-data/loginData'
import { sign } from 'node:crypto'

test.describe.serial('SignUp Tests', async () => {


    test('SignUp as a new user', async ({ page }) => {
        const newName = generateRandomName()
        const newEmail = generateRandomEmail()
        const newPassword = generateRandomPassword()


        const signup = new SignUpPage(page)
        await signup.openLogin()
        await signup.signUp(newName, newEmail)
        await expect(signup.accountInformation).toBeVisible()
        await expect(signup.addressInformation).toBeVisible()
        await expect(signup.createAccountButton).toBeVisible()
        await signup.accountInfo(newPassword)
        await expect(signup.accountCreated).toHaveText('Account Created!')
        await expect(signup.continue).toBeVisible()
        await signup.continueHome()
        await signup.deleteCreatedUser()
        await expect(signup.loginButton).toBeVisible()
        await expect(signup.accountDeleted).toBeVisible()

    })

    test('SignUp with an existing user', async ({ page }) => {
        const signup = new SignUpPage(page)

        await signup.openLogin()
        await signup.signUpExistingUser(loginData[0].username)
        await expect(signup.existingUserMessage).toContainText('Email Address already exist!')

    })

})