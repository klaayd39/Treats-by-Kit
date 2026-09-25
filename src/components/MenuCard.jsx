import { useState } from "react"
import { Plus, Check } from "lucide-react"
import { formatPrice, priceRange } from "../data/menu"

export default function MenuCard({ item, index, onOpen, onAdd }) {
  const [added, setAdded] = useState(false)
  const range = priceRange(item)

  function handleAdd(event) {
    event.stopPropagation()
    onAdd(item)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 900)
  }

  return (
    <article
      className="rise-in flex flex-col"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="group text-center"
        aria-label={`View ${item.name}`}
      >
        <div className="relative mx-auto aspect-[4/5] max-h-60 overflow-hidden rounded-3xl bg-blue-soft sm:max-h-80 sm:rounded-[1.75rem] min-[744px]:max-h-none max-lg:landscape:max-h-52">
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="px-2 pt-5">
          {item.tag && (
            <p className="text-[11px] uppercase tracking-[0.24em] text-blue">{item.tag}</p>
          )}
          <h3 className="mt-1 font-serif text-[1.65rem] font-medium leading-tight text-blue-deep sm:text-[2.05rem]">
            {item.name}
          </h3>
          <p className="mx-auto mt-2 line-clamp-2 max-w-[28ch] text-sm leading-relaxed text-muted">{item.description}</p>
        </div>
      </button>

      <div className="mt-4 flex flex-col items-center gap-3">
        <p className="font-serif text-2xl leading-none text-blue-deep tabular-nums">
          {range.from ? formatPrice(range.min) : formatPrice(item.price)}
        </p>
        <button
          type="button"
          onClick={handleAdd}
          className={`inline-flex h-11 min-w-11 items-center gap-1.5 rounded-full px-5 font-serif text-lg leading-none transition ${
            added ? "bg-blue-deep text-white" : "text-blue-deep hover:bg-blue-soft"
          }`}
          aria-label={`Add ${item.name} to order`}
        >
          {added ? <Check size={16} /> : <Plus size={16} />}
          {added ? "Added" : "Add"}
        </button>
      </div>
    </article>
  )
}
