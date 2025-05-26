import { render, fireEvent, screen } from '@testing-library/react-native';
import EventsScreen from '@/app/(tabs)/events';
import mockData from '../../../data/trackEventsData.json';
import { useGetEvents } from '@/hooks/useGetEvents';
import { EventProvider } from '@/components/ui/event-context-provider';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

const createTestClient = new QueryClient();

jest.mock('@/hooks/useGetEvents', () => ({
  useGetEvents: jest.fn(),
}));

describe('EventsScreen', () => {
  beforeEach(() => {
    (useGetEvents as jest.Mock).mockReturnValue({
      data: mockData,
      isFetching: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Renders a list of events",  () => {
    render(
      <QueryClientProvider client={createTestClient}>
      <EventProvider>
        <EventsScreen />
      </EventProvider>
    </QueryClientProvider>
    );

    mockData.forEach((event) => {
      expect(screen.getByText(event.title)).toBeOnTheScreen();
    });
  });

  test("Filters the list through search", async () => {
    render(
      <QueryClientProvider client={createTestClient}>
        <EventProvider>
          <EventsScreen />
        </EventProvider>
      </QueryClientProvider>
    );

    const input = screen.getByPlaceholderText('Search');
    fireEvent.changeText(input, 'Long Jump')
    fireEvent.press(screen.getByText('Search'))

    expect(screen.queryByText('100 Meter')).toBeNull();
    expect(screen.getByText('Long Jump')).toBeTruthy();
    expect(screen.queryByText('Javelin')).toBeNull();
  })
})