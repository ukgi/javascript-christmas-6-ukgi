const ERROR_MESSAGE = Object.freeze({
  notValidDate: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  notValidOrder: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
  notOrderOnlyBeverage: '[ERROR] 음료만 주문할 수 없습니다. 다시 입력해 주세요.',
  maxOrderQuantity: '[ERROR] 한번에 주문할 수 있는 갯수는 최대 20개입니다. 다시 입력해 주세요.',
});

const INPUT_MESSAGE = Object.freeze({
  date: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)',
  order: '주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)',
});

const OUTPUT_MESSAGE = Object.freeze({
  plannerStart: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  preview: '우테코 식당에서 받을 이벤트 혜택 미리 보기!',
  menu: '\n<주문 메뉴>',
  totalAmount: '\n<할인 전 총주문 금액>',
  gift: '\n<증정 메뉴>',
  benefit: '\n<혜택 내역>',
  totalDiscount: '\n<총혜택 금액>',
  expectedAmountAfterDiscount: '\n<할인 후 예상 결제 금액>',
  eventBadge: '\n<12월 이벤트 배지>',
});

export { ERROR_MESSAGE, INPUT_MESSAGE, OUTPUT_MESSAGE };
