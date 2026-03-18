const { By, until } = require("selenium-webdriver")
const assert = require("assert")

class HomePage{
    constructor (driver){
        this.driver = driver;
        this.emailTextLink = By.xpath("//a[.='stella.marine@gmail.com']")
        this.logoutBtn = By.id(".ico-logout")
    }

    async open(url){
        await this.driver.get(url)
    }

    async getEmailTextLink(){
        const email = await this.driver.wait(until.elementLocated(this.emailTextLink), 10000)

        return await email.getText()
    }

    async verifySuccessLogin(expectedText, message){
        const emailVisible = await this.getEmailTextLink();

        assert.strictEqual(emailVisible.includes(expectedText), true, message)
    }
}

module.exports = HomePage;