type Props = {
  lf: number[] | null
}

export default function LoadFactors({ lf }: Props) {
  if (!lf) return

  return <div className="font-medium text-neutral-400">LF{lf.join('/')}</div>
}
