import DateValidator from '../src/DateValidator';

describe('방문날짜 유효성 검사 테스트', () => {
  test.each(['1', '15', '31'])('방문날짜는 1이상 31이하의 수입니다.', (date) => {
    expect(() => {
      DateValidator.validate(date);
    }).not.toThrow();
  });

  test.each(['0', '32', '', ' ', 'abc'])(
    '방문날짜가 1이상 31이하의 수가 아니면 예외처리',
    (date) => {
      expect(() => {
        DateValidator.validate(date);
      }).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    },
  );
});
