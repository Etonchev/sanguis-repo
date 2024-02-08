import { useSession } from "next-auth/react";
import { LabResultItem } from "../../../app/utils/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { deleteLabResult } from "@/app/helpers/lab-results";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const LabResultCard = ({ labResult }: { labResult: LabResultItem }) => {
  const route = useRouter();
  const { data: session } = useSession();

  if (!session) {
    return;
  }

  const handleDeleteLabResult = async () =>
    await deleteLabResult({ id: labResult.id, token: session.user.token });

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
        <Button onClick={() => route.push(`/edit-lab-result/${labResult.id}`)} variant="outline">
          Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this lab result?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDeleteLabResult()}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default LabResultCard;
