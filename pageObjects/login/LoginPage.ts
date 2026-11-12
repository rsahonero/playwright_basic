import { Locator, Page } from "@playwright/test"

export class LoginPage {

    private readonly usernameTexbox: Locator
    private readonly passwordTexbox: Locator
    private readonly submitBtn: Locator
    
    constructor(page: Page){
        this.usernameTexbox = page.getByRole('textbox', { name: 'Nombre de usuario:' });
        this.passwordTexbox = page.locator('input#password');
        this.submitBtn = page.locator('button.btn-primary');
    }

    async fillUserName(username: string) {
        await this.usernameTexbox.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordTexbox.fill(password)
    }

    async clickOnLoginButton() {
        await this.submitBtn.click();
    }

    async doLogin(username: string, password:string){
        await this.fillUserName(username)
        await this.fillPassword(password)
        await this.clickOnLoginButton()
    }



}