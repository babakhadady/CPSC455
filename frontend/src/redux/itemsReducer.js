import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = [
    {
        name: "Bike",
        description: "a nice bike",
        price: "100",
        count: 1,
        url: "https://cdn.shopify.com/s/files/1/0541/0154/1047/products/0711964_b_1200x1200.jpg?v=1614971567",
    },
    {
        name: "Candy",
        description: "a delicious treat",
        price: "3",
        count: 1,
        url: "https://assets.shop.loblaws.ca/products/21210265/b1/en/front/21210265_front_a01_@2.png",
    },
    {
        name: "Dog",
        description: "a good boy",
        price: "10",
        count: 1,
        url: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g",
    },
];

const itemsSlice = createSlice({
    name: "items",
    initialState: INITIAL_STATE,
    reducers: {
        addItem: (state, action) => {
            if (itemExists(state, action.payload)) return;
            return [...state, action.payload];
        },
        clearItems: (state, action) => {
            return [];
        },
        removeItem: (state, action) => {
            const index = getIndex(state, action.payload);
            const new_state = [...state]
            new_state.splice(index, 1);
            return new_state;
        },
        increaseCount: (state, action) => {
            const item = { ...state[getIndex(state, action.payload)] }
            item.count++;
            const index = getIndex(state, item);
            const new_state = [...state]
            new_state.splice(index, 1);
            new_state.splice(index, 0, item);
            return new_state;
        },
        decreaseCount: (state, action) => {
            const item = { ...state[getIndex(state, action.payload)] }
            if (item.count === 1) return;
            item.count--;
            const index = getIndex(state, item);
            const new_state = [...state]
            new_state.splice(index, 1);
            new_state.splice(index, 0, item);
            return new_state;

        },
    },
});

function itemExists(state, item) {
    for (let i of state) {
        if (areIdentical(i, item.name, item.price, item.description, item.url)) {
            return true;
        }
    }
    return false;
}

export function getIndex(state, item) {
    for (let i = 0; i < state.length; i++) {
        if (
            areIdentical(state[i], item.name, item.price, item.description, item.url)
        )
            return i;
    }
    return -1;
}

function areIdentical(item, name, price, description, url) {
    return (
        item.name === name &&
        item.price === price &&
        item.description === description &&
        item.url === url
    );
}

function updateCount(state, item) {
    for (let i of state) {
        if (areIdentical(i, item.name, item.price, item.description, item.url)) {
            return i;
        }
    }
    return null;
}

export const { addItem, clearItems, removeItem, increaseCount, decreaseCount } =
    itemsSlice.actions;

export default itemsSlice.reducer;

