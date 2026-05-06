const features = [
  {
    id: "01",
    title: "Command & Control Systems",
    description:
      "Hardened C2 infrastructure engineered for contested environments. Redundant communications, low-latency data routing, and air-gapped deployment options.",
  },
  {
    id: "02",
    title: "ISR Integration",
    description:
      "End-to-end intelligence, surveillance, and reconnaissance pipelines. Fused sensor feeds, real-time analytics, and secure dissemination to authorized endpoints.",
  },
  {
    id: "03",
    title: "Cyber Defense",
    description:
      "Proactive threat detection and automated response for critical infrastructure. Zero-trust architecture, continuous monitoring, and incident response playbooks.",
  },
  {
    id: "04",
    title: "Secure Communications",
    description:
      "End-to-end encrypted voice, video, and data solutions compliant with NSA Suite B and CNSSP standards. Deployable in field, maritime, and fixed-site environments.",
  },
  {
    id: "05",
    title: "Logistics & Supply Chain",
    description:
      "Automated asset tracking and supply chain visibility platforms built for defense logistics. Real-time inventory, demand forecasting, and audit-ready reporting.",
  },
  {
    id: "06",
    title: "Training & Simulation",
    description:
      "High-fidelity simulation environments for mission rehearsal and operator training. Scenario-driven exercises with after-action review and performance analytics.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-slate-900 py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs tracking-widest uppercase text-sky-500 mb-3 font-medium">
              Core Capabilities
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-slate-100 tracking-tight">
              Technology across the{" "}
              <span className="font-semibold text-white">full mission spectrum.</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Our systems are field-tested, independently verified, and continuously
            updated against the current threat landscape.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-slate-900 p-8 hover:bg-slate-800/60 transition-colors duration-200 group"
            >
              <span className="text-xs font-mono text-slate-600 tracking-widest mb-4 block">
                {feature.id}
              </span>
              <h3 className="text-base font-semibold text-slate-100 mb-3 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
