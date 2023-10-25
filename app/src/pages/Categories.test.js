import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Categories from './Categories';

describe('Categories Component', () => {
  test('renders without errors', () => {
    render(<Categories />);
    // Expect the component to render without throwing an error
  });

  test('displays "No rooms available" message when no rooms are loaded', () => {
    render(<Categories loadedRooms={[]} />);
    const noRoomsMessage = screen.getByText(/No rooms available./i);
    expect(noRoomsMessage).toBeInTheDocument();
  });

  test('displays loading message while rooms are being fetched', () => {
    render(<Categories isLoading={true} />);
    const loadingMessage = screen.getByText(/Loading.../i);
    expect(loadingMessage).toBeInTheDocument();
  });

  test('displays error message when there is an error loading rooms', () => {
    render(<Categories isError={true} />);
    const errorMessage = screen.getByText(/Error loading rooms/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('displays room cards when rooms are loaded', () => {
    const loadedRooms = [
      // Sample room data objects for testing
      { id: 1, name: 'Room 1', price: 100 },
      { id: 2, name: 'Room 2', price: 150 },
    ];

    render(<Categories loadedRooms={loadedRooms} />);
    const roomCards = screen.getAllByTestId('room-card');
    expect(roomCards).toHaveLength(loadedRooms.length);
  });

  test('calls handleRefresh function when the refresh button is clicked', async () => {
    const handleRefreshMock = jest.fn();
    render(<Categories handleRefresh={handleRefreshMock} />);
    
    const refreshButton = screen.getByText(/Refresh/i);
    fireEvent.click(refreshButton);
    
    await waitFor(() => {
      expect(handleRefreshMock).toHaveBeenCalledTimes(1);
    });
  });
});
