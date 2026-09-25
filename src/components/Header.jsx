import { ShoppingBag } from "lucide-react"
import { brand } from "../data/menu"
import Logo from "./Logo"

export default function Header({ count, onCart }) {
  return (
    <header className="relative flex h-16 items-center justify-between gap-3 px-4 sm:h-20 sm:gap-4 sm:px-8 lg:px-12">
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
        <Logo className="h-10 w-10 shrink-0 rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl" />
        <div className="min-w-0">
          <p className="truncate font-script text-[clamp(1.65rem,5.4vw,2.7rem)] font-semibold leading-[1.05] tracking-[0.01em] text-blue-deep">
            {brand.name}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onCart}
        className="relative flex h-12 min-w-12 items-center justify-center gap-2 rounded-full px-3 text-blue-deep transition hover:bg-blue-soft"
        aria-label={`Open order, ${count} ${count === 1 ? "item" : "items"}`}
      >
        <ShoppingBag size={22} strokeWidth={1.5} />
        <span className="min-w-4 font-serif text-xl leading-none tabular-nums" aria-hidden="true">
          {count}
        </span>
      </button>
    </header>
  )
}
