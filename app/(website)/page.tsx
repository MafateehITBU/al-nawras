import { APP_DESCRIPTION, APP_NAME } from "@/constants";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <main className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
          {APP_NAME}
        </h1>
        <p className="mt-4 text-lg text-zinc-600">{APP_DESCRIPTION}</p>
        <p className="mt-8 text-sm text-zinc-500">
          Public website — Phase 7
        </p>
      </main>
    </div>
  );
}
