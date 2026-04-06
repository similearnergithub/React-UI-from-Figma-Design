import { EllipsisVertical } from 'lucide-react'

function KnowledgeCard({ title, description, createdOn }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(2,6,23,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-[36px] font-semibold leading-tight text-slate-800 sm:text-[28px] md:text-[30px] lg:text-[32px] xl:text-[34px] 2xl:text-[36px]">
          {title}
        </h3>
        <button type="button" className="mt-1 rounded-md p-1 text-slate-500 hover:bg-slate-100">
          <EllipsisVertical size={20} />
        </button>
      </div>

      <p className="mt-4 min-h-[95px] max-w-[95%] text-lg leading-8 text-slate-600">{description}</p>

      <div className="mt-6 border-t border-slate-200 pt-4 text-lg font-medium text-slate-500">
        Created On: <span className="font-semibold text-slate-600">{createdOn}</span>
      </div>
    </article>
  )
}

export default KnowledgeCard
