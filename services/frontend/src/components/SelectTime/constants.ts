const HOUR = Array.from({ length: 24 }, (_, i) =>
  String(i).padStart(2, '0')
).map((hour) => ({ label: hour, value: hour }));

export const MINUTE = Array.from({ length: 6 }, (_, i) =>
  String(i * 10).padStart(2, '0')
).map((minute) => ({ label: minute, value: minute }));

export const UNITS = ['hour', 'minute'] as const;

export const OPTION_BY_UNIT = {
  hour: HOUR,
  minute: MINUTE,
};
