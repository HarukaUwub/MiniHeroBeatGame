interface Props {
  y: number;
  lane: number;
}

export default function Note({ y, lane }: Props) {
  const colors = ["bg-blue-500", "bg-yellow-400", "bg-green-500", "bg-red-500"];
  return (
    <div
      className={`absolute ${colors[lane]} w-20 h-20 rounded-full`}
      style={{ left: lane * 100 + 20, top: y }}
    />
  );
}
