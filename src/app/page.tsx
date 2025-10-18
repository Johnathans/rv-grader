import HeroSection from "@/components/HeroSection";
import RVCategories from "@/components/RVCategories";
import UpcomingEvents from "@/components/UpcomingEvents";
import BlogSection from "@/components/BlogSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <RVCategories />
      <UpcomingEvents />
      <BlogSection />
    </div>
  );
}
