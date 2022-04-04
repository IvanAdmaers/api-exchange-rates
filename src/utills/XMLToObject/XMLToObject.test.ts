import XMLToObject from '.';

describe('XMLToObject', () => {
  const XML: string = `<a x="1.234" y="It's"/>`;

  it('should convert correctly when compact = true', () => {
    const JS: object = { a: { _attributes: { x: '1.234', y: "It's" } } };

    expect(XMLToObject(XML, true)).toEqual(JS);
  });

  it('should convert correctly when compact = false', () => {
    const JS: object = {
      elements: [
        { type: 'element', name: 'a', attributes: { x: '1.234', y: "It's" } },
      ],
    };

    expect(XMLToObject(XML, false)).toEqual(JS);
  });
});
