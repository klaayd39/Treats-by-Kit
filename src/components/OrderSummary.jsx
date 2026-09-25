import { useState } from "react"
import { brand, formatPrice } from "../data/menu"

export default function OrderSummary({ subtotal, onPlace, disabled }) {
  const [confirming, setConfirming] = useState(false)
  const service = Math.round(subtotal * brand.serviceChargeRate * 100) / 100
  const total = subtotal + service

  return (
    <div className="border-t border-line bg-cream px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8">
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
      {confirming ? (
        <div className="mt-5">
          <p className="text-center font-serif text-2xl text-blue-deep">Place this order?</p>
          <p className="mt-1 text-center text-sm text-muted">This sends {formatPrice(total)} to the kitchen.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="flex h-12 items-center justify-center rounded-full font-serif text-xl text-blue-deep ring-1 ring-blue/40"
            >
              Back
            </button>
            <button
              type="button"
              onClick={onPlace}
              className="flex h-12 items-center justify-center rounded-full bg-blue-deep font-serif text-xl text-white"
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          disabled={disabled}
          className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-blue-deep font-serif text-xl text-white transition hover:bg-blue disabled:cursor-not-allowed disabled:opacity-40"
        >
          Place order
        </button>
      )}
    </div>
  )
}
