import { ShoppingBag } from "lucide-react"
import { brand } from "../data/menu"
import Logo from "./Logo"

export default function Header({ count, onCart }) {
  return (
    <header className="relative flex h-[4.5rem] items-center justify-between gap-4 px-5 sm:h-20 sm:px-8 lg:px-12">
      <div className="flex min-w-0 items-center gap-3">
        <Logo className="h-12 w-9 shrink-0 text-blue-deep" />
        <div className="min-w-0">
          <p className="truncate font-script text-[2rem] leading-none text-blue-deep sm:text-[2.35rem]">
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
