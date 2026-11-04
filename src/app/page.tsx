import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { SchoolPhilosophy } from "@/components/home/SchoolPhilosophy";
import { AcademicProgramsSection } from "@/components/home/AcademicProgramsSection";
import { WhyDharmaLoka } from "@/components/home/WhyDharmaLoka";
import { FacilitiesHighlight } from "@/components/home/FacilitiesHighlight";
import { AchievementsHighlight } from "@/components/home/AchievementsHighlight";
import { LatestNewsSection } from "@/components/home/LatestNewsSection";
import { AdmissionsCTA } from "@/components/home/AdmissionsCTA";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. School Introduction & Philosophy */}
      <SchoolPhilosophy />

      {/* 3. Academic Programs (TK, SD, SMP, SMA, SMK) */}
      <AcademicProgramsSection />

      {/* 4. Why Dharma Loka / Educational Advantages */}
      <WhyDharmaLoka />

      {/* 5. Facilities Showcase */}
      <FacilitiesHighlight />

      {/* 6. Student Achievements & Olympiad Recognition */}
      <AchievementsHighlight />

      {/* 7. Latest News & Announcements */}
      <LatestNewsSection />

      {/* 8. Admissions Call-To-Action */}
      <AdmissionsCTA />
    </>
  );
}

