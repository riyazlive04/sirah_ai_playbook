import { Phone, MessageCircle, Video, BarChart3, Users2, Rocket } from "lucide-react";

const learnings = [
  { icon: Phone, text: "How to automate lead handling and missed calls" },
  { icon: MessageCircle, text: "How to use WhatsApp AI without sounding robotic" },
  { icon: Video, text: "How to generate ads, reels, and content using AI" },
  { icon: BarChart3, text: "How to automate follow-ups, quotations, and CRM" },
  { icon: Users2, text: "How to reduce team dependency using AI systems" },
  { icon: Rocket, text: "How to build a business that is ready for 2026" },
];

export const WhatYouLearn = () => {
  return (
    <section className="bg-secondary">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block mb-4 px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold">
            60-Page Playbook
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What You Will Learn
          </h2>
          <p className="text-lg text-muted-foreground">
            Inside this comprehensive guide, you'll discover:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {learnings.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 card-elevated border border-border group hover:border-accent/30 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all">
                <item.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <p className="text-lg font-medium text-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
