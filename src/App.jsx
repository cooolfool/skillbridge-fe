


import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <header className="bg-white shadow-md p-4 rounded-2xl mb-6">
        <h1 className="text-3xl font-bold text-blue-600">SkillBridge</h1>
        <p className="text-sm text-gray-500">A platform for developers to learn, share, and grow together.</p>
      </header>

      <main className="grid gap-4">
        <section className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">Why SkillBridge?</h2>
          <p className="text-gray-600">
            SkillBridge connects developers who want to grow by helping each other through skill-sharing,
            mentorship, and real-world collaboration.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">How it works</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Create your skill profile</li>
            <li>Share and discover projects</li>
            <li>Request or offer mentorship</li>
          </ul>
        </section>
      </main>

      <footer className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SkillBridge. All rights reserved.
      </footer>
    </div>
  );
}

export default App;



