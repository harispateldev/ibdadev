import dynamic from "next/dynamic";

export const HeroCanvasDynamic = dynamic(
  () => import("./HeroCanvas").then((m) => ({ default: m.HeroCanvas })),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 55% 45%, rgba(215,180,106,0.18), transparent 38rem)",
        }}
      />
    ),
  }
);
