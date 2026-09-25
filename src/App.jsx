import { useMemo, useState } from "react"
import Header from "./components/Header"
import CategoryNav from "./components/CategoryNav"
import ProductModal from "./components/ProductModal"
import CartDrawer from "./components/CartDrawer"
import BottomNavigation from "./components/BottomNavigation"
import Menu from "./pages/Menu"
import OrderConfirmation from "./pages/OrderConfirmation"
import { brand, menu } from "./data/menu"
import { nextOrderNumber, useCart } from "./hooks/useCart"

export default function App() {
  const cart = useCart()
  const [category, setCategory] = useState("all")
  const [activeItem, setActiveItem] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [order, setOrder] = useState(null)
  const [toast, setToast] = useState("")

  const items = useMemo(
    () => (category === "all" ? menu : menu.filter((item) => item.category === category)),
    [category],
  )

  function notify(message) {
    setToast(message)
    window.setTimeout(() => setToast(""), 1400)
  }

  function addToCart(item, selection) {
    const size = selection?.size ?? item.sizes?.[0] ?? null
    cart.addLine(item, {
      size,
      addons: selection?.addons ?? [],
      notes: selection?.notes ?? "",
      quantity: selection?.quantity ?? 1,
    })
    notify(`${item.name} added`)
  }

  function placeOrder() {
    if (!cart.lines.length) return
    const service = Math.round(cart.subtotal * brand.serviceChargeRate * 100) / 100
    setOrder({
      number: nextOrderNumber(),
      total: cart.subtotal + service,
      lines: cart.lines,
    })
    cart.clear()
    setCartOpen(false)
  }

  return (
    <div className="min-h-dvh">
      <a href="#menu" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2">
        Skip to menu
      </a>
      <div className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md">
        <Header count={cart.count} onCart={() => setCartOpen(true)} />
        {!order && <CategoryNav active={category} onChange={setCategory} />}
      </div>

      <main id="menu">
        {order ? (
          <OrderConfirmation order={order} onBack={() => setOrder(null)} />
        ) : (
          <Menu category={category} items={items} onOpen={setActiveItem} onAdd={addToCart} />
        )}
      </main>

      <BottomNavigation
        view={order ? "confirm" : "menu"}
        count={cart.count}
        onMenu={() => {
          setOrder(null)
          setCartOpen(false)
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        onCart={() => setCartOpen(true)}
      />

      {activeItem && (
        <ProductModal
          key={activeItem.id}
          item={activeItem}
          onClose={() => setActiveItem(null)}
          onAdd={addToCart}
        />
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={cart.lines}
        subtotal={cart.subtotal}
        onQty={cart.updateQty}
        onRemove={cart.removeLine}
        onPlace={placeOrder}
      />

      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-cream transition min-[744px]:bottom-8 ${
          toast ? "opacity-100" : "opacity-0"
        }`}
      >
        {toast}
      </div>
    </div>
  )
}
