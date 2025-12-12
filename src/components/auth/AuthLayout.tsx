import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  linkLabel: string;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  linkText,
  linkHref,
  linkLabel,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex">
      <div className="hidden lg:flex w-1/2 bg-[#014635] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />

        <div className="z-10">
          <Image
            src="/logo2.png"
            alt="Logo Completa"
            width={200}
            height={60}
            className="object-contain w-40 md:w-52 h-auto"
            priority
          />
        </div>

        <div className="z-10 space-y-4 text-white/90 max-w-lg">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Domine suas finanças, transforme seu futuro.
          </h1>
          <p className="text-lg text-emerald-100/80">
            A plataforma completa para gerenciar seus ativos, acompanhar metas e
            evoluir seu patrimônio com inteligência.
          </p>
        </div>

        <div className="z-10 text-emerald-200/60 text-sm">
          © {new Date().getFullYear()} Finance App. Todos os direitos
          reservados.
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-gray-50/50">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {title}
            </h2>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>

          {children}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400">Ou</span>
            </div>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-500">{linkText} </span>
            <Link
              href={linkHref}
              className="font-semibold text-[#014635] hover:text-[#01332a] hover:underline transition-all"
            >
              {linkLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
