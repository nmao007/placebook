import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { deletePlace } from "./actions";
import {
  type Category,
  type Status,
  normalizeCategory,
  normalizeStatus,
} from "./place-fields";

type Place = {
  id: string;
  name: string;
  status: Status;
  notes: string;
  country: string;
  category: Category;
  favorite: boolean;
};

type PlaceRow = {
  id: string;
  name: string;
  status: string | null;
  notes: string | null;
  country: string | null;
  category: string | null;
  favorite: boolean | null;
};

const filters = ["All", "Saved", "Visited"];

export default async function AppDashboard() {
  const supabase = await createSupabaseServerClient();

  const { data } = supabase
    ? await supabase
        .from("places")
        .select("id,name,status,notes,country,category,favorite")
        .order("name", { ascending: true })
    : { data: [] as PlaceRow[] };

  const places: Place[] = (data ?? []).map((place) => ({
    id: place.id,
    name: place.name,
    status: normalizeStatus(place.status),
    notes: place.notes ?? "",
    country: place.country ?? "",
    category: normalizeCategory(place.category),
    favorite: place.favorite ?? false,
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
                key={place.id}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-950">
                      {place.name}
                    </h2>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {[place.country, place.category].filter(Boolean).join(" - ")}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-start gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        place.status === "Visited"
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                          : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                      }`}
                    >
                      {place.status}
                    </span>
                    <details className="relative">
                      <summary
                        aria-label={`Options for ${place.name}`}
                        className="flex h-7 w-7 cursor-pointer list-none items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 [&::-webkit-details-marker]:hidden"
                      >
                        ...
                      </summary>
                      <div className="absolute right-0 z-10 mt-2 w-28 rounded-md border border-slate-200 bg-white p-1 shadow-sm">
                        <Link
                          href={`/app/${place.id}/edit`}
                          className="block rounded px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                        >
                          Edit
                        </Link>
                        <form action={deletePlace}>
                          <input type="hidden" name="id" value={place.id} />
                          <button className="w-full rounded px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950">
                            Remove
                          </button>
                        </form>
                      </div>
                    </details>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {place.notes}
                </p>
                {place.favorite ? (
                  <p className="mt-4 text-sm font-medium text-slate-500">
                    Favorite
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
