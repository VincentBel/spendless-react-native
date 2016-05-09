import { blue500, lightBlue500, green300, orange500, cyan500, amber500 } from '../theme/colors'

export const types = [{
  type: 'cash',
  label: '现金',
  icon: 'account-balance-wallet',
  color: blue500,
}, {
  type: 'debitCard',
  label: '储蓄卡',
  icon: 'picture-in-picture-alt',
  color: orange500,
}, {
  type: 'creditCard',
  label: '信用卡',
  icon: 'credit-card',
  color: cyan500,
}, {
  type: 'alipay',
  label: '支付宝',
  icon: 'cloud-queue',
  color: lightBlue500,
}, {
  type: 'wechatpay',
  label: '微信支付',
  icon: 'cloud-queue',
  color: green300,
}, {
  type: 'others',
  label: '其他',
  icon: 'attach-money',
  color: amber500,
}]
