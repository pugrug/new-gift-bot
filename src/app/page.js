import PersonSelector from './components/PersonSelector';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-red-600">
        Gift Bot 🎁
      </h1>
      <PersonSelector />
    </main>
  );
}