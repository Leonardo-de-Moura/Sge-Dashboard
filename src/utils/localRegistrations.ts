import { EventItem, Registration, User } from '../types';

function getStorageKey(userId: string): string {
  return `sge_local_registrations_${userId}`;
}

export function getLocalRegistrations(userId: string): Registration[] {
  const stored = localStorage.getItem(getStorageKey(userId));
  if (!stored) return [];

  try {
    const registrations = JSON.parse(stored) as Registration[];
    return Array.isArray(registrations) ? registrations : [];
  } catch {
    return [];
  }
}

export function saveLocalRegistration(event: EventItem, user: User): Registration {
  const registrations = getLocalRegistrations(user.id);
  const existing = registrations.find((registration) => registration.eventId === event.id);
  if (existing) return existing;

  const registration: Registration = {
    id: `local-${event.id}`,
    eventId: event.id,
    eventTitle: event.title,
    date: event.startDate,
    status: 'confirmado',
    ticketCode: `LOCAL-${event.id}`,
  };

  localStorage.setItem(getStorageKey(user.id), JSON.stringify([...registrations, registration]));
  return registration;
}
