import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";

type Place = {
  name: string;
  status: "Saved" | "Visited";
  notes: string;
};

type PlaceRow = {
  name: string;
  status: string;
  notes: string | null;
};

const filters = ["All", "Saved", "Visited"];

function normalizeStatus(status: string): Place["status"] {
  return status.toLowerCase() === "visited" ? "Visited" : "Saved";
}

export default async function AppDashboard() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = supabase
    ? await supabase.auth.getUser()
    : { data: { user: null } };

  const { data } = supabase && user
    ? await supabase
        .from("places")
        .select("name,status,notes")
        .eq("user_id", user.id)
        .order("name", { ascending: true })
    : { data: [] as PlaceRow[] };

  const places: Place[] = (data ?? []).map((place) => ({
    name: place.name,
    status: normalizeStatus(place.status),
    notes: place.notes ?? "",
  }));

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              Placebook
            </h1>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Save places you want to visit
            </p>
          </div>
          <Link
            href="/app/new"
            className="inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            + Add Place
          </Link>
        </header>

        <section className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <button
                key={filter}
                className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                  index === 0
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {places.map((place) => (
              <article
                key={place.name}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-semibold text-slate-950">
                    {place.name}
                  </h2>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                      place.status === "Visited"
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                        : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                    }`}
                  >
                    {place.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {place.notes}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
