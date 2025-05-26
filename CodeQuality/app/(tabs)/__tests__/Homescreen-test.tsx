import { render, fireEvent } from '@testing-library/react-native';
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
  const mockedUseGetEvents = useGetEvents as jest.Mock

  beforeEach(() => {
    mockedUseGetEvents.mockReturnValue({
      data: mockData,
      isFetching: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Renders a list of events", async () => {
    const { getByText } = render(
      <QueryClientProvider client={createTestClient}>
      <EventProvider>
        <EventsScreen />
      </EventProvider>
    </QueryClientProvider>
    );


    expect(getByText('100 Meter')).toBeTruthy();
    expect(getByText('Long Jump')).toBeTruthy();
    expect(getByText('Javelin')).toBeTruthy();
  });

  test("Filters the list through search", async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <QueryClientProvider client={createTestClient}>
        <EventProvider>
          <EventsScreen />
        </EventProvider>
      </QueryClientProvider>
    );

    const input = getByPlaceholderText('Search');
    fireEvent.changeText(input, 'Long Jump')
    fireEvent.press(getByText('Search'))

    expect(queryByText('100 Meter')).toBeNull();
    expect(getByText('Long Jump')).toBeTruthy();
    expect(queryByText('Javelin')).toBeNull();
  })
})