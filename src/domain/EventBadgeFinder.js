import BADGE from '../constants/badge';
import { NO_RESULT_FOUND, THRESHOLD_AMOUNT } from '../constants/constants';

export default class EventBadgeFinder {
  static findBadge(totalDiscount) {
    if (totalDiscount >= THRESHOLD_AMOUNT.starBadge && totalDiscount < THRESHOLD_AMOUNT.treeBadge)
      return BADGE.star;
    if (totalDiscount >= THRESHOLD_AMOUNT.treeBadge && totalDiscount < THRESHOLD_AMOUNT.santaBadge)
      return BADGE.tree;
    if (totalDiscount >= THRESHOLD_AMOUNT.santaBadge) return BADGE.santa;

    return NO_RESULT_FOUND;
  }
}
