export default function Logo({ className = "h-12 w-9" }) {
  return (
    <svg viewBox="0 0 48 64" className={className} aria-hidden="true">
      <rect x="2" y="2" width="44" height="60" rx="22" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 30h11.5a5.5 5.5 0 0 1 0 11H16V30z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M27.5 33.5H31a3 3 0 0 1 0 6h-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M22 26c1.2-3 1-5.2 2.4-7.2 1.2 2.2 3.6 2.6 4.6.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
