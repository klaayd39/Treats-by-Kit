import { brand, formatPrice } from "../data/menu"

export default function OrderSummary({ subtotal, onPlace, disabled }) {
  const service = Math.round(subtotal * brand.serviceChargeRate * 100) / 100
  const total = subtotal + service

  return (
    <div className="border-t border-line bg-cream px-6 py-5 sm:px-8">
      <dl className="space-y-2.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Service charge</dt>
          <dd className="tabular-nums">{formatPrice(service)}</dd>
        </div>
        <div className="flex items-baseline justify-between pt-2 font-serif text-2xl text-blue-deep">
          <dt>Total</dt>
          <dd className="tabular-nums">{formatPrice(total)}</dd>
        </div>
      </dl>
      <button
        type="button"
        onClick={onPlace}
        disabled={disabled}
        className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-blue-deep font-serif text-xl text-white transition hover:bg-blue disabled:cursor-not-allowed disabled:opacity-40"
      >
        Place order
      </button>
    </div>
  )
}
