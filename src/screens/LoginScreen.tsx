import { LoginForm } from "@/features/auth/components/LoginForm";

function LoginScreen() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{ backgroundImage: "url('/images/plano_de_fundo.svg')", filter: "blur(6px)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-[560px] mx-4">
        <div className="bg-white rounded-md shadow-2xl px-20 py-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export { LoginScreen };
