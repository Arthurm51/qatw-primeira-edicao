import { test, expect } from '@playwright/test';

import { obterCodigo2FA } from '../support/db';

import { LoginPage } from '../pages/LoginPage';
import { DashPage } from '../pages/DashPage';

import { cleanJobs, getJob } from '../support/redis';


test('Tentativa de login com código de autenticação inválido', async ({ page }) => {


  const loginPage = new LoginPage(page)

  const user = {
    cpf: '00000014141',
    password: '147258'
  }

  await loginPage.acessaPagina()

  await loginPage.informaCpf(user.cpf)

  await loginPage.informaSenha(user.password)

  await page.getByRole('textbox', { name: '000000' }).fill('000000');
  await page.getByRole('button', { name: 'Verificar' }).click();
  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});


test('Acessar a conta do usuario', async ({ page }) => {

  const loginPage = new LoginPage(page)
  const dashPage = new DashPage(page)

  const user = {
    cpf: '00000014141',
    password: '147258'
  }

  await cleanJobs()

  await loginPage.acessaPagina()

  await loginPage.informaCpf(user.cpf)

  await loginPage.informaSenha(user.password)

  await page.getByRole('heading', {name: 'Verificação em duas etapas'})
    .waitFor({timeout: 3000})

  const codigo = await getJob()
  // const codigo = await obterCodigo2FA(user.cpf)

  await loginPage.obterCodigo2Fa(codigo)

  await expect(await dashPage.obterSaldo()).toHaveText('R$ 5.000,00')
});