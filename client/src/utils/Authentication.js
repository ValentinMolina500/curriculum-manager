class Authentication {
  isSignedIn = false;

  authStateObservers = [];

  signIn = (email, password) => {

    /* TODO: actually implement a login */
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.isSignedIn = true;
        this._notifyAuthObservers();
        resolve();
      }, 3000)
    })
  }

  onAuthStateChanged = (callback) => {
    this.authStateObservers.push(callback);
  }


  _notifyAuthObservers = () => {
    this.authStateObservers.forEach(callback => {
      callback(this.isSignedIn);
    })
  }
}

const instance = new Authentication();

export default instance;