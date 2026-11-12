import { faker } from "@faker-js/faker";
import { Page, Locator } from "@playwright/test"; 


export class CheckoutPage {

    private readonly page: Page
    private readonly checkoutBtn: Locator
    private readonly fullNameTextBox: Locator
    private readonly emailTextBox: Locator
    private readonly streetAddressTextBox: Locator
    private readonly paymentInfoArea: Locator
    private readonly creditCardNumberTextBox: Locator
    private readonly cardExpiryTextBox: Locator
    private readonly cvcTextBox: Locator
    private readonly placeOrderSaveBtn: Locator

    constructor(page: Page){
        this.page = page
        this.checkoutBtn  = page.locator('button#checkout-btn')
        this.fullNameTextBox = page.locator('input#name')
        this.emailTextBox = page.locator('input#email')
        this.streetAddressTextBox = page.locator('input#address')

        this.paymentInfoArea = page.locator("//a[@href='#paymentInfo']")
        this.creditCardNumberTextBox = page.locator('input#card-number')
        this.cardExpiryTextBox = page.locator('input#card-expiry')
        this.cvcTextBox = page.locator('input#card-cvc')
        this.placeOrderSaveBtn = page.locator('button#place-order-btn')
    }

    async fillCheckOutInfo() {
        await this.fullNameTextBox.fill(faker.person.fullName())
        await this.emailTextBox.fill(faker.internet.email())
        await this.streetAddressTextBox.fill(faker.location.streetAddress())
    

    }
    async fillPaymentInfo(expiry: string) {
        //await this.paymentInfoArea.click()
        await this.creditCardNumberTextBox.fill(faker.finance.creditCardNumber())
        await this.cardExpiryTextBox.fill(expiry)
        await this.cvcTextBox.fill(faker.finance.creditCardCVV())
        //await this.placeOrderSaveBtn.click()

    }

}