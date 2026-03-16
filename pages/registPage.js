const { By, until } = require("selenium-webdriver")
const assert = require("assert")

class RegistPage{

    constructor(driver){
        this.driver = driver;

        this.registTextLink = By.css(".ico-register")
        this.genderFemale = By.id("gender-female")
        this.fnameField = By.id("FirstName")
        this.lnameField = By.id("LastName")
        this.email = By.id("Email")
        this.passField = By.id("Password")
        this.confirmPassField = By.id("ConfirmPassword")
        this.registBtn = By.id("register-button")

        this.registSuccessText = By.css(".result")
    }

    async open(url){
        await this.driver.get(url)
    }

    async successRegist(firstName,lastName,email,password,confirmPassword){

        await this.driver.findElement(this.registTextLink).click()
        await this.driver.findElement(this.genderFemale).click()

        await this.driver.findElement(this.fnameField).sendKeys(firstName)
        await this.driver.findElement(this.lnameField).sendKeys(lastName)
        await this.driver.findElement(this.email).sendKeys(email)
        await this.driver.findElement(this.passField).sendKeys(password)
        await this.driver.findElement(this.confirmPassField).sendKeys(confirmPassword)

        await this.driver.findElement(this.registBtn).click()

    }

    async getRegistSuccessText(){

        const element = await this.driver.wait(
            until.elementLocated(this.registSuccessText),
            10000
        )

        return await element.getText()
    }

    async verifySuccessRegist(expectedText,message){

        const successRegistText = await this.getRegistSuccessText()

        assert.strictEqual(
            successRegistText.includes(expectedText),
            true,
            message
        )

    }

}

module.exports = RegistPage