import { Bell, ChevronDown, Command, Search } from 'lucide-react'

function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 h-14 border-b border-slate-700 bg-[#1E1B4B] px-3 md:px-6">
      <div className="mx-auto flex h-full max-w-[1480px] items-center gap-3">
        <div className="flex items-center gap-3 text-white">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/20 ring-1 ring-indigo-400/40">
            <div className="h-3 w-3 rounded-sm border-2 border-indigo-300" />
          </div>
          <span className="text-2xl font-semibold leading-none tracking-tight">Workspace</span>
        </div>

        <button
          type="button"
          className="hidden h-8 items-center gap-1 rounded-md bg-indigo-950/70 px-3 text-sm font-medium text-indigo-100 ring-1 ring-indigo-400/30 sm:inline-flex"
        >
          Workspace 1
          <ChevronDown size={16} />
        </button>

        <div className="mx-auto hidden h-8 w-full max-w-[420px] items-center gap-2 rounded-md bg-indigo-900/65 px-3 text-indigo-200 ring-1 ring-indigo-500/30 md:flex">
          <Search size={15} className="opacity-80" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-sm placeholder:text-indigo-300/80 focus:outline-none"
          />
          <span className="inline-flex items-center gap-1 text-xs text-indigo-300/90">
            <Command size={12} />K
          </span>
        </div>

        <div className="ml-auto flex items-center gap-3 text-indigo-100">
          <button type="button" className="rounded-full p-1.5 hover:bg-indigo-900/80">
            <Bell size={18} />
          </button>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-indigo-200 font-semibold text-indigo-900">
            GK
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopBar
