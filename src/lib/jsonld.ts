export function getKnowledgeGraph() {
  const baseUrl = "https://sonarch.tech";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "SONARCHTECH",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          "@id": `${baseUrl}/#logo`,
          url: `${baseUrl}/logo.png`,
          contentUrl: `${baseUrl}/logo.png`,
          caption: "SONARCHTECH Logo",
        },
        image: `${baseUrl}/logo.png`,
        description:
          "High-performance tech agency engineering full-stack web applications, autonomous revenue pipelines, and AI Engine Optimization (AEO) frameworks.",
        sameAs: [
          "https://github.com/sonarchtech",
          "https://x.com/sonarchtech",
          "https://linkedin.com/company/sonarchtech",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "contact@sonarch.tech",
          availableLanguage: ["English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "SONARCHTECH",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#service`,
        name: "SONARCHTECH Systems Architecture & Engineering",
        url: baseUrl,
        parentOrganization: {
          "@id": `${baseUrl}/#organization`,
        },
        priceRange: "$$$$",
        currenciesAccepted: "USD",
        paymentAccepted: "Credit Card, Wire Transfer, Crypto",
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Global",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Core Technical Capabilities",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Web Applications",
                description:
                  "Next.js App Router, TypeScript, and Supabase full-stack engineering with sub-second page performance.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Systems Design & Autonomous Pipelines",
                description:
                  "High-throughput webhook processing, edge database triggers, and CRM ingestion automation.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Engine Optimization (AEO)",
                description:
                  "Semantic JSON-LD entity graph structuring to secure citations across Perplexity, ChatGPT, and Google Gemini.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Lead Generation & Acquisition Funnels",
                description:
                  "Interactive discovery portals engineered for enterprise conversion lifts.",
              },
            },
          ],
        },
      },
    ],
  };
}