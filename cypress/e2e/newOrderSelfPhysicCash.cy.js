describe("New order self", function () {
        it("Sing in", function () {
            const start = new Date().getTime();
            cy.viewport(1920, 1080)
            cy.log("Авторизация")
            cy.visit("https://www.vseinstrumenti.ru/represent/change/?represent_id=1&represent_type=common&url_to_redirect=https://www.vseinstrumenti.ru/&regionAutocomplete=")
            cy.contains("Вход ").click()
            cy.get("input#login-email").type("vseins_site_day100@mail.ru")
            cy.get("input#login-password").type("111111")
            cy.contains("Войти").click()
            cy.wait(1000)
            cy.visit("https://www.vseinstrumenti.ru/run/PCabinet/MyCart/clearCart")
            cy.log("Добавление товара в корзину")
            cy.visit("https://www.vseinstrumenti.ru/instrument/shurupoverty/akkumulyatornye-dreli/")
            cy.scrollTo(0, 3500)
            cy.get("[data-behavior=\"product-listing\"] div:nth-child(1) [data-behavior=\"add-to-cart\"]").click()

            cy.log("Переход в корзину")
            cy.get('.modals-content [data-behavior="go-to-cart"]').click()
            cy.wait(1000)
            cy.get('[data-qa="cart-total-sum-value"] span')
                .should('be.visible')
                .invoke('text')
                .then((totalSumCart) => {
            cy.log("Клик на кн. Изменить данные заказа")
            cy.get('[data-qa="cart-total-change-data-button"]').click()
            cy.log("Выбираем параметры: самовывоз, оплата налом")
            cy.get('[data-qa="ordering-delivery-type-self"]').click({force: true})
            cy.get('[data-qa="ordering-payment-type-cash"]').click()
            cy.log("Клик на кн. Подтвердить заказ")
            cy.get('[data-qa="ordering-total-order-create-button"]').click()
            cy.log("Клик на номер заказа и переход в ЛК")
            cy.wait(1000)
            cy.get('[data-qa="thanks-page-price"]')
                .should('be.visible')
                .invoke('text')
                        .should((totalSumOrder) => {
                            expect(totalSumCart.replace(/\D/g, '')).to.eq(totalSumOrder.replace(/\D/g, ''))
                        })
                })
            cy.get('[data-qa="thanks-page-order-number"]').click()
            const end = new Date().getTime();
            cy.log(`Тест отработал за ${end - start} миллисекунд`);
        })
    }
)