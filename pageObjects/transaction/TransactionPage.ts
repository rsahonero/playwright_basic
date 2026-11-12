import { faker } from "@faker-js/faker"
import { Page, Locator } from "@playwright/test"

export class TransactionPage {
    private readonly transButton: Locator
    private readonly transDate: Locator
    private readonly transAmount: Locator
    private readonly transDescription: Locator
    private readonly saveTransButton: Locator
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
        this.transButton = page.getByRole('button', { name: 'Añadir transacción' })
        this.transDate = page.locator('input#date')
        this.transAmount = page.locator('input#amount')
        this.transDescription = page.locator('input#description')
        this.saveTransButton = page.getByRole('button', { name: 'Guardar' })
       
    }
    /*
    async fillTransDate() {
        const randomDate = faker.date.between({ from: '2023-01-01', to: '2024-12-31' }); //const randomDate = faker.date.anytime();
        const formattedDate = randomDate.toISOString().split('T')[0];
        await this.transDate.fill(formattedDate)
    }
    */
   
    async addTransaction(transationDate: string, transactionAmount: string, description: string) {
        await this.transButton.click()
        await this.transDate.fill(transationDate)
        await this.transAmount.fill(transactionAmount)
        await this.transDescription.fill(description)
        await this.saveTransButton.click()
    }

    async getActualAmount(row:string) {

        let actualAmountRow = this.page.locator(`#transactions-list tr:nth-child(${row}) > td:nth-child(2) `)
        return await actualAmountRow.textContent()
        //const actualDate = await page.locator('#transactions-list tr:first-child > td:first-child').textContent()
        //const actualDescription = await page.locator('#transactions-list tr:first-child > td:nth-child(3)').textContent()
    }

    async getActualDescription(row:string) {
        let actualDescriptionRow = this.page.locator(`#transactions-list tr:nth-child(${row}) > td:nth-child(3) `)
        return await actualDescriptionRow.textContent()
    }

    async getActualDate(row:string) {
        let actualDateRow = this.page.locator(`#transactions-list tr:nth-child(${row}) > td:nth-child(1) `)
        return await actualDateRow.textContent()
    }


}


