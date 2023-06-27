import validatorIsEmail from 'validator/lib/isEmail';

export const isEmail = (email: string) => validatorIsEmail(email);
