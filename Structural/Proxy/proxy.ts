interface IAuthProps {
  login(): void;
}

interface IUserPros extends IAuthProps {
  name: string;
  email: string;
  password: string;
}

class User implements IUserPros {

  constructor(public name: string, public email: string, public password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  login(): void {
    console.log("User login method.")
  }
}


class Proxyy {
  
  private user: User;

  users = [
    {
      name: 'Marco',
      email: 'marco@gmail.com',
      password: '123',
    },
    {
      name: 'Igor',
      email: 'igor@gmail.com',
      password: '123',
    },
  ];

  constructor(user: User) {
    this.user = user;
  }

  public login(): void {
    if (this.handleEmailValid(this.user.email)) {
        console.log(`Email ${this.user.email} is valid!`);

        setTimeout(() => {
          console.log(`Authenticating user...`)
        }, 1500);

        setTimeout(() => {
          this.auth(this.user.email, this.user.password);
        }, 3000);

    } else {
      throw new Error("Email not valid!")
    }
  }

  private handleEmailValid(email: string): boolean {
    const rgx: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return rgx.test(email);
  }

  private auth(email: string, password: string) {

    this.users.find((user) => {
      const isUser = user.email === email && user.password === password;

      if (isUser) {
        console.log('isUser: ', isUser);
        console.log('User authenticated! 🎉');
        console.log(`Usuário logado: ${JSON.stringify(user)}`);

        return
      }
      else {
        console.log('isUser: ', isUser);
        console.log('User not found! 😢');

        return
      }
    });

  }

}


// Client


const user1 = new User('Igor', 'igor@gmail.com', '123');
user1.login();

const proxy = new Proxyy(user1);
proxy.login();