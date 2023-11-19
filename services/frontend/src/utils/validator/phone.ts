import validatorIsPhone from 'validator/lib/isMobilePhone';
export const isPhone = (phone: string) => validatorIsPhone(phone);
