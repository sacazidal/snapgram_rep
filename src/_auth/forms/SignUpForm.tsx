import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SignUpValidation } from "@/lib/validation/Index";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";

const SignUpForm = () => {
  const { toast } = useToast();

  const {
    mutateAsync: createUserAccount,
    isLoading: isCreatingUser,
  } = useCreateUserAccount();

  const {
    mutateAsync: signInAccount,
    isLoading: isSignInAccount,
  } = useSignInAccount();

  // 1. Определите свою форму.
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Определите обработчик отправки.
  async function onSubmit(
    values: z.infer<typeof SignUpValidation>,
  ) {
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast({
        title:
          "Не удалось зарегистрироваться. Пожалуйста, попробуйте снова",
      });

      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) {
        return toast({
          title:
            "Не удалось зарегистрироваться. Пожалуйста, попробуйте снова",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col px-5 md:px-0">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-center">
          Создайте новую учетную запись
        </h2>
        <p className="text-light-3 small-medium md:base-regular text-center">
          Чтобы использовать Snapgram, введите данные своей
          учетной записи
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Логин</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="shad-button_primary"
          >
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                <Loader /> Загрузка...
              </div>
            ) : (
              "Регистрация"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            У вас уже есть учетная запись?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Войти
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUpForm;
