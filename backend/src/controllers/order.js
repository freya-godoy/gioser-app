const CrudController = require("./crud");
const { OrderServices } = include("services");
const escpos = require("escpos");
escpos.USB = require("escpos-usb");
escpos.Network = require("escpos-network");
const map = require("lodash/map");

const { PRINTER_IP } = process.env;

const print2 = () => {
    // Select the adapter based on your printer type
    const device = new escpos.USB();
    const options = { encoding: "GB18030" /* default */ };
    // encoding is optional

    const printer = new escpos.Printer(device, options);

    device.open(function (error) {
        printer
            .font("a")
            .align("ct")
            .style("bu")
            .size(1, 1)
            .text("The quick brown fox jumps over the lazy dog")
            .text("敏捷的棕色狐狸跳过懒狗")
            .barcode("1234567", "EAN8")
            .table(["One", "Two", "Three"])
            .tableCustom(
                [
                    { text: "Left", align: "LEFT", width: 0.33, style: "B" },
                    { text: "Center", align: "CENTER", width: 0.33 },
                    { text: "Right", align: "RIGHT", width: 0.33 },
                ],
                { encoding: "cp857", size: [1, 1] } // Optional
            )
            .qrimage("https://github.com/song940/node-escpos", function (err) {
                this.cut();
                this.close();
            });
    });
};

const print = (order) => {
    const device = new escpos.Network(PRINTER_IP);
    const options = { encoding: "GB18030" };
    const printer = new escpos.Printer(device, options);

    device.open(function (error) {
        const { basket, numberId, notes } = order;
        printer
            .font("a")
            .align("ct")
            .style("bu")
            .size(1, 1)
            .text("RESUMEN PEDIDO")
            .text("");

        printer
            .font("a")
            .align("ct")
            .style("bu")
            .size(1, 1)
            .text("Productos:")
            .text("");

        printer
            .font("a")
            .align("ct")
            .style("bu")
            .size(1, 1)
            .text("  Producto |  Cantidad  ")
            .text("");

        map(basket, (product) => {
            const { name, quantity } = product;
            const productName = name !== undefined ? name : '';
            const quantityValue = quantity !== undefined ? quantity.toString() : '';

            printer
                .size(1, 1)
                .tableCustom(
                    [
                        { text: productName, align: "LEFT", width: 0.5 },
                        { text: quantityValue, align: "left", width: 0.5 },
                    ],
                )
                .text("");
        });
        printer.text("").text("");
        printer
            .style("bu")
            .size(1, 1)
            .align("ct")
            .text("Notas:")
            .text(notes);

        printer.text("").text("");
        printer
            .style("bu")
            .size(1, 1)
            .align("ct")
            .text("LOCALIZADOR:")
            .style("bu", "u")
            .size(2, 2)
            .text(numberId)
            .style("bu")
            .size(1, 1);

        printer.text("").text("");
        printer.cut();
        printer.close();
    });
};


class Order extends CrudController {
    constructor() {
        const services = new OrderServices();
        super(services);
    }

    async saveOne(req, res, next) {
        try {
            const { status } = req.body;
            if (status === 'process') print(req.body);
            const documents = await super.saveOne(req, res, next);
            res.send({ data: { documents } });
        } catch (err) {
            next(err);
        }
    }

    async print(req, res, next) {
        try {
            print(req.body);
            res.send({ data: { print: 'print success' } });
        } catch (err) {
            res.send({ data: { print: err.message } });
        }
    }
}

module.exports = new Order();
