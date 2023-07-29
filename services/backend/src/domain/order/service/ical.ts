import ical from 'ical-generator';

const DEFAULT_LOCALE = 'zh-TW';

type Parameters = {
  providerName: string;
  service: {
    name: string;
    summary: string;
    description: string;
    location: string;
    url: string;
  };
  startTime: Date;
  endTime: Date;
};

export function generateICalendar({
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
    events: [
      {
        start: startTime,
        end: endTime,
        summary,
        description,
        location,
        url,
      },
    ],
  });

  return calendar;
}
