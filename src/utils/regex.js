export const regexList = {
  phone: /^[0-9]{10}$/,
  email: /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  emailAndPhone: /^(([\w-.]+@([\w-]+\.)+[\w-]{2,4})|(\d{10}))$/,
  url: /^(https?:\/\/)?([\da-z.-]+\.[a-z.]{2,6})([\/\w.-]*)*\/?$/,
  pinCode: /^[1-9][0-9]{5}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};