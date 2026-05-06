export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      {/* Mouse icon */}
      <div className="w-6 h-9 rounded-full border-2 border-white/50 flex justify-center pt-1.5">
        {/* Scroll wheel dot — animates downward */}
        <div
          className="w-1 h-1.5 rounded-full bg-white/50"
          style={{ animation: "scrollBounce 1.8s ease-in-out infinite" }}
        />
      </div>
      <p className="text-[10px] font-medium tracking-[3px] uppercase text-white/40">Scroll</p>
    </div>
  );
}
