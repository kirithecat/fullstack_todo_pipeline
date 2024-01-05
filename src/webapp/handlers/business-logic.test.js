import * as api from "./business-logic.js";

const defaultItems = ["Buy Milk", "Relax", "Complete all tasks"]

describe('API tests', () => {
  describe('functional', () => {
    describe('getCurrentItems() method should  ', () => {
      it("return empty array of items when there are none", async () => {
        await api.resetItems()
        const items = await api.getCurrentItems()

        expect(items.length).toBe(0)
        expect(items).toBeInstanceOf(Array)
      })

      it("return array of string items when there are some", async () => {
        await api.resetToDefaultItems()
        const items = await api.getCurrentItems()

        expect(items.length).toBe(3)
        for (const item of items) {
          expect(typeof item).toEqual("string")
        }
      })
    })

    describe('addItem() method should add new item', () => {
      it("when list of tasks is NOT empty", async () => {
        await api.resetToDefaultItems()
        const item = 'task for NON-empty list'

        const itemsBefore = await api.getCurrentItems()
        expect(itemsBefore).not.toContain(item)
        expect(itemsBefore.length).toBe(3)

        await api.addItem(item)

        const itemsAfter = await api.getCurrentItems()
        expect(itemsAfter).toContain(item)
        expect(itemsAfter.length).toBe(4)
        for (const item of itemsBefore) {
          expect(itemsAfter).toContain(item)
        }
      })

      it("when list of tasks is empty", async () => {
        await api.resetItems()
        const item = 'task for empty list'

        const itemsBefore = await api.getCurrentItems()
        expect(itemsBefore).not.toContain(item)
        expect(itemsBefore.length).toBe(0)

        await api.addItem(item)

        const itemsAfter = await api.getCurrentItems()
        expect(itemsAfter).toContain(item)
        expect(itemsAfter.length).toBe(1)
      })
    })

    describe('deleteItem() method should', () => {
      it("call console.log when there are no items in the list", async () => {
        console.log = jest.fn()
        await api.resetItems()

        await api.deleteItem()
        expect(console.log).toHaveBeenCalledTimes(1)
      })

      it("NOT call console.log when there are no items in the list", async () => {
        console.log = jest.fn()
        await api.resetToDefaultItems()

        await api.deleteItem()
        expect(console.log).toHaveBeenCalledTimes(0)
      })

      it("remove first item when there are items", async () => {
        await api.resetToDefaultItems()
        const itemsBefore = await api.getCurrentItems()
        expect(itemsBefore.length).toBe(3)
        expect(itemsBefore).toContain(defaultItems[0])
        expect(itemsBefore).toContain(defaultItems[1])
        expect(itemsBefore).toContain(defaultItems[2])

        await api.deleteItem(0)

        const itemsAfter = await api.getCurrentItems()
        expect(itemsAfter).not.toContain(defaultItems[0])
        expect(itemsAfter.length).toBe(2)
      })

      it("remove last item when there are items", async () => {
        await api.resetToDefaultItems()
        const itemsBefore = await api.getCurrentItems()
        expect(itemsBefore.length).toBe(3)
        expect(itemsBefore).toContain(defaultItems[0])
        expect(itemsBefore).toContain(defaultItems[1])
        expect(itemsBefore).toContain(defaultItems[2])

        await api.deleteItem(2)

        const itemsAfter = api.getCurrentItems()
        expect(itemsAfter).not.toContain(defaultItems[2])
        expect(itemsAfter.length).toBe(2)
      })

      it("remove middle item when there are items", async () => {
        await api.resetToDefaultItems()
        const itemsBefore = await api.getCurrentItems()
        expect(itemsBefore.length).toBe(3)
        expect(itemsBefore).toContain(defaultItems[0])
        expect(itemsBefore).toContain(defaultItems[1])
        expect(itemsBefore).toContain(defaultItems[2])

        await api.deleteItem(1)

        const itemsAfter = await api.getCurrentItems()
        expect(itemsAfter).not.toContain(defaultItems[1])
        expect(itemsAfter.length).toBe(2)
      })
    })

    describe('resetToDefaultItems() method should have 3 items when', () => {
      it("there were NO items before", async () => {
        await api.resetItems()
        const itemsBefore = await api.getCurrentItems();
        expect(itemsBefore.length).toBe(0)

        await api.resetToDefaultItems()
        const itemsAfter = await api.getCurrentItems();
        expect(itemsAfter.length).toBe(3)
      })

      it("there were some items before", async () => {
        await api.resetItems()
        await api.addItem('First unique item')

        await api.resetToDefaultItems()
        const itemsAfter = await api.getCurrentItems();
        expect(itemsAfter.length).toBe(3)
        for (const defaultItem of defaultItems) {
          expect(itemsAfter).toContain(defaultItem)
        }
      })
    })

    describe('resetItems() method should', () => {
      it("remove all items", async () => {
        await api.resetToDefaultItems()
        const itemsBefore = await api.getCurrentItems();
        expect(itemsBefore.length).toBe(3)

        await api.resetItems()
        const items = await api.getCurrentItems();
        expect(items.length).toBe(0)
      })

      it("do nothing when called second time", async () => {
        await api.resetToDefaultItems()
        const itemsBefore = await api.getCurrentItems();
        expect(itemsBefore.length).toBe(3)

        await api.resetItems()
        const items = await api.getCurrentItems();
        expect(items.length).toBe(0)

        await api.resetItems()
        const itemsAfterSecondReset = await api.getCurrentItems();
        expect(itemsAfterSecondReset.length).toBe(0)
      })
    })
  })
//
//   describe('integration with mocked db', () => {
//     beforeEach(() => {
//       db.read = jest.fn(() => "")
//       db.write = jest.fn()
//       db.remove = jest.fn()
//       db.resetToDefaultItems = jest.fn()
//       db.reset = jest.fn()
//       console.log = jest.fn()
//     })
//
//     describe('getCurrentItems() method should  ', () => {
//       it("call the db.read() method", async () => {
//         await api.getCurrentItems()
//
//         expect(db.read).toHaveBeenCalledTimes(1)
//       })
//     })
//
//     describe('addItem() method should call the', () => {
//       it("db.write() method and pass the argument", async () => {
//         const item = 'test with mock'
//         await api.addItem(item)
//
//         expect(db.write).toHaveBeenCalledTimes(1)
//         expect(db.write).toHaveBeenCalledWith(item)
//       })
//     })
//
//     describe('deleteItem() method should call the', () => {
//       it("console.log, db.remove(), db.read(), and db.reset() methods", async () => {
//         await api.deleteItem(1)
//
//         expect(console.log).toHaveBeenCalledTimes(1)
//         expect(db.remove).toHaveBeenCalledTimes(1)
//         expect(db.read).toHaveBeenCalledTimes(1)
//         expect(db.reset).toHaveBeenCalledTimes(1)
//       })
//     })
//
//     describe('resetToDefaultItems() method should call the', () => {
//       it("db.resetToDefaultItems() method", async () => {
//         await api.resetToDefaultItems()
//
//         expect(db.resetToDefaultItems).toHaveBeenCalledTimes(1)
//       })
//     })
//
//     describe('resetItems() method should call the', () => {
//       it("db.reset() method", async () => {
//         await api.resetItems()
//
//         expect(db.reset).toHaveBeenCalledTimes(1)
//       })
//     })
//   })
})