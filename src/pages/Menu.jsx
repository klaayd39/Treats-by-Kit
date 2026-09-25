import { getCategory } from "../data/menu"
import MenuGrid from "../components/MenuGrid"

export default function Menu({ category, items, onOpen, onAdd }) {
  const current = getCategory(category)

  return (
    <section className="mx-auto w-full max-w-[90rem] px-4 pb-28 pt-6 sm:px-8 sm:pt-10 min-[744px]:pb-16 lg:px-12 lg:pt-12">
      <div className="mb-8 text-center sm:mb-14">
        <h1 className="font-serif text-[clamp(2.75rem,8vw,4.5rem)] font-medium leading-none text-blue-deep">
          {current.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">{current.blurb}</p>
      </div>
      <MenuGrid items={items} onOpen={onOpen} onAdd={onAdd} />
    </section>
  )
}
