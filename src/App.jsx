import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react'
import CreateKnowledgeModal from './components/CreateKnowledgeModal'
import KnowledgeCard from './components/KnowledgeCard'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import { knowledgeCards, sidebarSections } from './data/mockData'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const [cards, setCards] = useState(knowledgeCards)

  const filteredCards = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase()

    if (!normalizedTerm) return cards

    return cards.filter((card) => {
      return (
        card.title.toLowerCase().includes(normalizedTerm) ||
        card.description.toLowerCase().includes(normalizedTerm)
      )
    })
  }, [cards, searchTerm])

  const totalPages = Math.max(1, Math.ceil(filteredCards.length / rowsPerPage))

  const paginatedCards = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredCards.slice(start, start + rowsPerPage)
  }, [currentPage, filteredCards, rowsPerPage])

  const handleSearchChange = (value) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value))
    setCurrentPage(1)
  }

  const handleCreateKnowledgeBase = (payload) => {
    const now = new Date()
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`

    const newCard = {
      id: Date.now(),
      title: payload.name,
      description: payload.description || 'No description added yet.',
      createdOn: formattedDate,
    }

    setCards((previousCards) => [newCard, ...previousCards])
    setSearchTerm('')
    setCurrentPage(1)
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-100/65 text-slate-800">
      <TopBar />

      <div className="flex pt-14">
        <Sidebar sections={sidebarSections} />

        <main className="min-w-0 flex-1 p-4 sm:p-5 lg:p-6">
          <section className="rounded-xl border border-slate-200 bg-white px-4 py-4 sm:px-5 lg:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-3xl font-semibold text-slate-800">Knowledge Base</h1>

              <div className="ml-auto flex w-full max-w-[430px] flex-wrap justify-end gap-3 sm:w-auto sm:flex-nowrap">
                <div className="flex h-11 w-full items-center rounded-lg border border-slate-200 px-3 text-slate-500 sm:w-[220px]">
                  <Search size={18} className="mr-2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(event) => handleSearchChange(event.target.value)}
                    className="w-full border-none bg-transparent text-sm placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-5 text-base font-semibold text-white hover:bg-indigo-700"
                >
                  <Plus size={18} />
                  Create New
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 xl:grid-cols-3">
              {paginatedCards.map((card) => (
                <KnowledgeCard key={card.id} {...card} />
              ))}
            </div>

            {paginatedCards.length === 0 ? (
              <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center text-slate-500">
                No knowledge base entries found for your search.
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 px-1 pt-4 text-sm font-semibold text-slate-600">
              <span>{filteredCards.length} rows</span>

              <div className="ml-auto flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <span>Rows per page</span>
                  <select
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    className="rounded-md border border-slate-200 bg-white px-2 py-1 text-slate-500 outline-none"
                  >
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={9}>9</option>
                  </select>
                </div>
                <span>
                  page {Math.min(currentPage, totalPages)} of {totalPages}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((previous) => Math.max(1, previous - 1))}
                    disabled={currentPage === 1}
                    className="rounded-md border border-slate-200 p-1.5 text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((previous) => Math.min(totalPages, previous + 1))}
                    disabled={currentPage >= totalPages}
                    className="rounded-md border border-slate-200 p-1.5 text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <CreateKnowledgeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateKnowledgeBase}
      />
    </div>
  )
}

export default App
