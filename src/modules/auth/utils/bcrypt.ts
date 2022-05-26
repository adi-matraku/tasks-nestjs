import * as bcrypt from 'bcrypt';

export function comparePasswords(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
