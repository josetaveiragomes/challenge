import LoginPage from '../page-objects/login.page';

class LoginBehaviour {

  login(username: string, password: string){
    LoginPage.inputLoginUsername.setValue(username);
    LoginPage.inputLoginPassword.setValue(password);
    LoginPage.inputLoginButton.click();
  }

}

export default new LoginBehaviour;