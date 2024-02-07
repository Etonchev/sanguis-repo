import { useSession } from "next-auth/react";
import { LabResultItem } from "../../../app/utils/types";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const LabResultCard = ({ labResult }: { labResult: LabResultItem }) => {
  const { data: session } = useSession();

  if (!session) {
    return;
  }

  return (
    <Card className="w-1/5 h-auto cursor-pointer scale-100 hover:scale-105 ease-in duration-200">
      <CardHeader>
        <CardTitle>{labResult.physician}</CardTitle>
        <CardDescription>{labResult.laboratory}</CardDescription>
        <CardDescription>{labResult.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>Notes:</div>
        {labResult.note}
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button variant="outline">Edit</Button>
        <Button variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default LabResultCard;
