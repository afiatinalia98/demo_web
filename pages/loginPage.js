const {By, Key, until} = require("selenium-webdriver")
const assert = require("assert");
const HomePage = require("./homePage");

class LoginPage{
    constructor (driver){
        this.driver = driver;
        this.loginTextLink = By.css(".ico-login")
        this.emailField = By.id("Email")
        this.passwordField = By.id("Password")
        this.rememberCBox = By.id("RememberMe")
        this.loginBtn = By.css(".login-button")
        this.errorMsg = By.xpath("//span[.='Login was unsuccessful. Please correct the errors and try again.']")
    }

    async open(url){
        await this.driver.get(url)
    }

    async login(email, password){
        await this.driver.findElement(this.loginTextLink).click()
        await this.driver.findElement(this.emailField).sendKeys(email)
        await this.driver.findElement(this.passwordField).sendKeys(password)
        await this.driver.findElement(this.loginBtn).click()

        return new HomePage(this.driver)
    }

    async getErrorMesssage(){
        const errorText = await this.driver.wait(until.elementLocated(this.errorMsg), 100000)

        return await errorText.getText()
    }

    async failedLogin(expectedText, message){
        const asserError = await this.getErrorMesssage()

        assert.strictEqual(asserError.includes(expectedText), true, message)
    }

}

module.exports = LoginPage;