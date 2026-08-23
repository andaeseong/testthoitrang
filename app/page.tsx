import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Shop } from "@/components/shop";
import { Story } from "@/components/story";
import { Newsletter } from "@/components/newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Shop />
      <Story />
      <Newsletter />
    </main>
  );
}
