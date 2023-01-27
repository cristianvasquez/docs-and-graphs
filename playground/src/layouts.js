import { ItemType } from 'golden-layout'
import { MARKDOWN, JSON } from './config.js'

const contentLayout = {
  root: {
    type: ItemType.row, content: [
      {
        type: ItemType.column, width: 40, content: [
          {
            type: 'component',
            header: { show: 'top' },
            isClosable: false,
            height: 90,
            componentState: undefined, ...MARKDOWN,
          }],
      }, {
        type: ItemType.column, width: 58, content: [
          {
            type: 'component',
            header: { show: 'top', popout: false },
            height: 100,
            componentState: undefined, ...JSON,
          }],

      }],
  },
}
export { contentLayout }
