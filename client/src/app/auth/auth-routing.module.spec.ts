import { LoginRoutingModule } from './auth-routing.module';

describe('LoginRoutingModule', () => {
  let loginRoutingModule: LoginRoutingModule;

  beforeEach(() => {
    loginRoutingModule = new LoginRoutingModule();
  });

  it('should create an instance', () => {
    expect(loginRoutingModule).toBeTruthy();
  });
});
