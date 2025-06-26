import { Brain } from 'lucide-react'

interface BrainIconProps {
  className?: string
}

export default function BrainIcon({ className = "w-8 h-8" }: BrainIconProps) {
  return <Brain className={className} />
}