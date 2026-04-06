import { useEffect, useState } from 'react'
import { ChevronDown, X } from 'lucide-react'

function FieldLabel({ children, required = false }) {
  return (
    <label className="mb-2 block text-[15px] font-medium text-slate-700">
      {children}
      {required ? <span className="text-red-500">*</span> : null}
    </label>
  )
}

function CreateKnowledgeModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    vectorStore: 'Qdrant',
    embeddingModel: 'text-embedding-ada-002',
  })
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (!open) {
      setForm({
        name: '',
        description: '',
        vectorStore: 'Qdrant',
        embeddingModel: 'text-embedding-ada-002',
      })
      setTouched(false)
    }
  }, [open])

  const isNameInvalid = touched && !form.name.trim()

  const handleSubmit = () => {
    setTouched(true)

    if (!form.name.trim()) return

    onCreate({
      name: form.name.trim(),
      description: form.description.trim(),
      vectorStore: form.vectorStore,
      embeddingModel: form.embeddingModel,
    })
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-40">
      <button
        aria-label="Close modal"
        type="button"
        className="absolute inset-0 bg-slate-900/45"
        onClick={onClose}
      />

      <section className="absolute inset-y-0 right-0 flex w-full max-w-[455px] flex-col border-l border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between px-5 pb-3 pt-5">
          <div>
            <h2 className="text-[32px] font-semibold leading-tight text-slate-800">Create New Knowledge Base</h2>
            <p className="mt-1 text-[16px] text-slate-500">
              Best for quick answers from documents, websites and text files.
            </p>
          </div>
          <button type="button" className="rounded-md p-1 text-slate-500 hover:bg-slate-100" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto px-5 pb-5">
          <div>
            <FieldLabel required>Name (Cannot be edited later)</FieldLabel>
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(event) => setForm((previous) => ({ ...previous, name: event.target.value }))}
              className={`h-12 w-full rounded-lg border px-3 text-[16px] outline-none placeholder:text-slate-400 focus:border-indigo-500 ${
                isNameInvalid ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {isNameInvalid ? <p className="mt-1 text-sm text-red-500">Name is required.</p> : null}
          </div>

          <div>
            <FieldLabel>Description</FieldLabel>
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(event) => setForm((previous) => ({ ...previous, description: event.target.value }))}
              className="h-24 w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-[16px] outline-none placeholder:text-slate-400 focus:border-indigo-500"
            />
          </div>

          <div>
            <FieldLabel required>Vector Store</FieldLabel>
            <div className="relative flex h-12 items-center justify-between rounded-lg border border-slate-200 px-3 text-[16px] text-slate-500">
              <select
                value={form.vectorStore}
                onChange={(event) => setForm((previous) => ({ ...previous, vectorStore: event.target.value }))}
                className="h-full w-full appearance-none bg-transparent pr-8 outline-none"
              >
                <option value="Qdrant">Qdrant</option>
                <option value="Pinecone">Pinecone</option>
                <option value="Weaviate">Weaviate</option>
              </select>
              <ChevronDown size={18} />
            </div>
          </div>

          <div>
            <FieldLabel required>LLM Embedding Model</FieldLabel>
            <div className="relative flex h-12 items-center justify-between rounded-lg border border-slate-200 px-3 text-[16px] text-slate-500">
              <select
                value={form.embeddingModel}
                onChange={(event) => setForm((previous) => ({ ...previous, embeddingModel: event.target.value }))}
                className="h-full w-full appearance-none bg-transparent pr-8 outline-none"
              >
                <option value="text-embedding-ada-002">text-embedding-ada-002</option>
                <option value="text-embedding-3-small">text-embedding-3-small</option>
                <option value="text-embedding-3-large">text-embedding-3-large</option>
              </select>
              <ChevronDown size={18} />
            </div>
          </div>
        </div>

        <div className="mt-auto border-t border-slate-200 px-5 py-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="ml-auto block rounded-xl bg-[#4F46E5] px-8 py-2.5 text-[18px] font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            Create
          </button>
        </div>
      </section>
    </div>
  )
}

export default CreateKnowledgeModal
