import { Check, X } from "lucide-react";

const notThis = [
  "An AI theory book",
  "Written for tech teams",
  "A Complex Automation Manual",
  "Written for Developers",
  "Hard to understand"
];

const thisIs = [
  "A practical operating guide for business owners",
  "Focused on real workflows, not buzzwords",
  "Designed for Indian and Tamil business context",
  "Written in simple, actionable language",
];

export const WhatThisIs = () => {
  return (
    <section className="bg-background">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What This Playbook Is
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Not This */}
          <div className="bg-card rounded-2xl p-8 border border-border card-elevated">
            <h3 className="text-lg font-semibold text-muted-foreground mb-6 uppercase tracking-wide">
              This is NOT
            </h3>
            <ul className="space-y-4">
              {notThis.map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-lg text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* This Is */}
          <div className="bg-primary rounded-2xl p-8 card-elevated">
            <h3 className="text-lg font-semibold text-primary-foreground/80 mb-6 uppercase tracking-wide">
              This IS
            </h3>
            <ul className="space-y-4">
              {thisIs.map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <span className="text-lg text-primary-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 text-center text-xl font-semibold text-foreground">
          No coding. No complexity.
        </p>
      </div>
    </section>
  );
};
