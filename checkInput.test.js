const checkInput = require('./Navigation');


global.alert = jest.fn();
global.alert = jest.fn();

describe('checkInput function', () =>{
  let usernameInput, passwordInput;

  beforeEach(() => {
    jest.clearAllMocks();
    usernameInput = { value: "" };
    passwordInput = { value: "" };
  });
  it('should alert when username or password is empty', () => {
    const mockEvent = { preventDefault: jest.fn() };
    checkInput(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith('EMPTY USERNAME AND/OR PASSWORD NOT ALLOWED');

  });
})
  