import { Locator, Page} from '@playwright/test'

export class RegistroPage {

    private readonly name: Locator
    private readonly lastName: Locator
    private readonly age: Locator
    private readonly country: Locator
    private readonly email: Locator
    private readonly gender: Locator
    private readonly workdayMonday: Locator
    private readonly workdayWednesday: Locator
    private readonly uploadDocument: Locator


    constructor(page: Page){
        this.name = page.locator('input#name')
        this.lastName = page.locator('input#last-name')
        this.age = page.locator('input#age')
        this.country = page.getByRole('combobox', {name: 'País:'})
        this.gender = page.locator('input#sex-f')
        this.email = page.locator('input#email')
        this.workdayMonday= page.getByLabel('Lunes')
        this.workdayWednesday = page.getByLabel('Miercoles')
        this.uploadDocument = page.getByRole('button', {name:'Foto de perfil:'})
    }

    async addRegistro(name: string, lastName: string, age: string, country: string, email: string) {
        await this.name.fill(name)
        await this.lastName.fill(lastName)
        await this.age.fill(age)
        await this.country.click()
        await this.country.selectOption(country)
        await this.gender.check()
        await this.email.fill(email)
        await this.workdayMonday.check()
        await this.workdayWednesday.check()
        await this.uploadDocument.setInputFiles('images/image.png')
        

    }
}


