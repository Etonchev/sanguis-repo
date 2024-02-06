import { useSession } from "next-auth/react";
import { LabResultItem } from "../../../app/utils/types";
import { ChevronRightIcon } from "@radix-ui/react-icons";

const LabResultCard = ({ labResult }: { labResult: LabResultItem }) => {
  const { data: session, status } = useSession();

  return (
    <main className="w-1/5 h-96">
      {session && (
        <div className="flex flex-col grow gap-2 p-4 bg-white rounded-md drop-shadow-md hover:drop-shadow-xl h-full cursor-pointer">
          <div className="text-2xl self-center">{labResult.physician}</div>
          <div className="text-xl self-center">{labResult.laboratory}</div>
          <div className="text-sm self-center">{labResult.date}</div>
          <div className="text-sm self-center mt-8">{labResult.note}</div>
        </div>
      )}
    </main>
  );
};

export default LabResultCard;
