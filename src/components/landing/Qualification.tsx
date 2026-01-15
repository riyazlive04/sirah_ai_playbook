import { CheckCircle2, X } from "lucide-react";

const qualifications = [
  "You already run a profitable business (₹5-15L/month)",
  "You operate a service business, clinic, showroom, or training institute",
  "You feel growth is slowing due to operations, follow-ups, or team dependency",
  "You want systems that scale - not more hustle",
];

export const Qualification = () => {
  return (
    <section id="qualification" className="bg-background">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Is This Playbook For You?
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            This playbook is built for business owners ready to scale smartly.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl p-8 sm:p-10 card-elevated border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              This playbook is for you if:
            </h3>

            <ul className="space-y-4">
              {qualifications.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 text-foreground"
                >
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-border flex items-start gap-4 text-muted-foreground">
              <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-base">
                <span className="font-medium">Note:</span> If you're just starting out, this may not be the right resource yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
