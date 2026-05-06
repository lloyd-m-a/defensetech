import Header from "@/components/Header";
import MissionNew from "@/components/MissionNew";
import Footer from "@/components/Footer";

// Original page preserved in components/Mission.tsx — swap import to revert

export default function MissionPage() {
  return (
    <>
      <Header />
      <main>
        <MissionNew />
      </main>
      <Footer />
    </>
  );
}
