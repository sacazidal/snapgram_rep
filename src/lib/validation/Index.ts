import { z } from "zod";

export const SignUpValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Слишком короткое имя" })
    .max(18, {
      message: "Максимально допустимое количество букв: 18",
    }),
  username: z
    .string()
    .min(4, {
      message: "Логин должен содержать не менее 4 символов",
    })
    .max(26, {
      message:
        "Логин должен содержать не более 26 символов",
    }),
  email: z.string().email({
    message:
      "Пожалуйста, введите корректный адрес электронной почты. Убедитесь, что он содержит символ @ и домен, например, example@mail.com.",
  }),
  password: z.string().min(8, {
    message: "Пароль должен содержать не менее 8 символов",
  }),
});
