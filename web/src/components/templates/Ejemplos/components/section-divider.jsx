export function SectionDivider() {
  return (
    <div className="w-full py-8 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-400 to-red-400"></div>
        <div className="text-red-400 text-2xl animate-heartbeat-pulse">♥</div>
        <div className="w-16 h-px bg-gradient-to-l from-transparent via-red-400 to-red-400"></div>
      </div>
    </div>
  )
}
