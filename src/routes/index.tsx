import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  ShieldCheck,
  BadgeCheck,
  Users,
  MapPin,
  ArrowRight,
  Home,
  Eye,
  ThumbsUp,
  Star,
  MessageSquarePlus,
  Send,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrustCircle — Check PG & Hostel Trust Scores" },
      {
        name: "description",
        content:
          "TrustCircle helps students find safe PGs, hostels, and flatmates using verified TrustScores from real past residents.",
      },
      { property: "og:title", content: "TrustCircle — Check PG & Hostel Trust Scores" },
      {
        property: "og:description",
        content:
          "TrustCircle helps students find safe PGs, hostels, and flatmates using verified TrustScores from real past residents.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const mockListings = [
  {
    id: "1",
    name: "Sunrise PG",
    location: "Koramangala, Bangalore",
    trustScore: 88,
    safetyScore: 90,
    landlordScore: 86,
    reviews: 124,
  },
  {
    id: "2",
    name: "Scholar's Nest",
    location: "Indiranagar, Bangalore",
    trustScore: 72,
    safetyScore: 75,
    landlordScore: 70,
    reviews: 58,
  },
  {
    id: "3",
    name: "Metro Hostel",
    location: "Powai, Mumbai",
    trustScore: 45,
    safetyScore: 42,
    landlordScore: 48,
    reviews: 31,
  },
  {
    id: "4",
    name: "Campus Stay",
    location: "Vasant Kunj, Delhi",
    trustScore: 92,
    safetyScore: 94,
    landlordScore: 90,
    reviews: 210,
  },
  {
    id: "5",
    name: "Urban Rooms",
    location: "Hinjewadi, Pune",
    trustScore: 64,
    safetyScore: 68,
    landlordScore: 60,
    reviews: 43,
  },
];

function getScoreColor(score: number) {
  if (score >= 80) return "safe" as const;
  if (score >= 60) return "average" as const;
  return "risky" as const;
}

function scoreStyles(tier: "safe" | "average" | "risky") {
  switch (tier) {
    case "safe":
      return {
        text: "text-trust-safe",
        bg: "bg-trust-safe-bg",
        border: "border-trust-safe/20",
        ring: "ring-trust-safe/20",
        label: "Safe",
      };
    case "average":
      return {
        text: "text-trust-average",
        bg: "bg-trust-average-bg",
        border: "border-trust-average/20",
        ring: "ring-trust-average/20",
        label: "Average",
      };
    case "risky":
      return {
        text: "text-trust-risky",
        bg: "bg-trust-risky-bg",
        border: "border-trust-risky/20",
        ring: "ring-trust-risky/20",
        label: "Risky",
      };
  }
}

function Index() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const result = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return null;
    return (
      mockListings.find(
        (l) =>
          l.name.toLowerCase().includes(normalized) ||
          l.location.toLowerCase().includes(normalized)
      ) || null
    );
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  const scrollToSearch = () => {
    searchRef.current?.focus();
    searchRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="px-6 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <ShieldCheck className="h-4 w-4" />
            <span>Verified by real students</span>
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
            Find a place you can <span className="text-gradient-brand">trust</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
            TrustCircle shows verified TrustScores for PGs, hostels, and flatmates — based on real past residents, not brokers.
          </p>
          <button
            onClick={scrollToSearch}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full gradient-brand px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Check Trust Score
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Search / Trust Score Card */}
      <section className="px-6 pb-20" id="search">
        <div className="mx-auto max-w-xl">
          <form onSubmit={handleSearch} className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value.trim() === "") setSearched(false);
              }}
              placeholder="Search PG, hostel, or location..."
              className="h-14 w-full rounded-2xl border border-input bg-card pl-12 pr-32 text-foreground shadow-card outline-none ring-primary transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:ring-4"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
            >
              Search
            </button>
          </form>

          {searched && result && (
            <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-card">
              <div className="gradient-brand px-6 py-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-primary-foreground">{result.name}</h2>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-primary-foreground/80">
                      <MapPin className="h-4 w-4" />
                      {result.location}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/20 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
                    {result.reviews} verified reviews
                  </div>
                </div>
              </div>

              <div className="p-6">
                <ScoreRing score={result.trustScore} />

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <MiniScore label="Safety" score={result.safetyScore} icon={ShieldCheck} />
                  <MiniScore label="Landlord" score={result.landlordScore} icon={ThumbsUp} />
                </div>
              </div>
            </div>
          )}

          {searched && !result && query.trim() && (
            <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
              <p className="text-muted-foreground">
                No verified listing found. Try searching for{" "}
                <span className="font-medium text-foreground">Sunrise PG</span>,{" "}
                <span className="font-medium text-foreground">Scholar's Nest</span>, or{" "}
                <span className="font-medium text-foreground">Metro Hostel</span>.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Verified Resident Badge */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-2xl rounded-3xl border border-primary/10 bg-card p-8 text-center shadow-soft md:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <BadgeCheck className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
            Only verified past residents can rate.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            No fake reviews. No brokers. Only real students who actually lived there.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
              <Eye className="h-4 w-4 text-primary" />
              ID-verified residents
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
              <Users className="h-4 w-4 text-primary" />
              Real stay history
            </span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-foreground">
            How it works
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Step
              number={1}
              icon={Search}
              title="Search"
              description="Enter any PG or hostel name."
            />
            <Step
              number={2}
              icon={BadgeCheck}
              title="Check score"
              description="See verified TrustScores instantly."
            />
            <Step
              number={3}
              icon={Home}
              title="Decide"
              description="Choose a safer place to stay."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 text-center">
        <p className="text-sm text-muted-foreground">
          Built for students • Privacy First
        </p>
      </footer>
    </main>
  );
}

function ScoreRing({ score }: { score: number }) {
  const tier = getScoreColor(score);
  const styles = scoreStyles(tier);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-40 w-40 items-center justify-center">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            className="text-muted"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`${styles.text} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-foreground">{score}</span>
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            out of 100
          </span>
        </div>
      </div>
      <div
        className={`mt-4 inline-flex items-center gap-2 rounded-full border ${styles.border} ${styles.bg} px-4 py-1.5 text-sm font-semibold ${styles.text}`}
      >
        Overall Trust Score — {styles.label}
      </div>
    </div>
  );
}

function MiniScore({
  label,
  score,
  icon: Icon,
}: {
  label: string;
  score: number;
  icon: React.ElementType;
}) {
  const tier = getScoreColor(score);
  const styles = scoreStyles(tier);

  return (
    <div className={`rounded-2xl border ${styles.border} ${styles.bg} p-4`}>
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${styles.text}`} />
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      <div className={`mt-2 text-2xl font-bold ${styles.text}`}>{score}</div>
    </div>
  );
}

function Step({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft transition-shadow hover:shadow-card">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="mt-4 text-xs font-bold uppercase tracking-wider text-primary">
        Step {number}
      </div>
      <h3 className="mt-1 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
