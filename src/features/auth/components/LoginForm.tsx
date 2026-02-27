import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { usePatientMe } from "@/features/auth/hooks/usePatientMe";
import { useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { register, onSubmit, errors, isPending, isFilled } = useLogin();
  const { error: authError, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  const { data: patient, isLoading: isLoadingPatient } = usePatientMe();

  const hasError = !!authError;

  if (isAuthenticated) {
    return (
      <div className="text-center py-8 space-y-2">
        {isLoadingPatient ? (
          <p className="text-gray-500 text-sm">Carregando perfil...</p>
        ) : (
          <>
            <p className="text-[#1B3A6B] font-semibold text-lg">
              Bem-vindo{patient?.first_name ? `, ${patient.first_name}` : ""}!
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-0" noValidate>
      {/* Error banner */}
      {hasError && (
        <div className="flex items-center gap-2 bg-red-50 border-b border-red-200 text-red-700 rounded-t-md -mx-20 -mt-8 px-5 py-2.5 mb-5 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src="/images/logo_piaui.svg"
          alt="Governo do Piauí"
          className="h-[140px] object-contain"
        />
      </div>

      {/* E-mail | CPF field */}
      <div className="mb-6">
        <label
          htmlFor="login-email"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          E-mail | CPF
        </label>
        <input
          id="login-email"
          type="text"
          autoComplete="username"
          placeholder="Digite seu e-mail ou CPF"
          {...register("email")}
          className={cn(
            "w-full h-10 rounded-md border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors duration-150 outline-none",
            "focus:border-[#1B6FBF] focus:ring-2 focus:ring-[#1B6FBF]/20",
            errors.email || hasError
              ? "border-red-400"
              : "border-gray-300 hover:border-gray-400"
          )}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password field */}
      <div className="mb-2">
        <label
          htmlFor="login-password"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Senha
        </label>
        <div className="relative">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Digite sua senha"
            {...register("password")}
            className={cn(
              "w-full h-10 rounded-md border bg-white px-3 py-2 pr-10 text-sm text-gray-900 placeholder:text-gray-400 transition-colors duration-150 outline-none",
              "focus:border-[#1B6FBF] focus:ring-2 focus:ring-[#1B6FBF]/20",
              errors.password || hasError
                ? "border-red-400"
                : "border-gray-300 hover:border-gray-400"
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Esqueci minha senha */}
      <div className="flex justify-end mb-7">
        <button
          type="button"
          className="text-sm text-[#1B6FBF] hover:underline focus:outline-none"
        >
          Esqueci minha senha
        </button>
      </div>

      {/* Login button */}
      <button
        type="submit"
        disabled={!isFilled || isPending}
        className={cn(
          "w-full h-10 rounded-md text-sm font-semibold transition-colors duration-200 mb-6",
          isFilled && !isPending
            ? "bg-[#1B3A6B] hover:bg-[#152e55] text-white cursor-pointer"
            : "bg-gray-300 text-gray-400 cursor-not-allowed"
        )}
      >
        {isPending ? "Entrando..." : "Entrar"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-400">Ou</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* SignUp button */}
      <button
        type="button"
        className="w-full h-10 rounded-md border border-[#1B6FBF] text-[#1B6FBF] text-sm font-semibold bg-white hover:bg-[#1B6FBF]/5 transition-colors duration-200 mb-8"
      >
        Cadastre-se
      </button>

      {/* Version */}
      <p className="text-center text-xs text-gray-400">Versão {import.meta.env.VITE_APP_VERSION}</p>
    </form>
  );
}

export { LoginForm };
