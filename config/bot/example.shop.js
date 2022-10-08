export default {
    shop: {
        active: true,
        currency: "₺",
        charge: {
            min: 5,
            max: 1000,
        },
    },
    items: [
        {
            id: 1,
            name: "Premium",
            description: {
                "tr-TR": "Premium üyelik satın almak için kullanılır.",
                "en-US": "Used to buy premium membership.",
            },
            price: 9.99,
            type: "premium",
            expire: 30,
            level: 1,
            active: true,
        },
        {
            id: 2,
            name: "Premium 2",
            description: {
                "tr-TR": "Premium üyelik satın almak için kullanılır.",
                "en-US": "Used to buy premium membership.",
            },
            price: 19.99,
            type: "premium",
            expire: 30,
            level: 2,
            active: true,
        },
        {
            id: 3,
            name: "Premium 3",
            description: {
                "tr-TR": "Premium üyelik satın almak için kullanılır.",
                "en-US": "Used to buy premium membership.",
            },
            price: 29.99,
            type: "premium",
            expire: 30,
            level: 3,
            active: true,
        },
        {
            id: 4,
            name: "Premium 4",
            description: {
                "tr-TR": "Premium üyelik satın almak için kullanılır.",
                "en-US": "Used to buy premium membership.",
            },
            price: 39.99,
            type: "premium",
            expire: 30,
            level: 4,
            active: true,
        }
    ]
}