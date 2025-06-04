import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BookingReferenceCard({ bookingPk }: { bookingPk: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking reference</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Reference Number</p>
          <p className="font-mono text-sm font-semibold break-all">{bookingPk}</p>
        </div>
        <p className="text-xs text-gray-500 mt-2">Keep this reference number for your records</p>
      </CardContent>
    </Card>
  );
}
