import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import SearchOverlay from "@/components/layout/SearchOverlay";
import PromoBanner from "@/components/layout/PromoBanner";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-paper">
      <PromoBanner />
      <Header />
      <MobileNav />
      <SearchOverlay />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
