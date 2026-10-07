import { Header } from "@/components/header";
import { AiSection } from "@/components/ai-section";
import { Closing, Deploy, Footer, Hero, Modules, Release, Services, Specify, Statement, Verify } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <Specify />
        <Verify />
        <Release />
        <AiSection />
        <Modules />
        <Deploy />
        <Services />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
