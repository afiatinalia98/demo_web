 const {
     Builder,
     By,
     Key,
     until
 } = require("selenium-webdriver");
 // const assert = require("assert");
 const testData = require("../fixtures/testData.json")
 const RegistPage = require("../pages/registPage")


 async function RegisterTest() {
     describe("Register Test Suite", function () {
         this.timeout(1200000);
         let driver;
         let browserName = "chrome";
         let registPage;

         before(async function () {
             driver = await new Builder().forBrowser(browserName).build();
             registPage = new RegistPage(driver);

             await registPage.open(testData.baseUrl)
         });
         it("Success regist", async function () {
             const randomEmail = `user${Date.now()}@test.com`
             await registPage.successRegist(testData.validRegistCred.firstName, testData.validRegistCred.lastName, randomEmail, testData.validRegistCred.password, testData.validRegistCred.confirmPass)

             //  const successText = await registPage.getRegistSuccessText();
             await registPage.verifySuccessRegist(testData.assertRegist, testData.registError)
         })

         after(async function () {
             await driver.quit()
         })
     })
 }

 RegisterTest()