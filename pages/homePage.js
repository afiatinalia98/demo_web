const {
    By,
    until
} = require("selenium-webdriver")
const assert = require("assert")

class HomePage {
    constructor(driver) {
        this.driver = driver;
        this.emailTextLink = By.xpath("//a[.='stella.marine@gmail.com']")
        this.logoutBtn = By.id(".ico-logout")
        this.searchField = By.xpath("//input[@id='small-searchterms']")
        this.searchBtn = By.css(".search-box-button")
        this.item1 = By.xpath("//div[@class='product-grid']//a[.='Build your own expensive computer']")
        this.emptyItem = By.css(".result")
        this.addToCartItemBtn = By.xpath("//div[@class='product-grid']/div[3]//input[@class='button-2 product-box-add-to-cart-button']")
        this.categoryTab4 = By.xpath("//ul[@class='top-menu']//a[contains(.,'Apparel & Shoes')]") //ini kategori apparel & shoes
        this.addToCartBtnItem2 = By.xpath("//div[@class='product-grid']/div[3]//input[@class='button-2 product-box-add-to-cart-button']") // ini item celana jeans
        this.addToCartBtnItem3 = By.xpath("//div[@class='product-grid']/div[4]//input[@class='button-2 product-box-add-to-cart-button']") // ini item belt
        this.addToCartBtnItem4 = By.xpath("//div[7]//input[@class='button-2 product-box-add-to-cart-button']") // ini item tas
        this.popupSuccessAddProduct = By.css(".content") // ini popup notif sukses add to cart
        this.cartBtn = By.xpath("//li[@id='topcartlink']/a[@href='/cart']") //ini cart button yang diheader
        this.fastProcessor = By.xpath("//input[@value='82']")
        this.ram8 = By.xpath("//input[@value='85']")
        this.hdd400 = By.xpath("//input[@value='87']")
        this.otherOffice = By.xpath("//input[@value='90']")
        this.qtyField = By.css(".qty-input")
        this.addToCartBtn = By.css(".add-to-cart-button")
        this.popup = By.css(".content")
        // this.cartBtn = By.xpath("//span[.='Shopping cart']")
    }

    async open(url) {
        await this.driver.get(url)
    }

    async getEmailTextLink() {
        const email = await this.driver.wait(until.elementLocated(this.emailTextLink), 10000)

        return await email.getText()
    }

    async verifySuccessLogin(expectedText, message) {
        const emailVisible = await this.getEmailTextLink();

        assert.strictEqual(emailVisible.includes(expectedText), true, message)
    }

    async searchProduct(productName) {
        await this.driver.findElement(this.searchField).sendKeys(productName)
        await this.driver.findElement(this.searchBtn).click()
    }

    async getProductTitle() {
        const productTitle = await this.driver.wait(until.elementLocated(this.item1), 100000)

        return await productTitle.getText()
    }

    async verifySuccessSearch(expectedText, message) {
        const successSearch = await this.getProductTitle();

        assert.strictEqual(successSearch.includes(expectedText), true, message)
    }

    async getProductTitleInvalid() {
        const productTitle = await this.driver.wait(until.elementLocated(this.emptyItem), 100000)

        return await productTitle.getText()
    }

    async verifyEmptySearch(expectedText, message) {
        const emptySearch = await this.getProductTitle();

        assert.strictEqual(emptySearch.includes(expectedText), true, message)
    }

    async addToCartSingle(){
        await this.driver.findElement(this.categoryTab4).click()
        await this.driver.findElement(this.addToCartBtnItem2).click()
    }

    async addToCartMultiple(){
        await this.driver.findElement(this.categoryTab4).click()
        await this.driver.findElement(this.addToCartBtnItem2).click()
        await this.driver.findElement(this.addToCartBtnItem3).click()
    }

    async getSuccessAddProductText (){
        const popupText = await this.driver.wait(until.elementLocated(this.popupSuccessAddProduct), 100000)
        return await popupText.getText()
    }

    async verifySuccessAddToCart(expectedText, message){
        const successAddProduct = await this.getSuccessAddProductText()

        assert.strictEqual(successAddProduct.includes(expectedText), true, message)
    }
}

module.exports = HomePage;