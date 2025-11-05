import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  let account: BankAccount;
  const initialBalance = 10000;

  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError when withdrawing more than balance', () => {
    const withdrawAmount = initialBalance + 100;
    const withdrawTooMuch = () => account.withdraw(withdrawAmount);

    expect(withdrawTooMuch).toThrow(InsufficientFundsError);
    expect(withdrawTooMuch).toThrow(
      `Insufficient funds: cannot withdraw more than ${account.getBalance()}`,
    );
  });

  test('should throw InsufficientFundsError when transferring more than balance', () => {
    const transferAmount = initialBalance + 100;
    const accountDestination = getBankAccount(0);
    const transferTooMuch = () =>
      account.transfer(transferAmount, accountDestination);

    expect(transferTooMuch).toThrow(InsufficientFundsError);
    expect(transferTooMuch).toThrow(
      `Insufficient funds: cannot withdraw more than ${account.getBalance()}`,
    );
  });

  test('should throw TransferFailedError when transferring to the same account', () => {
    const transferToSelf = () => account.transfer(initialBalance, account);

    expect(transferToSelf).toThrow(TransferFailedError);
    expect(transferToSelf).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const depositAmount = 5000;
    account.deposit(depositAmount);

    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const withdrawAmount = 500;
    account.withdraw(withdrawAmount);

    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const transferAmount = 1000;
    const accountDestination = getBankAccount(0);

    account.transfer(transferAmount, accountDestination);

    expect(account.getBalance()).toBe(initialBalance - transferAmount);
    expect(accountDestination.getBalance()).toBe(transferAmount);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const mockBalance = 500;
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(mockBalance);

    const balance = await account.fetchBalance();

    expect(balance).not.toBeNull();
    expect(typeof balance).toBe('number');
    expect(balance).toBe(mockBalance);
  });

  test('fetchBalance should return null if request failed', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);

    const balance = await account.fetchBalance();

    expect(balance).toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockBalance = 500;
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(mockBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(mockBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);

    const synchronizeCurrentBalance = () => account.synchronizeBalance();

    await expect(synchronizeCurrentBalance).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
