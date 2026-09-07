export interface SignupAccountInfo {
  title: 'Mr' | 'Mrs';
  password: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  subscribeNewsletter: boolean;
  receiveOffers: boolean;
}

export interface SignupAddressInfo {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export interface SignupData {
  accountInfo: SignupAccountInfo;
  addressInfo: SignupAddressInfo;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginTestData {
  invalidCredentials: LoginCredentials[];
}
