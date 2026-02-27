import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess, loginFailure } from "@/store/authSlice";
import { signInWithEmail } from "@/services/authApi";
import { signInSchema, type SignInData } from "@/features/auth/sign-in.schema";

export function useLogin() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignInData) =>
      signInWithEmail({ username: data.email, password: data.password }),
    onSuccess: (data) => {
      dispatch(loginSuccess(data));
      toast.success("Login realizado com sucesso!");
    },
    onError: () => {
      dispatch(
        loginFailure("Login e senha inválidos, verifique e tente novamente!")
      );
    },
  });

  const email = watch("email") ?? "";
  const password = watch("password") ?? "";
  const isFilled = email.trim().length > 0 && password.length > 0;

  return {
    register,
    onSubmit: handleSubmit((data) => mutate(data)),
    errors,
    isPending,
    isFilled,
  };
}
