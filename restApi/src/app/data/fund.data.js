import { Security, Holding, Fund } from '../models';

const Security1 = new Security({
    id: 1,
    value: 10,
    ticker: 'MSFT',
    name: 'Microsoft'
});
const Security2 = new Security({
    id: 2,
    value: 20,
    ticker: 'APPL',
    name: 'Apple'
});
const Security3 = new Security({
    id: 3,
    value: 15,
    ticker: 'TSLA',
    name: 'Tesla'
});

const Fund1 = new Fund({
    id: 1,
    name: 'Luke\'s Fund',
    holdings:[
        new Holding({
            id: 1,
            security: Security1,
            amount: 1000
        }),
        new Holding({
            id: 2,
            security: Security2,
            amount: 300
        }),
        new Holding({
            id: 3,
            security: Security3,
            amount: 400
        })
    ]
});

export default Fund1