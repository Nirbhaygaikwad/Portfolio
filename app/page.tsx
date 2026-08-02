import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";
import { AuroraBackdrop, CursorGlow, ScrollProgress } from "@/components/site-chrome";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <AuroraBackdrop />
      <CursorGlow />
      <Nav />

      <main className="relative flex-1">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
