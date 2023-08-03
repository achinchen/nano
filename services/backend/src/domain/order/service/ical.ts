import ical, { ICalAlarmType } from 'ical-generator';

const DEFAULT_LOCALE = 'zh-TW';

type Parameters = {
  providerName: string;
  orderId: string;
  service: {
    name: string;
    summary: string;
    description: string;
    location?: {
      title: string;
      address: string;
    };
    url: string;
  };
  startTime: Date;
  endTime: Date;
};

export function generateICalendar({
  orderId,
  providerName,
  service: { name: serviceName, summary, description, location, url },
  startTime,
  endTime,
}: Parameters) {
  const calendar = ical({
    name: serviceName,
    prodId: {
      company: providerName,
      product: serviceName,
      language: DEFAULT_LOCALE,
    },
  });

  const event = calendar.createEvent({
    id: orderId,
    start: startTime,
    end: endTime,
    summary,
    description,
    location,
    url,
  });

  event.createAlarm({
    type: ICalAlarmType.display,
    relatesTo: 'START',
    triggerBefore: 60 * 60 * 24,
  });

  event.lastModified(new Date());
  return calendar;
}
