import CartItem from "../components/CartItem"
import OrderSummary from "../components/OrderSummary"

export default function Cart({ lines, subtotal, onQty, onRemove, onPlace }) {
  if (!lines.length) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <p className="font-serif text-4xl font-medium text-blue-deep">Your order</p>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
          The table is clear. Add a drink or a plate whenever you are ready.
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ul className="min-h-0 flex-1 divide-y divide-line overflow-y-auto px-6 sm:px-8">
        {lines.map((line) => (
          <CartItem key={line.id} line={line} onQty={onQty} onRemove={onRemove} />
        ))}
      </ul>
      <OrderSummary subtotal={subtotal} onPlace={onPlace} disabled={!lines.length} />
    </div>
  )
}
