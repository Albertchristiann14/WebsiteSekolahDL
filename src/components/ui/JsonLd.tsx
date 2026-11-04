import React from "react";

/**
 * Komponen Structured Data JSON-LD (SEO Schema.org)
 * Mendukung EducationalOrganization/School, Article, Event, BreadcrumbList, dan FAQPage.
 */
export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function buildSchoolJsonLd({
  name,
  url,
  description,
  phone,
  email,
  street,
}: {
  name: string;
  url: string;
  description: string;
  phone: string;
  email: string;
  street: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name,
    url,
    description,
    telephone: phone,
    email,
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: "Pekanbaru",
      addressRegion: "Riau",
      postalCode: "28292",
      addressCountry: "ID",
    },
    sameAs: [
      "https://instagram.com/dharmaloka_official",
      "https://facebook.com/sekolahdharmaloka",
      "https://youtube.com/@sekolahdharmalokapekanbaru",
    ],
  };
}

export function buildFaqJsonLd(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

