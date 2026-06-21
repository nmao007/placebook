import { createPlace } from "./actions";

export default function NewPlacePage() {
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
          action={createPlace}
          className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
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
              defaultValue="Saved"
              className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:ring-2 focus:ring-slate-400"
            >
              <option value="Saved">Saved</option>
              <option value="Visited">Visited</option>
            </select>
          </div>

          <button className="inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
            Save Place
          </button>
        </form>
      </div>
    </main>
  );
}
