import axios from 'axios';

const BASE_URL = 'https://b719a7e2-0387-427c-bb7d-ca7e562b4cf8.mock.pstmn.io';

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/rooms`);
    const data = response.data;
    console.log(data.rooms)
    return data.rooms;
  } catch (error) {
    console.error('Error fetching room categories:', error);
    throw error;
  }
};


import roomsData from '../utils/room_json.json';

const PAGE_SIZE = 12;

export const fetchRooms = async (page) => {
  // Simulate an API request delay for a more realistic experience
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Calculate the start and end index for the current page
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  
  // Get rooms for the current page
  const rooms = roomsData.rooms.slice(startIndex, endIndex);
  
  return rooms;
};


export const fetchRoomDetails = async (roomId, categoryId) => {
    console.log(roomId,categoryId,'idssss printed now now now')
    let cat_num = Number(categoryId)
    let room_num = Number(roomId)
    // Simulate an API request delay for a more realistic experience
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    const categoryRooms = roomsData.rooms.filter((room) => room.id === cat_num);
    const room = categoryRooms[0].roomList.find((r) => r.id === room_num);
    
    if (room) {
      return room;
    } else {
      throw new Error('Room not found');
    }
  };