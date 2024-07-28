export const ADDRESS_REGEX = /^[\w\s ,&-.]+$/;
export const ALPHABET_REGEX = /^[a-zA-Z ]*$/;
export const CONTACT_NUMBER_REGEX = /^\d{7,15}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const ONLY_NUMBER_REGEX = /^\d*$/;
export const NO_SPACE_REGEX = /^\s/;
export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s_]).{8,16}$/;
export const LINK_REGEX = /(https?:\/\/[^\s]*\.com|www\.[^\s]*\.com|Findmyvenue\.com)/g;
