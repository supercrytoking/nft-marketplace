import Web3 from 'web3'
import commaNumber from 'comma-number'
import shortNumber from 'short-number'
import axios from 'axios'

export const formatPricing = (price) => `${Number(price) > 10000 ? shortNumber(Number(Web3.utils.fromWei(price))) : commaNumber(Number(Web3.utils.fromWei(price)))} FTM`

export const api = axios.create({ baseURL: process.env.NODE_ENV === 'production' ? 'https://api.fantom.digital/' : 'http://localhost:8888/' })
