import { LitElement } from '/node_modules/lit-element/lit-element.js';
import { html, unsafeStatic } from '/node_modules/lit-html/static.js';
import { unsafeHTML } from '/node_modules/lit-html/directives/unsafe-html.js';



export class OrdersList extends LitElement {

    // Would be retrieved from redux state but mocked here for demo purposes
    orders = [{
            id: 1,
            upcoming_order_date: "January 12, 2021"
        },
        {
            id: 2,
            upcoming_order_date: "March 1, 2021"
        }
    ]

    // Templates would be retrieved from SSPC this is for demo purposes
    sspcRecords = {
        "order-list": {
            upcomingOrderText: "Upcoming Orders"
        },
        "order": {
            html: "<og-order id='${this.id}' order-date='${this.upcoming_order_date}'></og-order>"
        }
    }

    getTemplate(order) {
        let htmlString = new Function("return `" + this.sspcRecords["order"].html + "`").call(order);
        return html `${unsafeHTML(htmlString)}`;
    }

    render() {

        return html `<div id="order-list">
                    <div>${this.sspcRecords["order-list"].upcomingOrderText}</div>
                    ${this.orders.map(order => this.getTemplate(order))}
                </div>`;
    }
}

export class Order extends LitElement {

    // Would be retrieved from redux state but mocked here for demo purposes
    items = [{
            id: 1,
            name: "Men&#39;s Shampoo",
            one_time: true,
            quantity: 4,
            img_src: "https://www.suave.com/sk-eu/content/dam/brands/suave/united_states_ofamerica/1226514-079400737908.png.rendition.767.767.png"
        },
        {
            id: 2,
            name: "Women&#39;s Shampoo",
            one_time: false,
            quantity: 1,
            img_src: "https://www.aveeno.com/sites/aveeno_us_2/files/styles/jjbos_adaptive_images_generic-desktop/public/B07HMJTH7G-OatMilk-Shampoo-12oz.jpg"
        }
    ]

    // Templates would be retrieved from SSPC this is for demo purposes
    sspcRecords = {
        "item": {
            html: "<og-item id='${this.id}' change-quantity='${this.one_time}' one-time='${this.one_time}' img-src='${this.img_src}' product-name='${this.name}' quantity='${this.quantity}'></og-order>"
        }
    }

    static get properties() {
        return {
            id: { type: String, attribute: true },
            order_date: { type: String, attribute: 'order-date' }
        };
    }

    getTemplate(item) {
        let htmlString = new Function("return `" + this.sspcRecords["item"].html + "`").call(item);
        return html `${unsafeHTML(htmlString)}`;
    }

    render() {
        return html `<style>
        .order { 
            margin: 10px;
            padding: 10px;
        }
        </style> 
        <div id="${this.id}" class="order">Order Shipping On: ${this.order_date}</div>
        <div class="items">
        ${this.items.map(item => this.getTemplate(item))}
        </div>
        `;
    }
}

export class Item extends LitElement {

    // Templates would be retrieved from SSPC this is for demo purposes
    sspcRecords = {
        "item": {
            internalHtml: "<div id='${this.id}' class='item'>" +
                "<span><img width='50px' src='${this.imgSrc}'/></span>" +
                "<span>${this.productName}</span>" +
                "<span>" +
                "${this.changeQuantity == 'true'" +
                "? `${this.quantity}`" +
                ": `<input value='${this.quantity}' type='text'/>`" +
                "}" +
                "</span>" +
                "<span>" +
                "${this.oneTime == 'true'" +
                "? `One-Time Shipment`" +
                ": `Subscription Shipment`" +
                "}" +
                "</span>" +
                "</div>"
        }
    }

    static get properties() {
        return {
            id: { type: String, attribute: true },
            productName: { type: String, attribute: 'product-name' },
            imgSrc: { type: String, attribute: 'img-src' },
            oneTime: { type: String, attribute: 'one-time' },
            quantity: { type: String, attribute: true },
            changeQuantity: { type: String, attribute: 'change-quantity' }
        };
    }

    getTemplate() {
        let htmlString = new Function("return `" + this.sspcRecords["item"].internalHtml + "`").call(this);
        return html `${unsafeHTML(htmlString)}`;
    }

    render() {
        return html `<style>
        .item { 
            margin: 5px;
            padding: 5px;
            border: 1px solid;
            max-width: 500px;
        }

        .item span {
            padding-right: 10px;
        }
        </style>
        ${this.getTemplate()}`;
    }
}


customElements.define('og-order-list', OrdersList);
customElements.define('og-order', Order);
customElements.define('og-item', Item);