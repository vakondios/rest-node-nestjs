import { UUID } from 'crypto';

import { ClsStore } from 'nestjs-cls';

export interface GlobalClsStore extends ClsStore {
  userId: number;
  collerationId: UUID;
}
