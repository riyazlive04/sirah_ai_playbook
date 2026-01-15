import { AlertCircle, MessageSquare, Clock, Users, Workflow } from "lucide-react";

const painPoints = [
  { icon: Clock, text: "Missed or delayed follow-ups" },
  { icon: MessageSquare, text: "Too many WhatsApp messages to manage" },
  { icon: AlertCircle, text: "Owner involved in everything" },
  { icon: Users, text: "Team dependency for daily execution" },
  { icon: Workflow, text: "No clear system to scale consistently" },
];

export const Problem = () => {
  return (
    <section className="bg-secondary">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            At this stage of business, the real problem is not demand.
          </h2>
          <p className="text-xl text-muted-foreground">It's:</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 card-elevated border border-border flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                <point.icon className="w-6 h-6 text-accent" />
              </div>
              <p className="text-lg font-medium text-foreground">{point.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-xl text-foreground max-w-2xl mx-auto">
          <span className="font-semibold text-accent">AI can solve these problems</span> - but only when applied practically.
        </p>
      </div>
    </section>
  );
};
