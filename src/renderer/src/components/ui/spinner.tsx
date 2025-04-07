export function Spinner({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

