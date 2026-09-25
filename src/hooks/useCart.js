import { useCallback, useEffect, useMemo, useState } from "react"

const CART_KEY = "tbk-cart"
const ORDER_KEY = "tbk-order-seq"

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function lineKey(line) {
  const addons = [...(line.addons ?? [])].map((addon) => addon.id).sort().join(",")
  return [line.itemId, line.sizeId || "", addons, (line.notes || "").trim()].join("|")
}

export function useCart() {
  const [lines, setLines] = useState(loadCart)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(lines))
  }, [lines])

  const addLine = useCallback((item, selection) => {
    const size = selection.size
    const addons = selection.addons ?? []
    const notes = selection.notes?.trim() ?? ""
    const quantity = selection.quantity || 1
    const unit = (size?.price ?? item.price) + addons.reduce((sum, addon) => sum + addon.price, 0)
    const draft = {
      itemId: item.id,
      name: item.name,
      image: item.image,
      sizeId: size?.id || "",
      sizeLabel: size?.label || "",
      addons,
      notes,
      unit,
      quantity,
    }
    const key = lineKey(draft)

    setLines((current) => {
      const index = current.findIndex((line) => lineKey(line) === key)
      if (index === -1) {
        return [...current, { ...draft, id: `${item.id}-${Date.now()}` }]
      }
      return current.map((line, i) =>
        i === index ? { ...line, quantity: line.quantity + quantity } : line,
      )
    })
  }, [])

  const updateQty = useCallback((id, quantity) => {
    setLines((current) =>
      quantity <= 0 ? current.filter((line) => line.id !== id) : current.map((line) => (line.id === id ? { ...line, quantity } : line)),
    )
  }, [])

  const removeLine = useCallback((id) => {
    setLines((current) => current.filter((line) => line.id !== id))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const count = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines])
  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.unit * line.quantity, 0),
    [lines],
  )

  return { lines, addLine, updateQty, removeLine, clear, count, subtotal }
}

export function nextOrderNumber() {
  const current = Number(localStorage.getItem(ORDER_KEY) || 1047)
  const next = Number.isFinite(current) ? current + 1 : 1048
  localStorage.setItem(ORDER_KEY, String(next))
  return next
}
