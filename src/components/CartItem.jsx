import { Minus, Plus, Trash2 } from "lucide-react"
import { formatPrice } from "../data/menu"

export default function CartItem({ line, onQty, onRemove }) {
  return (
    <li className="flex gap-4 py-5">
      <img src={line.image} alt="" className="h-20 w-16 shrink-0 rounded-2xl object-cover" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-serif text-2xl font-medium leading-tight text-blue-deep sm:text-[1.7rem]">{line.name}</p>
            {line.sizeLabel && <p className="mt-1 text-xs text-muted">{line.sizeLabel}</p>}
            {line.addons?.length > 0 && (
              <p className="mt-1 text-xs text-muted">{line.addons.map((addon) => addon.name).join(", ")}</p>
            )}
            {line.notes && <p className="mt-1 text-xs italic text-muted">“{line.notes}”</p>}
          </div>
          <p className="shrink-0 font-serif text-xl leading-none text-blue-deep tabular-nums">{formatPrice(line.unit * line.quantity)}</p>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full text-blue-deep ring-1 ring-blue/35" onClick={() => onQty(line.id, line.quantity - 1)} aria-label={`Decrease ${line.name}`}>
            <Minus size={16} />
          </button>
          <span className="qty-pop w-6 text-center font-serif text-xl leading-none tabular-nums" key={line.quantity}>{line.quantity}</span>
          <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full text-blue-deep ring-1 ring-blue/35" onClick={() => onQty(line.id, line.quantity + 1)} aria-label={`Increase ${line.name}`}>
            <Plus size={16} />
          </button>
          <button type="button" className="ml-1 flex h-11 w-11 items-center justify-center rounded-full text-muted hover:text-blue-deep" onClick={() => onRemove(line.id)} aria-label={`Remove ${line.name}`}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </li>
  )
}
