import prisma from "@/lib/db"; // Ensure this path is correct
import CardsWidget from "@/components/dashboard/CardsWidget"; // Import your CardsWidget component
import CardsEmployee from "@/components/dashboard/CardsEmployee";
import { Member, Supervisor } from "@/components/dashboard/type";

const Page = async () => {
  let members: Member[] = [];
  let supervisors: Supervisor[] = [];

  try {
    members = await prisma.member.findMany(); // Fetch all members
    supervisors = await prisma.supervisor.findMany(); // Fetch all supervisors
  } catch (error) {
    console.error("Error fetching members:", error);
    return (
      <div>
        <h1>Error fetching members</h1>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row col-lg-12">
        <div className="col-lg-4">
         
          <CardsEmployee supervisors={supervisors} />
        </div>
        <div className="col-md-4">
          <CardsWidget members={members} />
        </div>
      </div>

      
    </div>
  );
};

export default Page;
