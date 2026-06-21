import Image from "next/image";

// Mock data structures for a clean, mapping lifecycle loop
const certifications = [
  "B.S. Computer Science",
  "AWS Cloud Practitioner",
  "Qt Advanced Specialist",
];
const frontends = ["React / Next.js", "Qt / QML", "Tailwind CSS", "TypeScript"];
const backends = ["C++20", "Node.js", "Go", "PostgreSQL"];
const projects = [
  {
    title: "Todo Cross-Platform App",
    desc: "A sleek modern architecture splitting a C++ backend with QML and React frontends.",
  },
  {
    title: "Generic Explorer Tree",
    desc: "A pure aggregate C++ structural tree model exposed elegantly to abstract item views.",
  },
];

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-neutral-950 text-neutral-200 selection:bg-teal-500 selection:text-black">
      {/* HEADER SECTION (Added z-50 to ensure it masks all sliding components) */}
      <header className="sticky top-0 z-50 w-full max-w-4xl h-16 mx-auto flex items-center justify-between px-6 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
        <span className="font-mono font-bold tracking-wider text-teal-400">
          RR.DEV
        </span>
        <a
          href="mailto:raul@example.com"
          className="text-sm px-4 py-1.5 rounded-full border border-neutral-700 hover:bg-neutral-800 transition-colors"
        >
          Get in Touch
        </a>
      </header>

      {/* BODY CONTEXT OVERVIEW */}
      <div className="w-full max-w-3xl mx-auto px-6 py-12 flex flex-col gap-12">
        {/* HERO / BIO SECTION */}
        <section className="w-full py-6 border border-neutral-800 bg-neutral-900/40 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6">
          <div className="relative bg-neutral-800 p-2 rounded-full border border-neutral-700">
            <Image
              className="rounded-full bg-neutral-900 object-contain p-1"
              alt="memoji"
              src="/memoji.png"
              height={80}
              width={80}
              priority
            />
          </div>
          <div className="flex flex-col text-center sm:text-left justify-center h-full gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Raul Ramirez
            </h1>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
              Software Engineer specializing in modular C++ system designs,
              high-performance UI layers (Qt/QML), and modern full-stack
              JavaScript ecosystems.
            </p>
          </div>
        </section>

        {/* SELECTED PROJECTS */}
        <section className="w-full flex flex-col gap-4">
          <h2 className="text-xs font-bold tracking-widest uppercase text-neutral-500 px-1">
            Selected Engineering Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="p-5 border border-neutral-800 bg-neutral-900/20 hover:border-neutral-700 rounded-xl transition-all group flex flex-col gap-2"
              >
                <h3 className="font-semibold text-white group-hover:text-teal-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {proj.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CERTS & DEGREES SECTION */}
        <section className="w-full flex flex-col gap-3">
          <h2 className="text-xs font-bold tracking-widest uppercase text-neutral-500 px-1">
            Certs & Degrees
          </h2>
          <div className="flex gap-3 w-full flex-wrap">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="px-4 py-2 text-xs font-medium border border-neutral-800 bg-neutral-900/50 rounded-lg text-neutral-300"
              >
                {cert}
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS BI-SECTION: FRONTENDS & BACKENDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <section className="w-full flex flex-col gap-3">
            <h2 className="text-xs font-bold tracking-widest uppercase text-neutral-500 px-1">
              Front Ends
            </h2>
            <div className="flex gap-2 w-full flex-wrap">
              {frontends.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-xs border border-neutral-800 rounded-md bg-neutral-900/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className="w-full flex flex-col gap-3">
            <h2 className="text-xs font-bold tracking-widest uppercase text-neutral-500 px-1">
              Backends
            </h2>
            <div className="flex gap-2 w-full flex-wrap">
              {backends.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-xs border border-neutral-800 rounded-md bg-neutral-900/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* FOOTER NOTATION */}
      <footer className="w-full max-w-3xl mx-auto px-6 pt-12 pb-16 text-center border-t border-neutral-900 text-xs text-neutral-600">
        &copy; {new Date().getFullYear()} Raul Ramirez. All rights reserved.
        Built cleanly using Next.js & Tailwind CSS.
      </footer>
    </main>
  );
}
