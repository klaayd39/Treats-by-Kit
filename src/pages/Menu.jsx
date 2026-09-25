import { getCategory } from "../data/menu"
import MenuGrid from "../components/MenuGrid"

export default function Menu({ category, items, onOpen, onAdd }) {
  const current = getCategory(category)

  return (
    <section className="px-5 pb-28 pt-8 sm:px-8 sm:pt-10 min-[744px]:pb-16 lg:px-12 lg:pt-12">
      <div className="mb-10 text-center sm:mb-14">
        <h1 className="font-serif text-5xl font-medium leading-none text-blue-deep sm:text-6xl lg:text-7xl">
          {current.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">{current.blurb}</p>
      </div>
      <MenuGrid items={items} onOpen={onOpen} onAdd={onAdd} />
    </section>
  )
}
