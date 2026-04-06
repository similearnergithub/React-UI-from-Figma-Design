import {
  BookOpenText,
  Bot,
  Boxes,
  BriefcaseBusiness,
  Building2,
  Library,
  LineChart,
  Monitor,
  MousePointerClick,
  Orbit,
  Rows2,
  ScrollText,
  Shield,
  SquareTerminal,
  Zap,
} from 'lucide-react'

const iconMap = {
  BookOpenText,
  Bot,
  Boxes,
  BriefcaseBusiness,
  Building2,
  Library,
  LineChart,
  Monitor,
  MousePointerClick,
  Orbit,
  Rows2,
  ScrollText,
  Shield,
  SquareTerminal,
  Zap,
}

function SidebarItem({ item }) {
  const Icon = iconMap[item.icon]

  return (
    <button
      type="button"
      className={`group flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-[16px] transition ${
        item.active
          ? 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-100'
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      {Icon ? <Icon size={18} strokeWidth={1.8} /> : null}
      <span className="font-medium">{item.label}</span>
    </button>
  )
}

function Sidebar({ sections }) {
  return (
    <aside className="hidden w-[250px] shrink-0 border-r border-slate-200 bg-white px-4 pb-8 pt-6 lg:block">
      <div className="space-y-5">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="mb-2 px-1 text-xs font-semibold tracking-wide text-slate-500">{section.title}</h2>
            <div className="space-y-1">
              {section.items.map((item) => (
                <SidebarItem key={item.label} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
