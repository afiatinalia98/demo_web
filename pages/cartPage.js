const { By } = require ("selenium-webdriver")
const assert = require("assert")

class CartPage{
    constructor (driver){
        this.driver = driver;
        this.cartCBox = By.name("removefromcart")
        this.qty = By.css(".qty-input")
        this.countryDropDown = By.id("CountryId") 
        this.stateDropdown = By.id("StateProvinceId")
        this.tncCBox = By.id("termsofservice")
        this.checkoutBtn = By.id("checkout")
    }

    async open (url){
        await this.driver.get(url)
    }

    async successAddProduct(){
        await this.driver.findElement()
    }
}