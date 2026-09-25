export default function Logo({ className = "h-12 w-12" }) {
  return (
    <img
      src="/logo.png"
      alt=""
      className={`object-cover ${className}`}
    />
  )
}
