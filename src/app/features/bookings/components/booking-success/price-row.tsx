export function PriceRow({
  label,
  amount,
}: {
  label: string;
  amount: string | number;
}) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>
        {amount}
        {" "}
        DKK
      </span>
    </div>
  );
}
