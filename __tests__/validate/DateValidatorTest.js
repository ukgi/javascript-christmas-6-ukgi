import { ERROR_MESSAGE } from '../../src/constants/message';
import DateValidator from '../../src/validate/DateValidator';

describe('방문날짜 유효성 검사 테스트', () => {
  test.each(['1', '15', '31'])('방문날짜는 1이상 31이하의 수입니다.', (date) => {
    const resultFn = () => DateValidator.validate(date);

    expect(() => {
      resultFn();
    }).not.toThrow();
  });

  test.each(['0', '32', '', ' ', 'abc'])(
    '방문날짜가 1이상 31이하의 수가 아니면 예외처리',
    (date) => {
      const resultFn = () => DateValidator.validate(date);

      expect(() => {
        resultFn();
      }).toThrow(ERROR_MESSAGE.notValidDate);
    },
  );
});
