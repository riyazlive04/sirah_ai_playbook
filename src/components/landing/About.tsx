import { Briefcase, Workflow, Zap } from "lucide-react";

const credentials = [
  { icon: Briefcase, text: "Real client problems" },
  { icon: Workflow, text: "Real workflows" },
  { icon: Zap, text: "Real execution experience" },
];

export const About = () => {
  return (
    <section className="bg-secondary">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About Sirah Digital
          </h2>

          <p className="text-xl text-muted-foreground mb-10">
            Sirah Digital works with growing businesses to implement AI, automation, and scalable systems.
          </p>

          <div className="bg-card rounded-2xl p-8 card-elevated border border-border">
            <p className="text-lg text-foreground mb-8">
              This playbook is built from:
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {credentials.map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-secondary px-5 py-3 rounded-full">
                  <item.icon className="w-5 h-5 text-accent" />
                  <span className="font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-10 text-xl text-accent font-semibold italic">
            It's free because informed founders make better decisions.
          </p>
        </div>
      </div>
    </section>
  );
};
