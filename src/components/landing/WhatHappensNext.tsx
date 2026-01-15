import { Download, BookOpen, ShieldCheck, Handshake } from "lucide-react";

const steps = [
  { icon: Download, number: "1", text: "You receive the 60-page AI Playbook instantly" },
  { icon: BookOpen, number: "2", text: "You can read and implement at your own pace" },
  { icon: ShieldCheck, number: "3", text: "No spam" },
  { icon: Handshake, number: "4", text: "No forced sales calls" },
];

export const WhatHappensNext = () => {
  return (
    <section className="bg-background">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Happens After Download
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-6 bg-card rounded-xl p-6 card-elevated border border-border"
              >
                <div className="w-14 h-14 rounded-full cta-gradient flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-2xl font-bold text-accent-foreground">{step.number}</span>
                </div>
                <div className="flex items-center gap-4 flex-1">
                  <step.icon className="w-6 h-6 text-accent flex-shrink-0" />
                  <p className="text-lg font-medium text-foreground">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-lg text-muted-foreground">
            If you want help implementing later, <span className="text-foreground font-medium">that choice is yours.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
