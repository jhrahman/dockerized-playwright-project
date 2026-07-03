import {test,expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { loginData } from '../test-data/loginData'  

test('Logout User', async({page})=>{
    const logout = new LoginPage(page)
    await logout.goto()
    // use first set of credentials from the loginData array
    await logout.loginMethod(loginData[0].username, loginData[0].password)
    await expect(logout.logoutButton).toBeVisible()
    await logout.logoutMethod()
    await expect(logout.loginOrsignup).toBeVisible()

})