const {
    Builder,
    By,
    Key,
    until
} = require("selenium-webdriver")
const assert = require("assert")
const chrome = require ("selenium-webdriver/chrome")
const testData = require("../fixtures/testData.json")
const LoginPage = require("../pages/loginPage")
const HomePage = require("../pages/homePage")

async function HomeTest() {

    

    describe("Homepage Test Suites", function () {
        let driver;
        this.timeout(120000)
        let browserName = "chrome";
        let loginPage;
        let homePage;

        beforeEach(async function () {

            let options = new chrome.Options();
            options.addArguments("--headless=new");

            driver = await new Builder().forBrowser(browserName).setChromeOptions(options).build();

            // driver = await new Builder().forBrowser(browserName).build()

            loginPage = new LoginPage(driver);
            homePage = new HomePage(driver);

            await loginPage.open(testData.baseUrl)
            await loginPage.login(testData.validLoginCred.email, testData.validLoginCred.password)
        })

        // it("Search Product Success", async function () {
        //     await homePage.searchProduct(testData.search.keyword1)

        //     //assertion
        //     await homePage.verifySuccessSearch(testData.productTitle.item1, testData.errorSearch)
        // })

        // it("Search Product Empty", async function () {
        //     await homePage.searchProduct(testData.search.invalidKeyword)

        //     //assertion
        //     await homePage.verifyEmptySearch(testData.productTitle.itemEmpty, testData.errorSearch)
        // })

        it("Adding single product to cart", async function(){
            await homePage.addToCartSingle()

            //assertion
            await homePage.verifySuccessAddToCart(testData.successAddToCart, testData.message.failedAddToCart)
        })

        it("Adding multiple product to cart", async function(){
            await homePage.addToCartMultiple()

            //assertion
            await homePage.verifySuccessAddToCart(testData.successAddToCart, testData.message.failedAddToCart)
        })

        afterEach(async function () {
            await driver.quit()
        })
    })
}

HomeTest();