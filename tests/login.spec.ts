import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { loginData } from '../test-data/loginData'


for (const user of loginData) {
    test(`Login Test - ${user.expected.type} - ${user.username || "empty"}`, async ({ page }) => {
        const login = new LoginPage(page)
        await login.goto()
        await login.loginMethod(user.username, user.password)

        switch (user.expected.type) {
            case "success":
                await expect(login.logoutButton).toBeVisible()
                break

            case "browserValidation":
                // isRequiredFieldMissing expects a literal "email" | "password" and returns a boolean
                expect(await (login.isRequiredFieldMissing(user.expected.field! as "email" | "password"))).toBe(true)
                break
            case "serverError":
                await expect(login.errorMessage).toContainText(user.expected.message!)
                break

        }
    })
}