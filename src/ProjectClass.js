/**
 * Created by Tom on 07/09/2015.
 */
// class to stor individual project attributes
projectAttr = {
    name: null,
    dateLoanAdded: null,
    value: null,
    repaymentTerm: null,
    activityType: null,
    mfiPartner: null,
    description: null,
    expectedPayments: {
        month1: {
            date: null,
            value: null
        },
        month2: {
            date: null,
            value: null
        },
        month3: {
            date: null,
            value: null
        },
        month4: {
            date: null,
            value: null
        }
    },
    actualRepayments: {
        month1: {
            date: null,
            value: null
        },
        month2: {
            date: null,
            value: null
        },
        month3: {
            date: null,
            value: null
        },
        month4: {
            date: null,
            value: null
        }
    }
};