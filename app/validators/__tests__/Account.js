import { validateEmail, validatePassword } from '../Account';

const VALID_EMAILS = [
  'email@example.com',
  'firstname.lastname@example.com',
  'email@subdomain.example.com',
  'firstname+lastname@example.com',
  '“email”@example.com',
  '1234567890@example.com',
  'email@example-one.com',
  '_______@example.com',
  'email@example.name',
  'email@example.museum',
  'email@example.co.jp',
  'firstname-lastname@example.com'
];
const INVALID_EMAILS = [
  'plainaddress',
  '#@%^%#$@#$@#.com',
  '@example.com',
  'Joe Smith <email@example.com>',
  'email.example.com',
  'email@example@example.com',
  '.email@example.com',
  'email.@example.com',
  'email..email@example.com',
  'email@example.com (Joe Smith)',
  'email@example',
  'email@-example.com',
  'email@example.web',
  'email@111.222.333.44444',
  'email@example..com',
  'Abc..123@example.com'
];

const VALID_PASSWORDS = ['223123jfgdhgdg', 'g 23 dqw', undefined];

describe('The account validation', () => {
  it.each(VALID_EMAILS)(`Should check email: %s is valid`, validEmail =>
    expect(validateEmail(validEmail)).toBe(undefined)
  );
  it.each(INVALID_EMAILS)(`Should check email: %s is invalid`, invalidEmail => {
    expect(validateEmail(invalidEmail)).not.toBe(undefined);
  });
  it.each(VALID_PASSWORDS)(`Should check password: %s valid`, validPassword => {
    expect(validatePassword(validPassword)).toBe(undefined);
  });
});
