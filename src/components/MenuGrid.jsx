import MenuCard from "./MenuCard"

export default function MenuGrid({ items, onOpen, onAdd }) {
  if (!items.length) {
    return <p className="py-16 text-center text-muted">Nothing on this page just yet.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 min-[700px]:grid-cols-2 min-[700px]:gap-x-10 min-[700px]:gap-y-16 landscape:min-[1024px]:grid-cols-3 landscape:min-[1024px]:gap-x-12 landscape:min-[1280px]:gap-x-16">
      {items.map((item, index) => (
        <MenuCard key={item.id} item={item} index={index} onOpen={onOpen} onAdd={onAdd} />
      ))}
    </div>
  )
}
