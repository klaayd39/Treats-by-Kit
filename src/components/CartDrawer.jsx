import { useEffect } from "react"
import { X } from "lucide-react"
import Cart from "../pages/Cart"

export default function CartDrawer({ open, onClose, lines, subtotal, onQty, onRemove, onPlace }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
    }
  }, [open, onClose])

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open} inert={!open}>
      <button
        type="button"
        className={`absolute inset-0 bg-ink/35 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        aria-label="Close order"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 sm:max-w-[460px] landscape:min-[1024px]:max-w-[500px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-20 items-end justify-between px-6 pb-2 sm:px-8">
          <div>
            <p className="font-script text-2xl leading-none text-blue">Table side</p>
            <h2 className="font-serif text-4xl font-medium leading-none text-blue-deep">Your order</h2>
          </div>
          <button type="button" onClick={onClose} className="flex h-12 w-12 items-center justify-center rounded-full text-blue-deep" aria-label="Close order">
            <X size={18} />
          </button>
        </div>
        <Cart lines={lines} subtotal={subtotal} onQty={onQty} onRemove={onRemove} onPlace={onPlace} />
      </aside>
    </div>
  )
}
