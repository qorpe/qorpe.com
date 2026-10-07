import { Announcement, Header } from "@/components/header";
import { Platform } from "@/components/platform";
import { AiIsland, BuildIsland, TrailIsland } from "@/components/dark";
import { Changelog, CtaBand, Footer, Hero, Modules, Quote, Ready, Scale, Sectors, Services, Strip } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Announcement />
      <Header />
      <main>
        <Hero />
        <Strip />
        <Platform />
        <Ready />
        <TrailIsland />
        <AiIsland />
        <BuildIsland />
        <Quote />
        <Scale />
        <Modules />
        <Sectors />
        <Services />
        <Changelog />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
