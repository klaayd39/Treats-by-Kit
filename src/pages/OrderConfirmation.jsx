import { Check } from "lucide-react"
import { brand, formatPrice } from "../data/menu"
import Logo from "../components/Logo"

export default function OrderConfirmation({ order, onBack }) {
  return (
    <section className="flex min-h-[calc(100dvh-5rem)] items-center justify-center px-5 py-12 pb-28 min-[744px]:pb-12">
      <div className="w-full max-w-lg text-center">
        <Logo className="mx-auto h-20 w-20 rounded-3xl" />
        <div className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue text-white">
          <Check size={26} />
        </div>
        <p className="mt-6 font-script text-4xl text-blue">Order received</p>
        <h1 className="mt-1 font-serif text-[clamp(2.75rem,8vw,3.75rem)] font-medium text-blue-deep">Thank you</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
          Your order has been sent to the kitchen.
        </p>
        <p className="mt-8 font-serif text-4xl text-blue-deep">Order #{order.number}</p>
        <p className="mt-2 text-sm text-muted">Estimated preparation time</p>
        <p className="text-lg text-ink">{brand.prepTime}</p>
        <p className="mt-6 text-sm text-muted">
          {formatPrice(order.total)}
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-blue-deep px-8 font-serif text-xl text-white transition hover:bg-blue"
        >
          Back to menu
        </button>
      </div>
    </section>
  )
}
