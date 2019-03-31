import { Selector } from "testcafe";

const ROOT_URL = "https://alfabank.ru";

fixture("Alfabank main page test").page(ROOT_URL);

const toArray = async (selector: Selector) => {
  const count = await selector.count;
  let elements: Array<Selector> = [];
  for (let i = 0; i < count; i++) {
    elements.push(selector.nth(i));
  }

  return elements;
};

test("Calculator should be correct work", async testController => {
  return;
  const estateCost = Selector(`[name="estateCost"]`);
  const balanceOwed = Selector(`[name="balanceOwed"]`);
  const calculator = Selector(`.calculator__mvhCq`);

  const result = Selector(".result__3cbHH").nth(1).find('strong');

  await testController
    .selectText(estateCost)
    .typeText(estateCost, "10000000")
    .selectText(balanceOwed)
    .typeText(balanceOwed, "5000000")
    .click(calculator)
    .expect(result.innerText)
    .contains("48 218");
});

test("Product buttons should be work", async testController => {
  return;
  const buttons = await toArray(
    Selector(".product-tiles__1nmji .button__31w9k")
  );

  await Promise.all(
    buttons.map(
      async button => await testController.click(button).navigateTo(ROOT_URL)
    )
  );
});
