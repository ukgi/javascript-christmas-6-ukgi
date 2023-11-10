import Menu from '../../src/domain/Menu';

describe('메뉴 테스트', () => {
  test('메뉴에 있는 모든 메뉴명을 반환합니다.', () => {
    expect(Menu.getOnlyMenuTitle()).toEqual([
      '양송이수프',
      '타파스',
      '시저샐러드',
      '티본스테이크',
      '바비큐립',
      '해산물파스타',
      '크리스마스파스타',
      '초코케이크',
      '아이스크림',
      '제로콜라',
      '레드와인',
      '샴페인',
    ]);
  });

  test.each([
    {
      category: '애피타이저',
      expected: ['양송이수프', '타파스', '시저샐러드'],
    },
    {
      category: '메인',
      expected: ['티본스테이크', '바비큐립', '해산물파스타', '크리스마스파스타'],
    },
    {
      category: '디저트',
      expected: ['초코케이크', '아이스크림'],
    },
    {
      category: '음료',
      expected: ['제로콜라', '레드와인', '샴페인'],
    },
  ])('카테고리를 입력하면 해당 카테고리의 메뉴를 반환합니다.', ({ category, expected }) => {
    expect(Menu.getMenuByCategory(category)).toEqual(expected);
  });
});
