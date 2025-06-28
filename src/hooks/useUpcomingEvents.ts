import { useState, useEffect } from 'react';
import { EventCardData, DocumentCategory, EventType } from '../types/api';

// Mock data for upcoming events
const mockUpcomingEvents: EventCardData[] = [
  {
    id: '1',
    title: 'Culte Dominical',
    categories: [DocumentCategory.EVENT],
    eventMeta: {
      type: EventType.CONVENTION,
      startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 3 hours later
      location: 'Sanctuaire Principal'
    }
  },
  {
    id: '2',
    title: 'Réunion de Prière',
    categories: [DocumentCategory.EVENT],
    eventMeta: {
      type: EventType.PRAYER,
      startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 2 hours later
      location: 'Chapelle'
    }
  },
  {
    id: '3',
    title: 'Séminaire Biblique',
    categories: [DocumentCategory.EVENT],
    eventMeta: {
      type: EventType.SEMINAR,
      startTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      endTime: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 2 days later
      location: 'Centre de Conférence'
    }
  },
  {
    id: '4',
    title: 'Convention Annuelle',
    categories: [DocumentCategory.EVENT],
    eventMeta: {
      type: EventType.CONVENTION,
      startTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      endTime: new Date(Date.now() + 33 * 24 * 60 * 60 * 1000), // 3 days later
      location: 'Grand Auditorium'
    }
  }
];

export function useUpcomingEvents() {
  const [events, setEvents] = useState<EventCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter for upcoming events only
        const upcomingEvents = mockUpcomingEvents.filter(
          event => new Date(event.eventMeta.startTime) > new Date()
        );
        
        setEvents(upcomingEvents);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch events');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error
  };
}