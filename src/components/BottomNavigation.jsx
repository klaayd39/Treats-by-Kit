import { ShoppingBag, UtensilsCrossed } from "lucide-react"

export default function BottomNavigation({ view, count, onMenu, onCart }) {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line/80 bg-cream/95 px-4 py-2 backdrop-blur min-[744px]:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onMenu}
          className={`flex h-12 items-center justify-center gap-2 rounded-full text-sm ${view === "menu" ? "bg-blue-soft text-blue-deep" : "text-muted"}`}
          aria-current={view === "menu" ? "page" : undefined}
        >
          <UtensilsCrossed size={18} />
          Menu
        </button>
        <button
          type="button"
          onClick={onCart}
          className="flex h-12 items-center justify-center gap-2 rounded-full text-sm text-ink"
          aria-label={`Order, ${count} items`}
        >
          <ShoppingBag size={18} />
          Order
          <span className="tabular-nums text-blue-deep">{count}</span>
        </button>
      </div>
    </nav>
  )
}
