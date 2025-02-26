export class LoginPage{

    constructor(page){
        this.page = page
    }

    async acessaPagina(){
        await this.page.goto('http://paybank-mf-auth:3000/');
    }

    async informaCpf(cpf){
        await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf);
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async informaSenha(password){
         for (const numberPassword of password) {
            await this.page.getByRole('button', { name: numberPassword }).click();
          }
          await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async obterCodigo2Fa(codigo){
        await this.page.getByRole('textbox', { name: '000000' }).fill(codigo);
        await this.page.getByRole('button', { name: 'Verificar' }).click();
    }

    async obterSaldo(){
        return this.page.locator('#account-balance')

    }

}