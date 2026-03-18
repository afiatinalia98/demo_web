const {
    Builder,
    By,
    Key,
    until
} = require("selenium-webdriver")
const testData = require("../fixtures/testData.json")
const LoginPage = require("../pages/loginPage")
const HomePage = require("../pages/homePage")

async function LoginTest() {
    describe("Login Test Suite", function () {
        this.timeout(120000)
        let driver;
        let browserName = "chrome";
        let loginPage;
        let homePage;

        beforeEach(async function () {
            driver = await new Builder().forBrowser(browserName).build()
            loginPage = new LoginPage(driver);
            homePage = new HomePage(driver);

            await loginPage.open(testData.baseUrl)
        })

        it("Failed Login - doesnt input email", async function () {
            await loginPage.login("", testData.validLoginCred.password)

            await loginPage.failedLogin(testData.errorCredential, testData.validLogin)
        })

        it("Failed Login - doesnt input password", async function () {
            await loginPage.login(testData.validLoginCred.email, "")

            await loginPage.failedLogin(testData.errorCredential, testData.validLogin)
        })

        it("Failed Login - doesnt input all field", async function () {
            await loginPage.login("", "")

            await loginPage.failedLogin(testData.errorCredential, testData.validLogin)
        })

        it("Failed Login - Input invalid email", async function () {
            await loginPage.login(testData.invalidLoginEmail.email, testData.validLoginCred.password)

            await loginPage.failedLogin(testData.errorCredential, testData.validLogin)
        })

        it("Failed Login - Input invalid password", async function () {
            await loginPage.login(testData.validLoginCred.email, testData.invalidLoginPass.password)

            await loginPage.failedLogin(testData.errorCredential, testData.validLogin)
        })

        it("Success Login", async function () {
            await loginPage.login(testData.validLoginCred.email, testData.validLoginCred.password)

            await homePage.verifySuccessLogin(testData.assertLogin, testData.loginError)
        })


        afterEach(async function () {
            await driver.quit()
        })
    })


};

LoginTest()