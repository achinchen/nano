import { Router } from 'express';
import { generateICalendar } from '~backend/domain/order/service/ical';

const router = Router();

router.get('/calendar', (req, res) => {
  return generateICalendar({
    providerName: 'bukku-provider',
    service: {
      name: 'bukku-service',
      summary: 'bukku-service-summary',
      description: 'bukku-service-description',
      location: `台北凱撒大飯店 No. 38 Zhongxiao W Rd Sec 1, Zhongzheng District, Taipei City 100, Taiwan`,
      url: 'https://bukku.life',
    },
    startTime: new Date(),
    endTime: new Date('2023-10-01'),
  }).serve(res);
});

export default router;
