export default class EventBadgeFinder {
  static findBadge(totalDiscount) {
    if (totalDiscount >= 5000 && totalDiscount < 10_000) return '별';
    if (totalDiscount >= 10_000 && totalDiscount < 20_000) return '트리';
    if (totalDiscount >= 20_000) return '산타';
    return '없음';
  }
}
