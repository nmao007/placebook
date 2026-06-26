import { createSupabaseServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { updatePlace } from "./actions";
import {
  categories,
  statuses,
  normalizeCategory,
  normalizeStatus,
} from "../../place-fields";

type PlaceRow = {
  id: string;
  name: string;
  status: string | null;
  notes: string | null;
  country: string | null;
  category: string | null;
  favorite: boolean | null;
};

export default async function EditPlacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    notFound();
  }

  const { data } = await supabase
    .from("places")
    .select("id,name,status,notes,country,category,favorite")
    .eq("id", id)
    .single<PlaceRow>();

  if (!data) {
    notFound();
  }

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
        </header>

        <form
          action={updatePlace}
          className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <input type="hidden" name="id" value={data.id} />

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              defaultValue={data.name}
              className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-slate-700"
            >
              Country
            </label>
            <input
              id="country"
              name="country"
              defaultValue={data.country ?? ""}
              className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-slate-700"
            >
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              defaultValue={data.notes ?? ""}
              className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-950 outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-slate-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={normalizeStatus(data.status)}
              className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:ring-2 focus:ring-slate-400"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-slate-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={normalizeCategory(data.category)}
              className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:ring-2 focus:ring-slate-400"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input
              name="favorite"
              type="checkbox"
              defaultChecked={data.favorite ?? false}
              className="h-4 w-4 rounded border-slate-300"
            />
            Favorite
          </label>

          <button className="inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
            Save Place
          </button>
        </form>
      </div>
    </main>
  );
}
