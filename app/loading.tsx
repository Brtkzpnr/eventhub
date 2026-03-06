import { SkeletonCard } from "@/components/skeletoncard"

export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}