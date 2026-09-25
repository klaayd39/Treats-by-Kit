import { useEffect, useId, useMemo, useState } from "react"
import { Minus, Plus, X } from "lucide-react"
import { formatPrice } from "../data/menu"

export default function ProductModal({ item, onClose, onAdd }) {
  const titleId = useId()
  const notesId = useId()
  const [quantity, setQuantity] = useState(1)
  const [sizeId, setSizeId] = useState(item.sizes?.[0]?.id ?? "")
  const [addonIds, setAddonIds] = useState([])
  const [notes, setNotes] = useState("")

  const size = item.sizes?.find((option) => option.id === sizeId) ?? null
  const addons = (item.addons ?? []).filter((addon) => addonIds.includes(addon.id))

  const total = useMemo(() => {
    const unit = (size?.price ?? item.price) + addons.reduce((sum, addon) => sum + addon.price, 0)
    return unit * quantity
  }, [addons, item.price, quantity, size])

  useEffect(() => {
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
  }, [onClose])

  function toggleAddon(id) {
    setAddonIds((current) => (current.includes(id) ? current.filter((value) => value !== id) : [...current, id]))
  }

  function submit() {
    onAdd(item, { size, addons, notes, quantity })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button type="button" className="backdrop-in absolute inset-0 bg-ink/40" aria-label="Close details" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="modal-in relative flex max-h-[100dvh] w-full flex-col overflow-hidden bg-cream shadow-[0_24px_80px_-32px_rgba(58,69,80,0.45)] sm:max-h-[min(880px,92dvh)] sm:max-w-3xl sm:rounded-[1.75rem] landscape:min-[1024px]:max-w-5xl landscape:min-[1024px]:grid landscape:min-[1024px]:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="relative h-64 shrink-0 bg-blue-soft sm:h-80 landscape:min-[1024px]:h-auto">
          <img src={item.image} alt="" className="h-full w-full object-cover landscape:min-[1024px]:absolute landscape:min-[1024px]:inset-0" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-paper/95 text-ink shadow-sm"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
            {item.tag && <p className="text-[11px] uppercase tracking-[0.24em] text-blue">{item.tag}</p>}
            <h2 id={titleId} className="mt-1 font-serif text-4xl font-medium leading-none text-blue-deep sm:text-5xl">
              {item.name}
            </h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted sm:text-base">{item.description}</p>
            <p className="mt-4 font-serif text-3xl leading-none text-blue-deep tabular-nums">{formatPrice(size?.price ?? item.price)}</p>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Quantity</p>
              <div className="mt-2 inline-flex items-center gap-3">
                <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full text-blue-deep ring-1 ring-blue/40" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
                  <Minus size={16} />
                </button>
                <span className="qty-pop w-8 text-center font-serif text-2xl leading-none tabular-nums" key={quantity}>{quantity}</span>
                <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full text-blue-deep ring-1 ring-blue/40" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {item.sizes?.length > 0 && (
              <fieldset className="mt-6">
                <legend className="text-xs uppercase tracking-[0.18em] text-muted">Size</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.sizes.map((option) => {
                    const selected = option.id === sizeId
                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setSizeId(option.id)}
                        className={`h-12 rounded-full px-4 font-serif text-lg leading-none transition ${selected ? "bg-blue-deep text-white" : "text-blue-deep ring-1 ring-blue/35"}`}
                      >
                        {option.label} · {formatPrice(option.price)}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            )}

            {item.addons?.length > 0 && (
              <fieldset className="mt-6">
                <legend className="text-xs uppercase tracking-[0.18em] text-muted">Add-ons</legend>
                <div className="mt-2 grid gap-2">
                  {item.addons.map((addon) => {
                    const checked = addonIds.includes(addon.id)
                    return (
                      <label key={addon.id} className="flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-2xl px-4 py-2 ring-1 ring-blue/25">
                        <span className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleAddon(addon.id)}
                            className="h-5 w-5 accent-[#6e94b4]"
                          />
                          {addon.name}
                        </span>
                        <span className="tabular-nums text-muted">+{formatPrice(addon.price)}</span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            )}

            <div className="mt-6">
              <label htmlFor={notesId} className="text-xs uppercase tracking-[0.18em] text-muted">
                Special instructions
              </label>
              <textarea
                id={notesId}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                placeholder="No onions, less sweet…"
                className="mt-2 w-full resize-none rounded-2xl bg-paper px-4 py-3 text-base text-ink ring-1 ring-blue/25 outline-none focus:ring-blue"
              />
            </div>
          </div>

          <div className="border-t border-line bg-cream px-6 py-4 sm:px-8">
            <button
              type="button"
              onClick={submit}
              className="flex h-12 w-full items-center justify-center rounded-full bg-blue-deep font-serif text-xl text-white transition hover:bg-blue"
            >
              Add to cart — {formatPrice(total)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
