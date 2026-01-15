import { Hero } from "@/components/landing/Hero";
import { Qualification } from "@/components/landing/Qualification";
import { Problem } from "@/components/landing/Problem";
import { WhatThisIs } from "@/components/landing/WhatThisIs";
import { WhatYouLearn } from "@/components/landing/WhatYouLearn";
import { WhyItWorks } from "@/components/landing/WhyItWorks";
import { About } from "@/components/landing/About";
import { WhatHappensNext } from "@/components/landing/WhatHappensNext";
import { Footer } from "@/components/landing/Footer";
import { StickyBottomCTA } from "@/components/landing/StickyBottomCTA";

const Index = () => {
  return (
    <main className="overflow-x-hidden pb-[70px]">
      <Hero />
      <Qualification />
      <Problem />
      <WhatThisIs />
      <WhatYouLearn />
      <WhyItWorks />
      <About />
      <WhatHappensNext />
      <Footer />
      <StickyBottomCTA />
    </main>
  );
};

export default Index;
