import { categories } from "../data/menu"

export default function CategoryNav({ active, onChange }) {
  return (
    <nav aria-label="Menu categories" className="mx-auto w-full max-w-[90rem] px-4 sm:px-8 lg:px-12">
      <div className="no-scrollbar flex gap-1 overflow-x-auto">
        {categories.map((category) => {
          const selected = category.id === active
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              aria-pressed={selected}
              className={`h-12 shrink-0 border-b-2 px-3 font-serif text-xl leading-none transition sm:px-4 sm:text-[1.55rem] ${
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
