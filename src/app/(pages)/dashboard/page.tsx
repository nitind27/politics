import prisma from "@/lib/db"; // Ensure this path is correct
import CardsWidget from "@/components/dashboard/CardsWidget"; // Import your CardsWidget component
import CardsEmployee from "@/components/dashboard/CardsEmployee";
import { Member, Qrcodes, Supervisor } from "@/components/dashboard/type";
import CardsStatus from "@/components/dashboard/CardsStatus";
import Loader from "@/components/Loader/Loader ";

const Page = async () => {
  let members: Member[] = [];
  let supervisors: Supervisor[] = [];
  let Qrcodes: Qrcodes[] = [];
  let loading = true; // Initialize loading state

  try {
    members = await prisma.member.findMany(); // Fetch all members
    supervisors = await prisma.supervisor.findMany(); // Fetch all supervisors
    Qrcodes = await prisma.qrcodes.findMany(); // Fetch all QR codes

    loading = false; // Set loading to false after data fetch
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div>
        <h1>Error fetching data</h1>
      </div>
    );
  }

  if (loading) {
    return <Loader />; // Render loading component
  }

  return (
    <div className="container mt-5">
      <div className="row col-lg-12">
        <div className="col-lg-4">
          <CardsEmployee supervisors={supervisors} />
        </div>
        <div className="col-md-4">
          <CardsWidget qrcodes={Qrcodes} />
        </div>
        <div className="col-md-4">
          <CardsStatus members={members} />
        </div>
      </div>
    </div>
  );
};

export default Page;