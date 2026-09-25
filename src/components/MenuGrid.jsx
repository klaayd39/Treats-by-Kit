import MenuCard from "./MenuCard"

export default function MenuGrid({ items, onOpen, onAdd }) {
  if (!items.length) {
    return <p className="py-16 text-center text-muted">Nothing on this page just yet.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
      {items.map((item, index) => (
        <MenuCard key={item.id} item={item} index={index} onOpen={onOpen} onAdd={onAdd} />
      ))}
    </div>
  )
}
