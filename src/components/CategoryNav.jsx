import { categories } from "../data/menu"

export default function CategoryNav({ active, onChange }) {
  return (
    <nav aria-label="Menu categories" className="px-5 sm:px-8 lg:px-12">
      <div className="no-scrollbar flex gap-1 overflow-x-auto">
        {categories.map((category) => {
          const selected = category.id === active
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              aria-pressed={selected}
              className={`h-12 shrink-0 border-b-2 px-3.5 font-serif text-[1.35rem] leading-none transition sm:px-4 sm:text-[1.55rem] ${
                selected
                  ? "border-blue-deep text-blue-deep"
                  : "border-transparent text-blue/80 hover:text-blue-deep"
              }`}
            >
              {category.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
