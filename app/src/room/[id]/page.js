import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { fetchRoomDetails } from "../../../services/api";

const RoomDetails = ({params}) => {
    const router = useRouter();
    const { roomId, categoryId } = router.query;
    
    console.log(categoryId);

    // const { data: room, isLoading, isError } = useQuery(['room', roomId], () => fetchRoomDetails(roomId, categoryId), {
    //   enabled: !!roomId && !!categoryId, // Fetch data only when both roomId and categoryId are available
    // });
  
    // if (isLoading) {
    //     console.log("room",room)
    //   return <div>Loading...</div>;
    // }
  
    // if (isError) {
    //     console.log("room",room)
    //   return <div>Error loading room details.</div>;
    // }
  
  

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col lg:flex-row mb-8">
//         <div className="lg:w-1/2 pr-8">
//           <div className="mb-6 relative rounded-lg overflow-hidden">
//             <Image src="/path/to/room-image.jpg" alt="Room" width={1200} height={800} />
//           </div>
//           {/* Implement slider or additional images here */}
//         </div>
//         <div className="lg:w-1/2">
//           <h1 className="text-3xl font-semibold mb-4">{room.name}</h1>
//           <p className="text-gray-600 mb-4">{room.description}</p>
//           <div className="flex items-center mb-4">
//             <Icon icon="mdi:map-marker" className="text-gray-500 mr-2" />
//             <p className="text-gray-600">{room.location}</p>
//             <Icon icon="ph:heart-light" className="ml-auto w-6 h-6 cursor-pointer text-red-500" />
//           </div>
//           <p className="text-2xl font-semibold text-blue-600 mb-6">${room.price} / night</p>
//           <div className="flex mb-4 space-x-4">
//             <div className="flex items-center">
//               <Icon icon="mdi:bed" className="text-gray-500 mr-2" />
//               <p className="text-gray-600">2 beds</p>
//             </div>
//             {/* Add more room details here */}
//           </div>
//           <button className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 focus:outline-none">
//             Book Now
//           </button>
//         </div>
//       </div>

//       {/* Additional Room Details */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
//         <div className="flex flex-wrap">
//           <div className="w-1/2 mb-4 flex items-center">
//             <Icon icon="fa-solid:wifi" className="text-gray-500 mr-2" />
//             <p className="text-gray-600">Free Wi-Fi</p>
//           </div>
//           <div className="w-1/2 mb-4 flex items-center">
//             <Icon icon="ic:baseline-ac-unit" className="text-gray-500 mr-2" />
//             <p className="text-gray-600">Air Conditioning</p>
//           </div>
//           {/* Add more amenities here */}
//         </div>
//       </div>

//       {/* Reviews */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
//         {/* Implement review components here */}
//       </div>

//       {/* Location */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Location</h2>
//         {/* Implement map or location component here */}
//       </div>

//       {/* Similar Listings */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Similar Listings</h2>
//         <div className="flex flex-wrap">
//           {/* Implement similar room cards here */}
//         </div>
//       </div>
//     </div>
//   );

return <div>Room Details Page for Category ID</div>;
};

export default RoomDetails;
