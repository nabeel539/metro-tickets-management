// import { useEffect, useState } from "react";
// import { AdminLogin } from "../components/Auth/AdminLogin";
// import trainLogo from "../assets/train_logo.svg";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { PassengerSignup } from "@/components/Auth/PassengerSignUp";
// import { PassengerLogin } from "@/components/Auth/PassengerLogin";
// import { seedRoutes } from "@/data/routeSeeder";
// import { useAuth } from "@/context/AuthContext"; // Import the AuthContext

// const AuthPage = () => {
//   const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
//   const [activeTab, setActiveTab] = useState("passenger"); // Default to passenger tab
//   const { role } = useAuth(); // Access the user and role from AuthContext

//   useEffect(() => {
//     const loadRoutesData = async () => {
//       await seedRoutes();
//     };

//     loadRoutesData();

//     // Dynamically set the active tab based on the user role
//     if (role === "admin") {
//       setActiveTab("admin"); // Set to Admin tab if the user is an admin
//     } else {
//       setActiveTab("passenger"); // Set to Passenger tab if the user is not an admin
//     }
//   }, [role]); // Re-run the effect when role changes

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#80C4E9]">
//       <Card className="w-full max-w-md shadow-lg bg-[#FFF6E9] rounded-lg">
//         <CardHeader className="flex justify-center items-center">
//           <img src={trainLogo} alt="logo" className="w-14" />
//           <p className="text-[18px] font-bold">Metro Tickets Systems</p>
//         </CardHeader>
//         <CardContent>
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             {" "}
//             {/* Use dynamic active tab */}
//             <TabsList className="flex justify-center mb-6">
//               <TabsTrigger
//                 value="passenger"
//                 className="w-full text-center text-[#FF7F3E]  hover:text-black transition-all"
//               >
//                 Passenger
//               </TabsTrigger>
//               <TabsTrigger
//                 value="admin"
//                 className="w-full text-center text-[#FF7F3E]  hover:text-black transition-all"
//               >
//                 Admin
//               </TabsTrigger>
//             </TabsList>
//             <TabsContent value="passenger">
//               {isSignup ? (
//                 <PassengerSignup setIsSignup={setIsSignup} />
//               ) : (
//                 <PassengerLogin setIsSignup={setIsSignup} />
//               )}
//             </TabsContent>
//             <TabsContent value="admin">
//               <AdminLogin />
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AuthPage;
import { useEffect, useState } from "react";
import trainLogo from "../assets/train_logo.svg";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLogin } from "@/components/Auth/AdminLogin";
import { PassengerSignup } from "@/components/Auth/PassengerSignUp";
import { PassengerLogin } from "@/components/Auth/PassengerLogin";
import { seedRoutes } from "@/data/routeSeeder";
import { useAuth } from "@/context/AuthContext";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [activeTab, setActiveTab] = useState("passenger"); // Default to passenger tab
  const [loading, setLoading] = useState(true); // Loading state
  const { role } = useAuth(); // Access the user and role from AuthContext
  // For redirection

  useEffect(() => {
    const initializeAuthPage = async () => {
      try {
        // Seed routes for testing/demo purposes
        await seedRoutes();

        // Set active tab based on user role
        if (role === "admin") {
          setActiveTab("admin");
        } else {
          setActiveTab("passenger");
        }
      } catch (error) {
        console.error("Error initializing AuthPage:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuthPage();
  }, [role]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#80C4E9]">
        <p className="text-white text-lg font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#80C4E9]">
      <Card className="w-full max-w-md shadow-lg bg-[#FFF6E9] rounded-lg">
        <CardHeader className="flex justify-center items-center">
          <img
            src={trainLogo}
            alt="Metro Tickets System Logo"
            className="w-14"
            onError={(e) => (e.target.src = "/fallback_logo.svg")} // Fallback logo
          />
          <p className="text-[18px] font-bold">Metro Tickets Systems</p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex justify-center mb-6">
              <TabsTrigger
                value="passenger"
                aria-label="Passenger Authentication"
                className="w-full text-center text-[#FF7F3E] hover:text-black transition-all"
              >
                Passenger
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                aria-label="Admin Authentication"
                className="w-full text-center text-[#FF7F3E] hover:text-black transition-all"
              >
                Admin
              </TabsTrigger>
            </TabsList>
            <TabsContent value="passenger">
              {isSignup ? (
                <PassengerSignup setIsSignup={setIsSignup} />
              ) : (
                <PassengerLogin setIsSignup={setIsSignup} />
              )}
            </TabsContent>
            <TabsContent value="admin">
              <AdminLogin />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
