import { Cog, ArrowRight, Sparkles, BookOpen } from "lucide-react";

const principles = [
  "Real business use cases",
  "Practical workflows",
  "Execution, not exploration",
];

export const WhyItWorks = () => {
  return (
    <section className="bg-background overflow-hidden">
      <div className="section-container">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Why This Playbook Works
              </h2>

              <p className="text-xl text-muted-foreground mb-8">
                Most AI content talks about tools. This playbook focuses on <span className="text-accent font-semibold">systems</span>.
              </p>

              <div className="flex items-center gap-4 mb-8 p-4 bg-secondary rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Cog className="w-6 h-6" />
                  <span className="font-medium">Tools change.</span>
                </div>
                <ArrowRight className="w-5 h-5 text-accent" />
                <div className="flex items-center gap-2 text-accent font-semibold">
                  <Sparkles className="w-6 h-6" />
                  <span>Systems scale.</span>
                </div>
              </div>

              <p className="text-lg text-foreground mb-6">
                Everything inside is built around:
              </p>

              <ul className="space-y-3">
                {principles.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-lg">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl hero-gradient p-8 flex items-center justify-center relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 right-10 w-32 h-32 border border-primary-foreground rounded-full" />
                  <div className="absolute bottom-10 left-10 w-24 h-24 border border-primary-foreground rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-primary-foreground/50 rounded-full" />
                </div>

                <div className="text-center relative z-10">
                  <p className="text-6xl sm:text-7xl font-bold text-primary-foreground mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>60+</p>
                  <p className="text-xl text-primary-foreground/80" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Pages of Practical AI Systems</p>
                  <BookOpen className="w-24 h-24 text-accent mt-6 mx-auto drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
